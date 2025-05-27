import fs from "fs-extra";

import Ajv, { ValidateFunction } from "ajv";
import { SpecJsonSchema, SpecJsonSchemaRoot } from "../model/SpecJsonSchema.js";

import _ from "lodash";
import addFormats from "ajv-formats";
import { log } from "./log.js";

// Prepare JSON Schema validator
export const preparedAjv = new Ajv.default({ allErrors: true, allowUnionTypes: true, allowMatchingProperties: true });
addFormats.default(preparedAjv);
preparedAjv.addKeyword("x-recommended");
preparedAjv.addKeyword("x-introduced-in-version");
preparedAjv.addKeyword("x-feature-status");
preparedAjv.addKeyword("x-pattern-properties-description");
preparedAjv.addKeyword("x-property-order");
preparedAjv.addKeyword("x-association-target");
preparedAjv.addKeyword("x-hide-property");
preparedAjv.addKeyword("x-hide-properties");
preparedAjv.addKeyword("x-ignore-conventions");
preparedAjv.addKeyword("x-extension-targets");
preparedAjv.addKeyword("x-extension-points");
preparedAjv.addKeyword("x-header-level");
preparedAjv.addKeyword("x-ref-to-doc");

// JSON Schema -> TypeScript conversion
preparedAjv.addKeyword("tsType");

export interface ValidationResult {
  errors: ValidationResultEntry[];
  warnings: ValidationResultEntry[];
}

export interface ValidationResultEntry {
  message: string;
  details?: string;
  context: string;
}

/**
 * Validate a Spec JSON Schema file, before working with it
 *
 * TODO: Add more validations here and improve feedback to end-user
 *
 */
export function validateSpecJsonSchema(jsonSchema: SpecJsonSchemaRoot, jsonSchemaFilePath: string): void {
  const result: ValidationResult = {
    errors: [],
    warnings: [],
  };

  result.errors.push(...validateJsonSchema(jsonSchema, jsonSchemaFilePath));

  result.errors.push(...validateRefLinks(jsonSchema, jsonSchemaFilePath));

  for (const error of result.errors) {
    log.error(`[${error.context}] ${error.message}`);
  }
  for (const warning of result.warnings) {
    log.warn(`[${warning.context}] ${warning.message}`);
  }

  if (result.errors.length > 0) {
    throw new Error(`Validation of Spec JSON Schema failed with errors.`);
  }

  log.info(
    `${jsonSchemaFilePath} is valid Spec JSON document with ${result.errors.length} errors and ${result.warnings.length} warnings.`,
  );
}

/**
 * Returns a JSON Schema validator instance that validates JSON objects according to the given JSON Schema
 */
export function getJsonSchemaValidator(jsonSchema: SpecJsonSchemaRoot): ValidateFunction {
  try {
    return preparedAjv.compile(jsonSchema);
  } catch (err) {
    log.error("JSON Schema Validation issue (ajv)");
    log.error(err);
    log.error(preparedAjv.errors);
    throw new Error("JSON Schema Validation issue (ajv)");
  }
}

/**
 * Validate JSON Schema to be a valid JSON Schema document
 */
export function validateJsonSchema(
  jsonSchema: SpecJsonSchemaRoot,
  jsonSchemaFilePath: string,
): ValidationResultEntry[] {
  const errors: ValidationResultEntry[] = [];

  const jsonSchemaMeta = fs.readJSONSync("./node_modules/ajv/lib/refs/json-schema-draft-07.json") as SpecJsonSchemaRoot;
  delete jsonSchemaMeta.$id;

  const validateMetaSchema = getJsonSchemaValidator(jsonSchemaMeta);
  const validMetaSchema = validateMetaSchema(jsonSchema);

  if (!validMetaSchema) {
    for (const error of validateMetaSchema.errors!) {
      errors.push({
        message: error.message || "JSON Schema validation issue",
        details: JSON.stringify(error, null, 2),
        context: `${jsonSchemaFilePath}#${error.instancePath}`,
      });
    }
  }

  return errors;
}

export function validateRefLinks(jsonSchema: SpecJsonSchemaRoot, jsonSchemaFilePath: string): ValidationResultEntry[] {
  const errors: ValidationResultEntry[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function cloneFn(this: SpecJsonSchemaRoot, value: any, _key: any, _object: any, _stack: any): any {
    if (value && value.$ref) {
      const $ref = value.$ref as string;
      const refArr = $ref.split("/");

      if (!$ref.startsWith("#/definitions/")) {
        errors.push({
          message: `Invalid $ref "${$ref}", in Spec JSON Schema. MUST start with "#/definitions/" (only relative $refs to)`,
          context: `${jsonSchemaFilePath}`,
        });
      }

      if (refArr.length === 3) {
        // $ref to a definition

        if (!this.definitions[refArr[2]]) {
          errors.push({
            message: `Invalid $ref "${$ref}", pointing to unknown definition.`,
            context: `${jsonSchemaFilePath}`,
          });
        }
      } else {
        errors.push({
          message: `Invalid $ref "${$ref}" in Spec JSON Schema. MUST only point to definition name, not deeper inside it.`,
          context: `${jsonSchemaFilePath}`,
        });
      }
    }
  }
  _.cloneDeepWith(jsonSchema, cloneFn.bind(jsonSchema)) as SpecJsonSchema;

  return errors;
}

export function checkRequiredPropertiesExist(jsonSchemaObject: SpecJsonSchema): void {
  if (!jsonSchemaObject.properties) {
    return;
  }
  // VALIDATION: Check that every property that is required also exists
  if (jsonSchemaObject.required) {
    for (const requiredProperty of jsonSchemaObject.required) {
      if (!jsonSchemaObject.properties[requiredProperty]) {
        throw new Error(`${jsonSchemaObject.title} requires non-existing property ${requiredProperty}`);
      }
    }
  }
}

/**
 * Validate property name to follow lowerCaseCamelCase naming convention
 */
export function validatePropertyName(propertyName: string): void {
  // Validate that all propertyNames start with a lowercase character
  if (propertyName.charAt(0) !== propertyName.charAt(0).toLowerCase()) {
    throw new Error(`PropertyName "${propertyName}" MUST start with lowercase character.`);
  }
  // Validate that propertyNames do not use dash or lodash notation
  if (propertyName.includes("-") || propertyName.includes("_")) {
    throw new Error(`PropertyName "${propertyName}" MUST not use dash or lodash notation.`);
  }
}
