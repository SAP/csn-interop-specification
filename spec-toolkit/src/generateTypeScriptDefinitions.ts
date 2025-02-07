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

export async function generateTypeScriptDefinitions(schemaName: string, schema?: SpecJsonSchemaRoot): Promise<string> {
  if (!schema) {
    schema = yaml.load(fs.readFileSync(`./spec/v1/${schemaName}.schema.yaml`).toString()) as SpecJsonSchemaRoot;
  }

  schema = convertRefToDocToStandardRef(schema);
  schema = convertOneOfEnum(schema);
  schema = convertAnyOfEnum(schema);
  schema = convertAllOfWithIfThenDiscriminatorToOneOf(schema);

  // Schema cleaned up
  schema = removeDescriptionsFromRefPointers(schema);
  const allCustomPropertiesTypescriptTypes = schema["x-custom-typescript-types"];
  schema = await removeExtensionAttributes(schema);
  schema = ensureRootLevelSchema(schema);
  const convertedDocumentSchema = schema as JSONSchema4;

  let definitions = await jsonSchemaToTypeScript(convertedDocumentSchema, `${schemaName}`, {
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

  const filePath1 = `src/types/v1/${schemaName}.ts`;
  await fs.outputFile(`${process.cwd()}/${filePath1}`, definitions);
  log.info(`Result: ./${filePath1}`);
  // const filePath3 = `src/spec-v1/interfaces/${schemaName}.ts`
  // await fs.outputFile(`${process.cwd()}/${filePath3}`, definitions)
  // const filePath2 = `src/spec-v1/interfaces/${schemaName}.ts.txt`
  // await fs.outputFile(`${process.cwd()}/${filePath2}`, definitions)

  return definitions;
}
