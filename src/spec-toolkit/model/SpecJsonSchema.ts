/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type SpecJsonSchemaTypeName =
  | "string" //
  | "number"
  | "integer"
  | "boolean"
  | "object"
  | "array"
  | "null";

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type SpecJsonSchemaType =
  | string //
  | number
  | boolean
  | SpecJsonSchema
  | SpecJsonSchemaArray
  | null;

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SpecJsonSchemaArray extends Array<SpecJsonSchemaType> {}

export type SpecJsonSchemaVersion = string;

export type SpecJsonSchemaDefinitions = { [key: string]: SpecJsonSchema };

export type ExtensionTarget = "Entity" | "Service" | "Context" | "Type";

export type ExtensionPoint =
  | "Entity"
  | "Service"
  | "Context"
  | "Type"
  | "BooleanType"
  | "StringType"
  | "LargeStringType"
  | "IntegerType"
  | "Integer64Type"
  | "DecimalType"
  | "DoubleType"
  | "DateType"
  | "TimeType"
  | "DateTimeType"
  | "TimestampType"
  | "UUIDType"
  | "AssociationType"
  | "CompositionType"
  | "DerivedType"
  | "TypeDefinition"
  | "BooleanTypeDefinition"
  | "StringTypeDefinition"
  | "LargeStringTypeDefinition"
  | "IntegerTypeDefinition"
  | "Integer64TypeDefinition"
  | "DecimalTypeDefinition"
  | "DoubleTypeDefinition"
  | "DateTypeDefinition"
  | "TimeTypeDefinition"
  | "DateTimeTypeDefinition"
  | "TimestampTypeDefinition"
  | "UUIDTypeDefinition"
  | "AssociationTypeDefinition"
  | "CompositionTypeDefinition";

export type VersionImpact = "none" | "patch" | "minor" | "major";

/**
 * Root interface of Spec JSON Schema
 */
export interface SpecJsonSchemaRoot extends SpecJsonSchema {
  "$id"?: string;
  "$schema"?: SpecJsonSchemaVersion;

  "definitions": SpecJsonSchemaDefinitions;

  /**
   * Mark the root JSON Schema as an extension to another JSON Schema document.
   * Use `x-extension-targets` to indicate where a property in the JSON Schema needs to be merged into the target document
   * The target document MUST describe its `x-extension-points`, which is where the merging takes place.
   */
  "x-extension"?: {
    targetDocument: string;
    targetLink: string;
  };
  /**
   * Define the custom typescript types that should be auto-generated and appended to the output generated TS types
   * This can be used by the `tsType` property that aids TypeScript generation.
   */
  "x-custom-typescript-types"?: {
    typeName: string;
    typeValue: string;
  }[];
}

/**
 * Spec JSON Schema, based on JSON Schema v7
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
export interface SpecJsonSchema {
  "$comment"?: string;
  "$ref"?: string;

  // $defs?: {
  //     [key: string]: SpecJSONSchema;
  // };

  "type"?: SpecJsonSchemaTypeName | SpecJsonSchemaTypeName[];
  "enum"?: SpecJsonSchemaType[];
  "const"?: SpecJsonSchemaType;

  // multipleOf?: number;
  "maximum"?: number;
  "exclusiveMaximum"?: number;
  "minimum"?: number;
  "exclusiveMinimum"?: number;

  "maxLength"?: number;
  "minLength"?: number;
  "pattern"?: string;

  "items"?: SpecJsonSchema;
  "additionalItems"?: SpecJsonSchema;
  "maxItems"?: number;
  "minItems"?: number;
  // uniqueItems?: boolean;
  // contains?: SpecJSONSchema;

  // maxProperties?: number;
  // minProperties?: number;
  "required"?: string[];
  "properties"?: {
    [key: string]: SpecJsonSchema;
  };
  "patternProperties"?: {
    [key: string]: SpecJsonSchema;
  };
  "additionalProperties"?: SpecJsonSchema;
  // dependencies?: {
  //     [key: string]: SpecJSONSchema | string[];
  // };
  // propertyNames?: SpecJSONSchema;

  "if"?: SpecJsonSchema;
  "then"?: SpecJsonSchema;
  "else"?: SpecJsonSchema;

  "allOf"?: SpecJsonSchema[];
  "anyOf"?: SpecJsonSchema[];
  "oneOf"?: SpecJsonSchema[];
  // TODO: Currently not documented:
  // not?: SpecJSONSchema;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
   */
  "format"?: string;

  // contentMediaType?: string;
  // contentEncoding?: string;

  // Definitions are only available on Root!
  // definitions?: SpecJSONSchemaDefinitions;

  "title"?: string;
  "description"?: string;
  "default"?: SpecJsonSchemaType;
  "examples"?: SpecJsonSchemaType;

  //////////////////////////////////////////
  // Spec JSON Schema extensions          //
  //////////////////////////////////////////

  /**
   * Read only context for validation / error / debugging
   * Will be added by the tooling automatically.
   * Array: ["<file name>", "<definition name>", "<property name>"]
   */
  "x-context"?: string[];
  /** Mark properties as recommended (use like required) */
  "x-recommended"?: string[];
  /** Version of spec when this entity or property was introduced */
  "x-introduced-in-version"?: string;
  /** Feature Status. Use this to mark something as alpha or beta */
  "x-feature-status"?: "alpha" | "beta";
  /** Add a human readable description for the patternProperties construct */
  "x-pattern-properties-description"?: string;
  /** Optionally reorder an objects properties by this list. Unlisted properties will be appended in their original order. */
  "x-property-order"?: string[];
  /**
   * Point to the association target entity and optionally the property which is used as its ID.
   * Use a $ref pointer array as values
   */
  "x-association-target"?: string[];
  /** Hide property from generated documentation, but keep it in exported JSON Schema. */
  "x-hide-property"?: boolean;
  /** Hide properties table from generated documentation, but keep it in exported JSON Schema. */
  "x-hide-properties"?: boolean;
  /** If true, the property / object name isn't checked to follow common naming conventions */
  "x-ignore-conventions"?: boolean;

  /**
   * Indicate which target document extension pointers this property is merged into
   */
  "x-extension-targets"?: ExtensionTarget[];
  /**
   * Define extension points in the target document
   */
  "x-extension-points"?: ExtensionPoint[];
  /**
   * Define the MD heading level in the target document. Default value: 3
   */
  "x-header-level"?: number;
  /**
   * Reference from a spec extension back to an interface in the core spec
   */
  "x-ref-to-doc"?: {
    title: string;
    ref: string;
  };
  /**
   * A way to define the version impact a change to a JSON Property or Annotation has to the version of the file.
   * 
   * This serves two purposes: Document what changes have a compatibility impact and to help calculate them programmatically.
   * If not provided, no impact is assumed as it cannot be calculated.
   * 
   * Calculation of stability is only done if newValue != oldValue
   */
  "x-stability"?: {
    /** Property or array entry has been added */
    add: VersionImpact;
    /** Property or array entry has been removed */
    remove: VersionImpact;
    /** Property or array entry has been changed (in any way) */
    change: VersionImpact; 
    /** Custom function to calculate the impact */
    function: ConditionalFunction

    /**
     * List of conditions to check
     * All of the conditions will be evaluated and the highest impact will "win".
     */
    conditional: ConditionalDeclarative[]
  }

  /**
   * Overwrite TypeScript Type
   * Used and defined by https://www.npmjs.com/package/json-schema-to-typescript
   *
   * Advanced case: The library doesn't support to define the "key" type of patternProperties.
   * In this case, use a `// replaceKeyType_` workaround:
   * `tsType: "unknown // replaceKeyType_{PrivatePropertyKey}"`
   * `tsType: "unknown // replaceKeyType_{PrivatePropertyKey|AnnotationPropertyKey}"`
   */
  "tsType"?: string;
}

/**
 * Impact needs to be calculated with a custom function
 * This is the fallback if the calculation cannot be stated in a declarative way with `conditional`
 * 
 * The function will then be called with fn(newValue, oldValue, context)
 * The context could be (document, jsonPath, jsonSchemaPath)
 * The function will return the calculated severity
 */
export interface ConditionalFunction {
  /** Function / method name for validation function */
  name: string;
  /** Human readable description of the condition */
  description: string;
}

/**
 * Conditions to evaluate on the new and old values 
 * 
 * All of the conditions need to be met (AND), then the stated `impact` will be returned
 * E.g. newValue equals true AND oldValue equals [false, null]
 */
export interface ConditionalDeclarative {
  impact: VersionImpact;
  /** Conditions to evaluate on the new value or values (array) */
  newValue?: ConditionalValue;
  /** Conditions to evaluate on the old value or values (array) */
  oldValue?: ConditionalValue;
  /** For numeric and string values, we can compare new value (left) with old value (right) */
  comparison?: ConditionalComparison
}

export interface ConditionalValue {
  /** Value MUST equal a single value or one of the values of the array */
  equals?: JsonType | JsonType[];
  /** Value MUST NOT equal a single value or one of the values of the array */
  equalsNot?: JsonType | JsonType[];
  /** Regexp that the value MUST match. Value is always converted to string for matching */
  matches?: string; 
  /** Regexp that the value MUST NOT match. Value is always converted to string for matching */
  matchesNot?: string; 
}

/**
 * Comparison operators, mostly for numeric values, but also string comparisons could be useful.
 * 
 * New value is left of the operator, old value right.
 */
export interface ConditionalComparison {
  operator: "<" | "<=" | "=" | "!=" | ">" | ">=" | "includes"
}

/**
 * JSON Value. 
 * 
 * Null has special semantics: value is removed,  property holding it is removed or array entry is removed
 */
export type JsonType = string | number | boolean | null | object;
