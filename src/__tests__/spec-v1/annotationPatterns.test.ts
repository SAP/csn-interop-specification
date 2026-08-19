import assert from "node:assert/strict";
import { describe, test } from "node:test";
import * as fs from "fs-extra";

/**
 * Structural conventions for annotation vocabularies.
 *
 * These tests operate on the *generated* effective CSN JSON Schema (the same
 * source of truth the runtime validation tests use) so that they catch
 * violations regardless of which YAML file introduced them.
 *
 * Two conventions are enforced:
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
   * - `@API.element` is deprecated in favour of the flat
   *   `@API.element.releaseState` / `.successor` /
   *   `.decommissioningPlannedForYearMonth` annotations and is kept only for
   *   backward compatibility.
   * - `@Semantics.valueRange` bundles minimum/maximum boundary values that only
   *   have meaning together, mirroring JSON Schema's own vocabulary.
   *
   * New structured annotations should be split into flat, dot-qualified
   * annotations instead of being added here.
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
          `If the properties only have meaning together as one object, add '${name}' to ALLOWED_STRUCTURED_ANNOTATIONS with a justification.`,
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
