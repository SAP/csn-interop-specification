/*
 **
 ** This is a wrapper that executes all the generators in one go.
 **
 * */
import { generateExampleDocumentation } from "./generateExampleDocumentation.js";
import { jsonSchemaToDocumentation } from "./generateInterfaceDocumentation.js";
import { generateTypeScriptDefinitions } from "./generateTypeScriptDefinitions.js";
import { log } from "./util/log.js";
import { mergeSpecExtensions } from "./mergeSpecExtensions.js";
import { ConfigFile } from "./model/Config.js";

export async function generate(configData: ConfigFile): Promise<void> {
  log.info(" ");
  log.info("==========================================================================");
  log.info("GENERATE Spec (GitHub) Page");
  log.info("==========================================================================");

  // Generate everything in order

  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE INTERFACE DOCUMENTATION (JSON-SCHEMA -> MD)");
  log.info("--------------------------------------------------------------------------");
  jsonSchemaToDocumentation(configData);

  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE AND MERGE SPEC EXTENSIONS");
  log.info("--------------------------------------------------------------------------");
  const mergedSpecSchema = mergeSpecExtensions(configData);

  log.info(" ");
  log.info("--------------------------------------------------------------------------");
  log.info("GENERATE INTERFACE EXAMPLE PAGES");
  log.info("--------------------------------------------------------------------------");
  generateExampleDocumentation("./examples", "CSN Interop Effective", "./docs/spec-v1/examples");

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
