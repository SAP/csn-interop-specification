import {
  convertAllOfWithIfThenDiscriminatorToOneOf,
  convertAnyOfEnum,
  convertOneOfEnum,
  ensureRootLevelSchema,
  convertRefToDocToStandardRef,
  removeDescriptionsFromRefPointers,
  removeExtensionAttributes,
} from "./util/jsonSchemaConversion.js";

import { JSONSchema4 } from "json-schema";
import { SpecJsonSchemaRoot } from "./model/SpecJsonSchema.js";
import fs from "fs-extra";
import { compile as jsonSchemaToTypeScript } from "json-schema-to-typescript";
import { log } from "./util/log.js";
import yaml from "js-yaml";
import { ConfigFile } from "./model/Config.js";

export async function generateTypeScriptDefinitions(configData: ConfigFile): Promise<void> {
  for (const docConfig of configData.docsConfig) {
    // typescript types will be generated only for spec documents
    // because specExtension documents are just fragments that will be merged into the bigger spec document
    // it does not make sense to have typescript types generated out of fragment files
    if (docConfig.type === "spec") {
      const schemaFileName = docConfig.targetJsonSchemaFilePath;
      let schema = yaml.load(fs.readFileSync(schemaFileName).toString()) as SpecJsonSchemaRoot;

      schema = convertRefToDocToStandardRef(schema);
      schema = convertOneOfEnum(schema);
      schema = convertAnyOfEnum(schema);
      schema = convertAllOfWithIfThenDiscriminatorToOneOf(schema);

      // Schema cleaned up
      schema = removeDescriptionsFromRefPointers(schema);
      const allCustomPropertiesTypescriptTypes = schema["x-custom-typescript-types"];
      schema = removeExtensionAttributes(schema);
      schema = ensureRootLevelSchema(schema);
      const convertedDocumentSchema = schema as JSONSchema4;

      let definitions = await jsonSchemaToTypeScript(convertedDocumentSchema, `${docConfig.id}`, {
        unknownAny: true,
        bannerComment: "// AUTO-GENERATED definition files. Do not modify directly.\n\n",
        strictIndexSignatures: true,
        declareExternallyReferenced: true,
        inferStringEnumKeysFromValues: false,
      });

      // Clean up unnecessary "This interface was referenced..." mentions
      definitions = definitions.replace(/ {3}\*\n {3}\* This interface was referenced by (.*)\n(.*)\n/gm, "");

      // Add export of custom defined x-custom-typescript-types
      if (allCustomPropertiesTypescriptTypes) {
        for (const xPatternPropertiesTypescriptTypes of allCustomPropertiesTypescriptTypes) {
          definitions +=
            `\n export type ${xPatternPropertiesTypescriptTypes.typeName} = ` +
            `${xPatternPropertiesTypescriptTypes.typeValue}` +
            `;\n`;
        }
      }

      // Post processing for all tsType "// replaceKeyType_" markings
      const allPostProcessingReplacements: { oldValue: string; newValue: string }[] = [];
      const allPostProcessingReplacementMatches = [...definitions.matchAll(/.*replaceKeyType_{(.*)}/gm)];
      for (const match of allPostProcessingReplacementMatches) {
        const replacementNewValue = match[0].replace("string", match[1]).split(";")[0] + ";";
        const indexStart = match.index;
        const indexEnd = match.index + match[0].length;
        allPostProcessingReplacements.push({
          oldValue: definitions.substring(indexStart, indexEnd),
          newValue: replacementNewValue,
        });
      }
      for (const replacement of allPostProcessingReplacements) {
        definitions = definitions.replace(replacement.oldValue, replacement.newValue);
      }

      await fs.outputFile(`${process.cwd()}/${docConfig.targetTypescriptTypesFilePath}`, definitions);
      log.info(`Result: ./${docConfig.targetTypescriptTypesFilePath}`);
    }
  }
}
