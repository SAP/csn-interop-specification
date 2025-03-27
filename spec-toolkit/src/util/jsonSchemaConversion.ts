import _ from "lodash";
import { log } from "./log.js";

import { SpecJsonSchema, SpecJsonSchemaRoot } from "../model/SpecJsonSchema.js";
import { detectAnyOfEnum, detectOneOfEnum } from "../generateInterfaceDocumentation.js";

/**
 * Prepare a Spec JSON Schema file, so it is easier to work with.
 *
 * This will do some pre-processing and enrichment:
 * * Adding `x-context` for easier debugging and further use
 * * Adding missing `title` properties
 */
export function preprocessSpecJsonSchema(
  jsonSchema: SpecJsonSchemaRoot,
  jsonSchemaFileName: string,
): SpecJsonSchemaRoot {
  // Deep clone, just to avoid accidental mutations of input
  let result = JSON.parse(JSON.stringify(jsonSchema));

  result = removeNullProperties(result);

  // Enrich x-context and titles
  result["x-context"] = [jsonSchemaFileName];
  result.definitions = result.definitions || {};
  for (const definitionName in result.definitions) {
    const definition = result.definitions[definitionName];

    if (!definition.title) {
      definition.title = definitionName;
    }

    definition["x-context"] = [jsonSchemaFileName, definitionName];
    if (!definition.title) {
      definition.title = definitionName;
    }

    if (definition.properties) {
      for (const propertyName in definition.properties) {
        const property = definition.properties[propertyName] as SpecJsonSchemaRoot;
        try {
          property["x-context"] = [jsonSchemaFileName, definitionName, propertyName];
        } catch (err) {
          log.error(`Could not add x-context to ${[jsonSchemaFileName, definitionName, propertyName]}`);
          log.error(err);
        }
      }
    }
  }

  return result;
}

/**
 * Workaround for enums expressed as oneOf const
 * -> oneOf is not well presented in SwaggerUI
 * -> oneOf is not supported by the JSON Schema to TS library
 *
 * This will convert oneOf that represents an enum back to regular enums
 * Mutating function!
 *
 * @see https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
 */
export function convertOneOfEnum(documentSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  // Workaround for enums expressed as oneOf const
  // -> oneOf is not supported by the JSON Schema to TS library
  for (const jsonSchemaObjectId in documentSchema.definitions) {
    const jsonSchemaObject = documentSchema.definitions[jsonSchemaObjectId];

    if (jsonSchemaObject.properties) {
      for (const propertyName in jsonSchemaObject.properties) {
        const property = jsonSchemaObject.properties[propertyName];
        const propertyItems = property.items;

        if (property.oneOf && detectOneOfEnum(property)) {
          property.enum = [];
          for (const oneOfItem of property.oneOf) {
            if (oneOfItem.const) {
              property.enum.push(oneOfItem.const);
            }
          }
          delete property.oneOf;
        } else if (propertyItems && propertyItems.oneOf && detectOneOfEnum(propertyItems)) {
          // Do the same for .items
          propertyItems.enum = [];
          for (const oneOfItem of propertyItems.oneOf) {
            if (oneOfItem.const) {
              propertyItems.enum.push(oneOfItem.const);
            }
          }
          delete property.oneOf;
        }
      }
    }
  }
  return documentSchema;
}

/**
 * Workaround for extensible enums expressed as anyOf const
 * -> const is not supported by the JSON Schema to TS library
 *
 * This will convert anyOf const that represents an extensible enum back to anyOf enums
 * Mutating function!
 *
 * @see https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
 */
export function convertAnyOfEnum(documentSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  // Workaround for enums expressed as oneOf const
  // -> oneOf is not supported by the JSON Schema to TS library
  for (const jsonSchemaObjectId in documentSchema.definitions) {
    const jsonSchemaObject = documentSchema.definitions[jsonSchemaObjectId];

    if (jsonSchemaObject.properties) {
      for (const propertyName in jsonSchemaObject.properties) {
        const property = jsonSchemaObject.properties[propertyName];
        const propertyItems = property.items;

        if (property.anyOf && detectAnyOfEnum(property)) {
          for (const anyOfItem of property.anyOf) {
            if (anyOfItem.const) {
              anyOfItem.enum = [anyOfItem.const];
              delete anyOfItem.const;
            }
          }
        } else if (propertyItems && propertyItems.anyOf && detectAnyOfEnum(propertyItems)) {
          // Do the same for .items
          for (const anyOfItem of propertyItems.anyOf) {
            if (anyOfItem.const) {
              anyOfItem.enum = [anyOfItem.const];
              delete anyOfItem.const;
            }
          }
        }
      }
    }
  }

  return documentSchema;
}

/**
 * Workaround for allOf with if/then
 * -> if/then/else is not supported by the JSON Schema to TS library
 *
 * This will convert allOf with if/then $refs back to oneOf $refs
 * Mutating function!
 *
 * Feature request: @see https://github.com/bcherny/json-schema-to-typescript/issues/426
 *
 * Why we use allOf if if/then in json schema spec?:
 * @see https://json-schema.org/understanding-json-schema/reference/conditionals#ifthenelse
 * @see https://github.com/orgs/json-schema-org/discussions/529#discussioncomment-7569552
 */
export function convertAllOfWithIfThenDiscriminatorToOneOf(documentSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  for (const jsonSchemaObjectId in documentSchema.definitions) {
    const jsonSchemaObject = documentSchema.definitions[jsonSchemaObjectId];
    const allOf = jsonSchemaObject.allOf;
    if (allOf) {
      const allOfReferences: SpecJsonSchema[] = [];
      for (const allOfItem of allOf) {
        if (allOfItem.if && allOfItem.then && allOfItem.then.$ref) {
          allOfReferences.push({ $ref: allOfItem.then.$ref });
        } else {
          continue;
        }
      }
      jsonSchemaObject.oneOf = [...allOfReferences];
      delete jsonSchemaObject.allOf;
    }
  }
  return documentSchema;
}

/**
 * Will remove descriptions from objects which should only carry a `$ref` pointer
 * The description is used by the human readable interface documentation,
 * but it causes problems (e.g. duplicates) for the TypeScript definition generation
 */
export function removeDescriptionsFromRefPointers(jsonSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  if (jsonSchema.definitions) {
    for (const definitionName in jsonSchema.definitions) {
      const definition = jsonSchema.definitions[definitionName];
      if (definition.$ref && definition.description) {
        delete definition.description;
      }
      if (definition.properties) {
        for (const propertyName in definition.properties) {
          const property = definition.properties[propertyName];
          if (property.$ref && property.description) {
            delete property.description;
          }
          // Also remove x-introduced-in-version as we use this for documentation as well
          if (property.$ref && property["x-introduced-in-version"]) {
            delete property["x-introduced-in-version"];
          }
        }
      }
    }
  }
  return jsonSchema;
}

/**
 * Clean up all x-properties from schema
 *
 */
export function removeAllExtensionProperties(jsonSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  return JSON.parse(
    JSON.stringify(jsonSchema, (key, val) => {
      return key.startsWith("x-") ? undefined : val;
    }),
  );
}

/**
 * Clean up x-properties from schema
 *
 */
export function removeSomeExtensionProperties(jsonSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  // list of "x-" properties that are considered relevant for end spec consumers and should not be cleaned
  const allowedListProperties = [
    "x-extension-targets",
    "x-extension-points",
    "x-recommended",
    "x-introduced-in-version",
    "x-feature-status",
    "x-pattern-properties-description",
    "x-association-target",
    "x-root-entity",
  ];

  return JSON.parse(
    JSON.stringify(jsonSchema, (key, val) => {
      return key.startsWith("x-") && allowedListProperties.indexOf(key) < 0 ? undefined : val;
    }),
  );
}

/**
 * Clean up x-properties which should not appear in final schema
 *
 * Done in a very generic manner
 */
export function removeNullProperties(jsonSchema: SpecJsonSchemaRoot): SpecJsonSchemaRoot {
  return JSON.parse(
    JSON.stringify(jsonSchema, (_key, val) => {
      return val === null ? undefined : val;
    }),
  );
}
