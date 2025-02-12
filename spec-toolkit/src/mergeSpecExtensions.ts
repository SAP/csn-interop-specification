import fs from "fs-extra";
import * as yaml from "js-yaml";
import { log } from "./util/log.js";
import { SpecJsonSchemaRoot } from "./model/SpecJsonSchema.js";
import { validateSpecJsonSchema } from "./util/validation.js";
import { writeSpecJsonSchemaFiles } from "./generateInterfaceDocumentation.js";

export interface MergeSpecExtensionsConfig {
  targetDocument: SpecJsonSchemaRoot;
  targetDocumentFileName: string;
  targetDocumentFolder: string;
  specExtensions: string[]; // array of file paths
}

export function mergeSpecExtensions(mergeSpecExtensionsConfig: MergeSpecExtensionsConfig): SpecJsonSchemaRoot {
  const targetDocument = mergeSpecExtensionsConfig.targetDocument;

  log.info("Detecting Extension Points in target document");
  // Preparation: Detect and remember extension points
  // key: Extension Point Name
  // value: Array<Definition name in JSON Schema>
  const extensionPointsMap: { [extensionPointName: string]: string[] } = {};

  for (const definitionName in targetDocument.definitions) {
    const definition = targetDocument.definitions[definitionName];

    if (definition["x-extension-points"]) {
      for (const extensionPoint of definition["x-extension-points"]) {
        if (!extensionPointsMap[extensionPoint]) {
          extensionPointsMap[extensionPoint] = [definitionName];
        } else {
          if (!extensionPointsMap[extensionPoint].includes(definitionName)) {
            extensionPointsMap[extensionPoint].push(definitionName);
          }
        }
      }
    }
  }

  for (const specExtensionFile of mergeSpecExtensionsConfig.specExtensions) {
    log.info(`Merging ${specExtensionFile}`);

    const fileText = fs.readFileSync(specExtensionFile).toString();
    const specExtension = yaml.load(fileText) as SpecJsonSchemaRoot;

    // Replace x-ref-to-doc with real $ref links
    for (const definitionName in specExtension.definitions) {
      const definition = specExtension.definitions[definitionName];
      if (definition["x-ref-to-doc"]) {
        definition.$ref = definition["x-ref-to-doc"].ref;
      }
    }

    // Now merge the JSON Schema definitions
    for (const definitionName in specExtension.definitions) {
      const definition = specExtension.definitions[definitionName];

      if (targetDocument.definitions[definitionName]) {
        throw new Error(`Cannot merge spec extension definition ${definitionName} as the name is already taken.`);
      }

      targetDocument.definitions[definitionName] = definition;
    }

    // Create the $refs in the extension points to the extensions
    for (const definitionName in specExtension.definitions) {
      const definition = specExtension.definitions[definitionName];

      if (definition["x-extension-targets"]) {
        for (const extensionTarget of definition["x-extension-targets"]) {
          if (!extensionPointsMap[extensionTarget]) {
            throw new Error(`Extension Point "${extensionTarget}" is not defined in target document`);
          }

          for (const targetDefinition of extensionPointsMap[extensionTarget]) {
            if (!targetDocument.definitions[targetDefinition].properties) {
              throw new Error(`Definition "${targetDefinition}" in target document must be an object with properties`);
            }
            if (targetDocument.definitions[targetDefinition].properties[definitionName]) {
              throw new Error(
                `Definition "${targetDefinition}" in target document already has property "${definitionName}"`,
              );
            }
            targetDocument.definitions[targetDefinition].properties[definitionName] = {
              $ref: `#/definitions/${definitionName}`,
            };
          }
        }
      }
    }
  }

  // Validate resulting JSON Schema document
  validateSpecJsonSchema(targetDocument);

  // fs.outputFileSync(mergeSpecExtensionsConfig.targetDocumentFilePath, JSON.stringify(targetDocument, null, 2))

  writeSpecJsonSchemaFiles(
    mergeSpecExtensionsConfig.targetDocumentFolder,
    mergeSpecExtensionsConfig.targetDocumentFileName,
    targetDocument,
  );

  log.info(`Written: ${mergeSpecExtensionsConfig.targetDocumentFileName}`);

  return targetDocument;
}
