// This is just a wrapper that executes the generators in one go.

// TODO: Convert this to a general-purpose CLI script that takes everything it needs as config or params

import { generateExampleDocumentation } from "./spec-toolkit/generateExampleDocumentation";
import { generateInterfaceDocumentationFromConfig } from "./spec-toolkit/generateInterfaceDocumentation";
import { generateTypeScriptDefinitions } from "./spec-toolkit/generateTypeScriptDefinitions";
import { log } from "./spec-toolkit/util/log";
import { mergeSpecExtensions } from "./spec-toolkit/mergeSpecExtensions";
import { SpecJsonSchemaRoot } from "./spec-toolkit/model/SpecJsonSchema";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

execCli(argv).catch((err): void => {
  log.error(err);
  process.exit(1);
});

async function execCli(_argv?: minimist.ParsedArgs): Promise<void> {
  log.info(" ");
  log.info("==========================================================================");
  log.info("GENERATE Spec (GitHub) Page");
  log.info("==========================================================================");

  // Generate everything in order
  const csnInteropEffectiveSchema = await generateInterfaceDocumentation();

  const mergedSpecSchema = await generateAndMergeSpecExtensions(csnInteropEffectiveSchema);

  generateExamplePages();

  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE TypeScript Definitions");
  log.info("--------------------------------------------------------------------------");
  await generateTypeScriptDefinitions("CSN-Interop-Effective", mergedSpecSchema);

  log.info(" ");
  log.info("==========================================================================");
  log.info("SUCCESS: Page successfully generated to ./spec/v1");
  log.info("Run `npm run serve` to open it in a browser");
  log.info("==========================================================================");
}

export function generateInterfaceDocumentation(): SpecJsonSchemaRoot {
  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE INTERFACE DOCUMENTATION (JSON-SCHEMA -> MD)");
  log.info("--------------------------------------------------------------------------");
  const result = generateInterfaceDocumentationFromConfig();
  const csnInteropEffectiveSchema = result[0].jsonSchema;
  return csnInteropEffectiveSchema;
}

export async function generateAndMergeSpecExtensions(schema: SpecJsonSchemaRoot): Promise<SpecJsonSchemaRoot> {
  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE AND MERGE SPEC EXTENSIONS");
  log.info("--------------------------------------------------------------------------");
  const mergedSpecSchema = await mergeSpecExtensionFiles(schema, "csn-interop-effective", "src/spec-v1");
  return mergedSpecSchema;
}

export function generateExamplePages(): void {
  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE INTERFACE EXAMPLE PAGES");
  log.info("--------------------------------------------------------------------------");
  generateExampleDocumentation("./examples", "CSN Interop Effective", "./docs/spec-v1/examples");
}

export async function mergeSpecExtensionFiles(
  targetDocument: SpecJsonSchemaRoot,
  fileName: string,
  folder: string,
): Promise<SpecJsonSchemaRoot> {
  // TODO: Load this list from config file (genConfig.json)
  return await mergeSpecExtensions({
    specExtensions: [
      "./spec/annotations/aggregation.yaml",
      "./spec/annotations/analytics-details.yaml",
      "./spec/annotations/consumption.yaml",
      "./spec/annotations/enduser-text.yaml",
      "./spec/annotations/entity-relationship.yaml",
      "./spec/annotations/object-model.yaml",
      "./spec/annotations/odm.yaml",
      "./spec/annotations/personal-data.yaml",
      "./spec/annotations/semantics.yaml",
    ],
    targetDocument: targetDocument,
    targetDocumentFileName: fileName,
    targetDocumentFolder: folder,
  });
}
