import assert from "node:assert/strict";
import { describe, test } from "node:test";
import * as fs from "fs-extra";

/**
 * Structural conventions for the effective CSN JSON Schema.
 *
 * These tests operate on the *generated* effective CSN JSON Schema (the same
 * source of truth the runtime validation tests use) so that they catch
 * violations regardless of which YAML file introduced them.
 *
 * Some conventions apply only to annotation vocabularies and some apply to the
 * whole schema (core CSN types included); each `describe()` block states its
 * own scope in its title ("Annotation …" vs. "Schema-wide …").
 *
 * The conventions enforced here:
 *
 * 1. Enum notation: enumerated annotation values MUST be expressed with the
 *    `{ "#": "VALUE" }` wrapper (an object with a single string `#` property
 *    that carries the `enum` / `oneOf`+`const`), never as a bare string enum
 *    directly on the annotation. See the `@Aggregation.default` annotation for
 *    a reference implementation.
 *
 * 2. Flat annotations: annotations are flat lists of key-value pairs with fully
 *    qualified (dot-separated) keys (see docs/primer.md). Structured
 *    annotations that nest an object of further `properties` should instead be
 *    split into multiple flat annotations (e.g. `@ObjectModel.origin.layer` +
 *    `@ObjectModel.origin.codes` rather than `@ObjectModel.origin` = { layer,
 *    codes }).
 *
 * 3. Introduced-in-version: every entry definition a consumer references
 *    directly — core CSN types and top-level annotations — added after the
 *    initial 1.0 scope MUST carry an `x-introduced-in-version` tag so consumers
 *    can tell when a feature became available. The definitions that predate the
 *    convention (all part of the 1.0 scope) are grandfathered in an explicit
 *    set; new definitions must not be added to it.
 *
 * 4. Enum value descriptions: across the whole schema, each `oneOf` + `const`
 *    enum value SHOULD document its meaning with a `description`. Value sets
 *    that still await authoritative documentation are listed in an explicit
 *    exception set and reported (warned) on every run so the outstanding
 *    backfill stays visible.
 *
 * Conventions 1 and 2 are specific to annotation vocabularies; conventions 3
 * and 4 apply to the whole effective schema (core types included).
 */

type JsonSchemaNode = Record<string, unknown>;

const effectiveCsnSchema = fs.readJSONSync(
  "./src/generated/spec/v1/schemas/csn-interop-effective.schema.json",
) as JsonSchemaNode;

const definitions = (effectiveCsnSchema.definitions ?? {}) as Record<
  string,
  JsonSchemaNode
>;

/** Definition names are prefixed with `@` for everything that belongs to an annotation vocabulary. */
function getAnnotationDefinitions(): Array<[string, JsonSchemaNode]> {
  return Object.entries(definitions).filter(([name]) => name.startsWith("@"));
}

/** Every definition in the schema — the core CSN types and the annotation vocabularies. */
function getAllDefinitions(): Array<[string, JsonSchemaNode]> {
  return Object.entries(definitions);
}

/** A core (non-annotation) definition: a CSN type, not an `@`-prefixed annotation. */
function isCoreDefinition(name: string): boolean {
  return !name.startsWith("@");
}

function isEnumLike(node: JsonSchemaNode): boolean {
  if (Array.isArray(node.enum)) {
    return true;
  }
  if (Array.isArray(node.oneOf)) {
    return node.oneOf.some(
      (entry) =>
        entry !== null &&
        typeof entry === "object" &&
        "const" in (entry as object),
    );
  }
  return false;
}

/**
 * Collect every enum-like schema node reachable from `node`, together with the
 * object property key it sits under (empty string when not under a property).
 */
function collectEnumLikeNodes(
  node: unknown,
  parentKey: string,
  hits: Array<{ path: string; parentKey: string }>,
  path = "",
): void {
  if (node === null || typeof node !== "object") {
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((entry, index) => {
      collectEnumLikeNodes(entry, parentKey, hits, `${path}[${index}]`);
    });
    return;
  }
  const record = node as JsonSchemaNode;
  if (isEnumLike(record)) {
    hits.push({ path: path || "<root>", parentKey });
  }
  for (const [key, value] of Object.entries(record)) {
    // `examples` may legitimately contain `{ "#": "VALUE" }` literals; skip it.
    if (key === "examples") {
      continue;
    }
    collectEnumLikeNodes(value, key, hits, `${path}/${key}`);
  }
}

/**
 * Collect every `oneOf` `const` entry (the schema object carrying `const`)
 * reachable from `node`. These are the individual enumerated values whose
 * meaning should be documented with a `description`.
 */
function collectConstEntries(node: unknown, hits: JsonSchemaNode[]): void {
  if (node === null || typeof node !== "object") {
    return;
  }
  if (Array.isArray(node)) {
    for (const entry of node) {
      collectConstEntries(entry, hits);
    }
    return;
  }
  const record = node as JsonSchemaNode;
  if (Array.isArray(record.oneOf)) {
    for (const entry of record.oneOf) {
      if (entry !== null && typeof entry === "object" && "const" in entry) {
        hits.push(entry as JsonSchemaNode);
      }
    }
  }
  for (const [key, value] of Object.entries(record)) {
    // `examples` may legitimately contain `{ "#": "VALUE" }` literals; skip it.
    if (key === "examples") {
      continue;
    }
    collectConstEntries(value, hits);
  }
}

describe("Annotation enum notation", (): void => {
  const annotationDefinitions = getAnnotationDefinitions();

  test("there is at least one annotation definition to check", (): void => {
    assert.ok(
      annotationDefinitions.length > 0,
      "Expected annotation definitions (prefixed with '@') in the generated schema",
    );
  });

  for (const [name, definition] of annotationDefinitions) {
    test(`'${name}' expresses enums only via the { "#": "VALUE" } wrapper`, (): void => {
      const hits: Array<{ path: string; parentKey: string }> = [];
      collectEnumLikeNodes(definition, name, hits);

      const violations = hits.filter((hit) => hit.parentKey !== "#");
      assert.deepStrictEqual(
        violations,
        [],
        `Annotation '${name}' declares an enum outside of a '#' property (at ${violations
          .map((v) => v.path)
          .join(", ")}). ` +
          `Enumerated values must use the { "#": "VALUE" } notation, e.g. properties: { "#": { type: string, enum: [...] } }.`,
      );
    });
  }

  test("the '#' enum wrapper is always a string", (): void => {
    for (const [name, definition] of annotationDefinitions) {
      const properties = definition.properties as
        | Record<string, JsonSchemaNode>
        | undefined;
      const hashProperty = properties?.["#"];
      if (!hashProperty) {
        continue;
      }
      assert.strictEqual(
        hashProperty.type,
        "string",
        `The '#' property of annotation '${name}' must be 'type: string', got '${String(
          hashProperty.type,
        )}'`,
      );
      assert.ok(
        isEnumLike(hashProperty),
        `The '#' property of annotation '${name}' must declare an enum / oneOf of const values`,
      );
    }
  });
});

describe("Annotation flatness", (): void => {
  /**
   * Structured object annotations that are knowingly tolerated.
   *
   * A structured object is only acceptable when its nested properties form a
   * DDD *value object*: the values are meaningless on their own and only make
   * sense together as one object. Otherwise annotations must be flat,
   * dot-qualified key-value pairs.
   *
   * - `@API.element` is deprecated in favour of the flat
   *   `@API.element.releaseState` / `.successor` /
   *   `.decommissioningPlannedForYearMonth` annotations and is kept only for
   *   backward compatibility.
   * - `@Semantics.valueRange` bundles minimum/maximum boundary values that only
   *   have meaning together, mirroring JSON Schema's own vocabulary.
   *
   * Adding to this allowlist is a conscious design decision that MUST be called
   * out and approved in PR review — it is not a rubber stamp. If the properties
   * do not only-make-sense-together, split them into flat annotations instead.
   */
  const ALLOWED_STRUCTURED_ANNOTATIONS = new Set<string>([
    "@API.element",
    "@Semantics.valueRange",
  ]);

  /** Names of the nested object properties, excluding the `#` enum wrapper. */
  function getStructuredPropertyNames(definition: JsonSchemaNode): string[] {
    if (definition.type !== "object") {
      return [];
    }
    const properties = definition.properties as
      | Record<string, unknown>
      | undefined;
    if (!properties) {
      return [];
    }
    return Object.keys(properties).filter((key) => key !== "#");
  }

  for (const [name, definition] of getAnnotationDefinitions()) {
    if (!isTopLevelAnnotation(definition)) {
      continue;
    }
    test(`'${name}' is a flat annotation (no nested object of properties)`, (): void => {
      const structuredProperties = getStructuredPropertyNames(definition);
      if (structuredProperties.length === 0) {
        return; // scalar, array, $ref, or enum wrapper — all fine.
      }
      assert.ok(
        ALLOWED_STRUCTURED_ANNOTATIONS.has(name),
        `Annotation '${name}' is a structured object with nested properties [${structuredProperties.join(
          ", ",
        )}]. ` +
          `Annotations must be flat lists of dot-qualified key-value pairs — split it into e.g. '${name}.${structuredProperties[0]}'. ` +
          `Only if the properties form a DDD value object (meaningless apart, they only make sense together as one object), add '${name}' to ALLOWED_STRUCTURED_ANNOTATIONS with a justification and call it out in PR review as a conscious design decision to be approved.`,
      );
    });
  }
});

/** A top-level annotation is a definition that declares extension targets. */
function isTopLevelAnnotation(definition: JsonSchemaNode): boolean {
  return Array.isArray(definition["x-extension-targets"]);
}

describe("Enum wrapper structural completeness", (): void => {
  // Any annotation carrying a `#` property must lock the object down so that
  // `{ "#": "X", "typo": 1 }` and `{}` are rejected, matching the reference
  // implementation `@Aggregation.default`.
  for (const [name, definition] of getAnnotationDefinitions()) {
    const properties = definition.properties as
      | Record<string, JsonSchemaNode>
      | undefined;
    if (!properties?.["#"]) {
      continue;
    }
    test(`'${name}' enum wrapper sets additionalProperties:false and requires '#'`, (): void => {
      assert.strictEqual(
        definition.additionalProperties,
        false,
        `Enum wrapper '${name}' must set 'additionalProperties: false' so unknown keys are rejected`,
      );
      const required = definition.required;
      assert.ok(
        Array.isArray(required) && required.includes("#"),
        `Enum wrapper '${name}' must list '#' in 'required' so an empty object is rejected`,
      );
    });
  }
});

describe("Annotation descriptions", (): void => {
  for (const [name, definition] of getAnnotationDefinitions()) {
    if (!isTopLevelAnnotation(definition)) {
      continue; // referenced helper sub-objects are documented via their parent.
    }
    // Pure `$ref` annotations (generated from `x-ref-to-doc`) intentionally
    // carry no inline description — the documentation lives on the ref target.
    if (typeof definition.$ref === "string") {
      continue;
    }
    test(`'${name}' has a non-empty description`, (): void => {
      const description = definition.description;
      assert.ok(
        typeof description === "string" && description.trim().length > 0,
        `Top-level annotation '${name}' must have a non-empty 'description'`,
      );
    });
  }
});

describe("Annotation extension targets", (): void => {
  // The set of targets an annotation may extend. Extend this list deliberately
  // when a new extension target is introduced — a typo (e.g. "Entiy") otherwise
  // produces a silently ineffective annotation.
  const ALLOWED_EXTENSION_TARGETS = new Set<string>([
    "Type",
    "Entity",
    "Service",
    "Context",
    "EnumDictionaryEntry",
    "IntegerType",
    "Int16Type",
    "Integer64Type",
    "UInt8Type",
    "DecimalType",
    "DoubleType",
    "StringType",
    "LargeStringType",
    "LargeBinaryType",
  ]);

  for (const [name, definition] of getAnnotationDefinitions()) {
    const targets = definition["x-extension-targets"];
    if (!Array.isArray(targets)) {
      continue;
    }
    test(`'${name}' only extends known targets`, (): void => {
      const unknown = targets.filter(
        (target) =>
          typeof target !== "string" || !ALLOWED_EXTENSION_TARGETS.has(target),
      );
      assert.deepStrictEqual(
        unknown,
        [],
        `Annotation '${name}' declares unknown x-extension-targets: ${JSON.stringify(
          unknown,
        )}. Allowed: ${[...ALLOWED_EXTENSION_TARGETS].join(", ")}.`,
      );
    });
  }
});

describe("Schema-wide introduced-in-version", (): void => {
  /**
   * Definitions that predate the `x-introduced-in-version` convention. These
   * are all part of the initial 1.0 scope — both core CSN types and top-level
   * annotations — so a "version in which this was introduced" is not meaningful
   * for them; they are grandfathered here on purpose.
   *
   * Do NOT add new entries to this set. Any core type or top-level annotation
   * introduced after 1.0 must carry an accurate `x-introduced-in-version` tag in
   * its schema/vocabulary YAML instead (see the `add-annotation` skill).
   */
  const LEGACY_WITHOUT_INTRODUCED_VERSION = new Set<string>([
    "@Aggregation.default",
    "@AnalyticsDetails.measureType",
    "@Consumption.valueHelpDefinition",
    "@EndUserText.heading",
    "@EndUserText.label",
    "@EndUserText.quickInfo",
    "@EntityRelationship.compositeReferences",
    "@EntityRelationship.entityIds",
    "@EntityRelationship.entityType",
    "@EntityRelationship.propertyType",
    "@EntityRelationship.reference",
    "@EntityRelationship.referencesWithConstantIds",
    "@EntityRelationship.temporalIds",
    "@EntityRelationship.temporalReferences",
    "@ODM.entityName",
    "@ODM.oidReference.entityName",
    "@ObjectModel.compositionRoot",
    "@ObjectModel.modelingPattern",
    "@ObjectModel.semanticKey",
    "@ObjectModel.supportedCapabilities",
    "@ObjectModel.text.element",
    "@ObjectModel.usageType.sizeCategory",
    "@PersonalData.dataSubjectRole",
    "@PersonalData.dataSubjectRoleDescription",
    "@PersonalData.entitySemantics",
    "@PersonalData.fieldSemantics",
    "@PersonalData.isPotentiallyPersonal",
    "@PersonalData.isPotentiallySensitive",
    "@Semantics.businessDate.from",
    "@Semantics.businessDate.to",
    "@Semantics.calendar.dayOfMonth",
    "@Semantics.calendar.dayOfYear",
    "@Semantics.calendar.halfyear",
    "@Semantics.calendar.month",
    "@Semantics.calendar.quarter",
    "@Semantics.calendar.week",
    "@Semantics.calendar.year",
    "@Semantics.calendar.yearHalfyear",
    "@Semantics.calendar.yearMonth",
    "@Semantics.calendar.yearQuarter",
    "@Semantics.calendar.yearWeek",
    "@Semantics.currencyCode",
    "@Semantics.fiscal.dayOfYear",
    "@Semantics.fiscal.period",
    "@Semantics.fiscal.quarter",
    "@Semantics.fiscal.week",
    "@Semantics.fiscal.year",
    "@Semantics.fiscal.yearPeriod",
    "@Semantics.fiscal.yearQuarter",
    "@Semantics.fiscal.yearVariant",
    "@Semantics.fiscal.yearWeek",
    "@Semantics.language",
    "@Semantics.text",
    "@Semantics.time",
    "@Semantics.unitOfMeasure",
    "@Semantics.uuid",
    "@Semantics.valueRange",
    "AndOperator",
    "AssociationType",
    "AssociationTypeDefinition",
    "BooleanType",
    "BooleanTypeDefinition",
    "CardinalityObject",
    "CdsType",
    "CompositionType",
    "CompositionTypeDefinition",
    "ContextDefinition",
    "CustomType",
    "DateTimeType",
    "DateTimeTypeDefinition",
    "DateType",
    "DateTypeDefinition",
    "DecimalScaleNumber",
    "DecimalScaleType",
    "DecimalType",
    "DecimalTypeDefinition",
    "DefaultValueBoolean",
    "DefaultValueCustomDerived",
    "DefaultValueInteger",
    "DefaultValueNumber",
    "DefaultValueObject",
    "DefaultValueString",
    "DefinitionEntry",
    "Definitions",
    "DoubleType",
    "DoubleTypeDefinition",
    "ElementDefinitions",
    "ElementEntry",
    "ElementReference",
    "ElementReferenceObject",
    "ElementReferenceString",
    "EntityDefinition",
    "EnumDictionary",
    "EnumDictionaryEntry",
    "EqualsOperator",
    "GreaterEqualsOperator",
    "GreaterOperator",
    "Int16Type",
    "Int16TypeDefinition",
    "Integer64Type",
    "Integer64TypeDefinition",
    "IntegerType",
    "IntegerTypeDefinition",
    "LanguageText",
    "LargeStringType",
    "LargeStringTypeDefinition",
    "Meta",
    "MetaDocument",
    "MetaFeatures",
    "OnValue",
    "ServiceDefinition",
    "SmallerEqualsOperator",
    "SmallerOperator",
    "StringType",
    "StringTypeDefinition",
    "StructuredElementReference",
    "TimeType",
    "TimeTypeDefinition",
    "TimestampType",
    "TimestampTypeDefinition",
    "TypeDefinition",
    "UInt8Type",
    "UInt8TypeDefinition",
    "UUIDType",
    "UUIDTypeDefinition",
    "i18n",
  ]);

  // Matches a full `MAJOR.MINOR.PATCH` version, the format used throughout the
  // spec (patch level is part of the spec version — see the CHANGELOG header).
  const INTRODUCED_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

  /**
   * The version tag is required on every "entry" definition a consumer
   * references directly: core CSN types and top-level annotations. Nested
   * annotation-helper sub-objects (e.g. `@EntityRelationship.EntityId`) inherit
   * their parent's version and are not required to carry their own tag.
   */
  function requiresIntroducedVersion(
    name: string,
    definition: JsonSchemaNode,
  ): boolean {
    if (typeof definition.$ref === "string") {
      return false; // pure `$ref` — metadata lives on the ref target.
    }
    if (isCoreDefinition(name)) {
      return true;
    }
    return isTopLevelAnnotation(definition);
  }

  for (const [name, definition] of getAllDefinitions()) {
    if (!requiresIntroducedVersion(name, definition)) {
      continue;
    }
    if (LEGACY_WITHOUT_INTRODUCED_VERSION.has(name)) {
      continue;
    }
    test(`'${name}' declares x-introduced-in-version`, (): void => {
      const version = definition["x-introduced-in-version"];
      assert.ok(
        typeof version === "string" && INTRODUCED_VERSION_PATTERN.test(version),
        `Definition '${name}' must declare 'x-introduced-in-version' as a MAJOR.MINOR.PATCH string ` +
          `(got ${JSON.stringify(version)}). Add it to the schema/vocabulary YAML — do not add the definition ` +
          `to LEGACY_WITHOUT_INTRODUCED_VERSION (that set is only for the original 1.0 scope).`,
      );
    });
  }
});

describe("Schema-wide enum value descriptions", (): void => {
  /**
   * Definitions whose `oneOf` + `const` enum values do not (yet) carry a
   * per-value `description`, because authoritative documentation for the value
   * meanings is still outstanding. These are reported (warned) on every run so
   * the backfill stays visible; remove an entry once its values are documented.
   *
   * Do NOT add new entries here to silence the check — document the values
   * instead. New enums are expected to describe every `const`.
   */
  const ENUM_CONST_DESCRIPTION_EXCEPTIONS = new Set<string>([
    "@EntityRelationship.Category",
    "@EntityRelationship.TemporalType",
    "@ObjectModel.SupportedCapabilities_EnumValue",
    "@ObjectModel.modelingPattern",
  ]);

  const undocumented: string[] = [];
  for (const [name, definition] of getAllDefinitions()) {
    const constEntries: JsonSchemaNode[] = [];
    collectConstEntries(definition, constEntries);
    const missing = constEntries.filter(
      (entry) =>
        typeof entry.description !== "string" ||
        entry.description.trim().length === 0,
    );
    if (missing.length > 0) {
      undocumented.push(name);
    }
  }

  const stillPending = undocumented.filter((name) =>
    ENUM_CONST_DESCRIPTION_EXCEPTIONS.has(name),
  );
  if (stillPending.length > 0) {
    console.warn(
      `[schemaConventions] ${stillPending.length} definition(s) have enum 'const' values without a description ` +
        `(grandfathered in ENUM_CONST_DESCRIPTION_EXCEPTIONS, pending documentation): ${stillPending
          .sort()
          .join(", ")}.`,
    );
  }

  for (const [name, definition] of getAllDefinitions()) {
    if (ENUM_CONST_DESCRIPTION_EXCEPTIONS.has(name)) {
      continue;
    }
    test(`'${name}' documents every enum 'const' value with a description`, (): void => {
      const constEntries: JsonSchemaNode[] = [];
      collectConstEntries(definition, constEntries);
      const missing = constEntries
        .filter(
          (entry) =>
            typeof entry.description !== "string" ||
            entry.description.trim().length === 0,
        )
        .map((entry) => JSON.stringify(entry.const));
      assert.deepStrictEqual(
        missing,
        [],
        `Definition '${name}' has enum 'const' value(s) without a 'description': ${missing.join(", ")}. ` +
          `Document each value's meaning, or (only if authoritative documentation is genuinely outstanding) ` +
          `add '${name}' to ENUM_CONST_DESCRIPTION_EXCEPTIONS with a justification.`,
      );
    });
  }
});
