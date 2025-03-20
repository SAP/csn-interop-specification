import { Command, Option } from "commander";
import * as packageJson from "../package.json" with { type: "json" };
import { readFileSync } from "node:fs";
import { generate } from "./generate.js";
import path from "node:path";
import { ConfigFile } from "./model/Config.js";

interface CliOptions {
  config: string;
}

/**
 * Executes the CLI with additional command line arguments (argv)
 */
function init(argv: string[]): void {
  const configFilePath = new Option(
    "--config <configFilePath>",
    "config file, containing spec-toolkit configuration options",
  ).makeOptionMandatory();

  const program = new Command();
  program
    .version(packageJson.default.version)
    .name("spec-toolkit")
    .usage("--config <configFilePath>")
    .description("Generates schema based interface documentation")
    .addOption(configFilePath)
    .action(run);

  program.parse(argv);
}

async function run(argv: CliOptions): Promise<void> {
  let configFileContent = "";
  const configFilePath = path.join(process.cwd(), argv.config);

  try {
    configFileContent = readFileSync(configFilePath, "utf-8");
  } catch (error) {
    process.stderr.write(`[error]: ${error}\n\n`);
    process.exit(1);
  }

  try {
    const configData = JSON.parse(configFileContent);
    // TODO: Validate configData against spec-toolkit config JSON schema(tbd) before casting it as ConfigFile
    // throw error if validation fails
    await generate(configData as ConfigFile);
  } catch (error) {
    process.stderr.write(`${error}\n\n`);
    process.exit(1);
  }
}

export { init };
