import * as fs from "fs-extra";

import Ajv, { ValidateFunction } from "ajv";
import { SpecJsonSchema, SpecJsonSchemaRoot } from "../model/SpecJsonSchema";

import _ from "lodash";
import addFormats from "ajv-formats";
import { log } from "./log";

// Prepare JSON Schema validator
export const preparedAjv = new Ajv({ allErrors: true, allowUnionTypes: true, allowMatchingProperties: true });
addFormats(preparedAjv);
preparedAjv.addKeyword("x-recommended");
preparedAjv.addKeyword("x-introduced-in-version");
preparedAjv.addKeyword("x-feature-status");
preparedAjv.addKeyword("x-pattern-properties-description");
preparedAjv.addKeyword("x-property-order");
preparedAjv.addKeyword("x-association-target");
preparedAjv.addKeyword("x-hide-property");
preparedAjv.addKeyword("x-hide-properties");
preparedAjv.addKeyword("x-ignore-conventions");
preparedAjv.addKeyword("x-extension");
preparedAjv.addKeyword("x-extension-targets");
preparedAjv.addKeyword("x-extension-points");
preparedAjv.addKeyword("x-header-level");
preparedAjv.addKeyword("x-ref-to-doc");
preparedAjv.addKeyword("x-context");

// JSON Schema -> TypeScript conversion
preparedAjv.addKeyword("tsType");

export interface ValidationResult {
  errors: ValidationResultEntry[];
  warnings: ValidationResultEntry[];
}

export interface ValidationResultEntry {
  message: string;
  details?: string;
  context?: string[];
}

/**
 * Validate a Spec JSON Schema file, before working with it
 *
 * TODO: Add more validations here and improve feedback to end-user
 *
 * This will also do some pre-processing:
 * * Adding `x-context` for easier debugging and further use
 * * Adding missing `title` properties
 */
export function validateSpecJsonSchema(jsonSchema: SpecJsonSchemaRoot, exception: boolean = false): ValidationResult {
  const result: ValidationResult = {
    errors: [],
    warnings: [],
  };

  validateJsonSchema(jsonSchema);

  result.errors.push(...validateRefLinks(jsonSchema));

  for (const error of result.errors) {
    log.error(`${getContextTextFromArray(error.context)} ${error.message}`);
    if (error.details) {
      log.error(error.details);
    }
  }
  for (const warning of result.warnings) {
    log.warn(`${getContextTextFromArray(warning.context)} ${warning.message}`);
    if (warning.details) {
      log.error(warning.details);
    }
  }

  if (exception && result.errors.length) {
    throw new Error(`Validation of Spec JSON Schema failed with errors.`);
  }

  log.info(
    `${getContextText(jsonSchema)} is valid Spec JSON document with ${result.errors.length} errors and ${result.warnings.length} warnings.`,
  );

  return result;
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
export function validateJsonSchema(jsonSchema: SpecJsonSchemaRoot | SpecJsonSchema): ValidationResultEntry[] {
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
        context: jsonSchema["x-context"],
      });
    }
  }

  return errors;
}

export function validateRefLinks(jsonSchema: SpecJsonSchemaRoot): ValidationResultEntry[] {
  const errors: ValidationResultEntry[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function cloneFn(this: SpecJsonSchemaRoot, value: any, _index: any, object: any, _stack: any): any {
    let lastKnownContext = this["x-context"];

    if (value && value["x-context"]) {
      lastKnownContext = value["x-context"] || object["x-context"] || this["x-context"];
    }

    if (value && value.$ref) {
      const $ref = value.$ref as string;
      const refArr = $ref.split("/");

      if (!$ref.startsWith("#/definitions/")) {
        errors.push({
          message: `$refs in Spec JSON Schema MUST start with "#/definitions/" (only relative $refs to ) `,
          context: lastKnownContext,
        });
      }

      if (refArr.length === 3) {
        // $ref to a definition

        if (!this.definitions[refArr[2]]) {
          errors.push({
            message: `Invalid $ref "${$ref}", pointing to unknown definition.`,
            context: lastKnownContext,
          });
        }
      } else {
        errors.push({
          message: `$refs in Spec JSON Schema MUST only point to definitions, not deeper inside it.`,
          context: lastKnownContext,
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

export function getContextText(jsonSchema: SpecJsonSchema): string {
  if (!jsonSchema["x-context"]) {
    return "[unknown]";
  } else if (!jsonSchema["x-context"].length) {
    return "[unknown]";
  } else {
    return `[${jsonSchema["x-context"].join(" | ")}]`;
  }
}

export function getContextTextFromArray(context: string[] = []): string {
  if (!context.length) {
    return "[unknown]";
  }
  return `[${context.join(" | ")}]`;
}
