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

/**
 * Root interface of Spec JSON Schema
 */
export interface SpecJsonSchemaRoot extends SpecJsonSchema {
  "$id"?: string;
  "$schema"?: SpecJsonSchemaVersion;

  "definitions": SpecJsonSchemaDefinitions;

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
   * @see https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-7.3
   */
  "format"?:
    | "date-time"
    | "date"
    | "time"
    | "uri"
    | "uri-reference"
    | "uri-template"
    | "iri"
    | "iri-reference"
    | "email"
    | "hostname"
    | "idn-hostname"
    | "ipv4"
    | "ipv6"
    | "json-pointer"
    | "relative-json-pointer"
    | "regex"
    | string;

  // contentMediaType?: string;
  // contentEncoding?: string;

  // Definitions are only available on Root!
  // definitions?: SpecJSONSchemaDefinitions;

  "title"?: string;
  "description"?: string;
  "default"?: SpecJsonSchemaType;
  /** Examples, in Spec JSON Schema this is always an array of examples! */
  "examples"?: SpecJsonSchemaType[];

  //////////////////////////////////////////
  // Spec JSON Schema extensions          //
  //////////////////////////////////////////

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
  "x-extension-targets"?: string[];
  /**
   * Define extension points in the target document
   */
  "x-extension-points"?: string[];
  /**
   * Define the MD heading level in the target document. Default value: 3
   */
  "x-header-level"?: number;

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
