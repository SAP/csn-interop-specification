import { Command, Option } from "commander";
import * as packageJson from "../package.json" with { type: "json" };
import { readFileSync } from "node:fs";
import { generate } from "./generate.js";
import path from "node:path";
import { ConfigFile } from "./model/Config.js";

interface CliOptions {
  config: string;
}

const DEFAULT_CONFIG_FILE_NAME = "./spec-toolkit.config.json";

/**
 * Executes the CLI with additional command line arguments (argv)
 */
function init(argv: string[]): void {
  const configFilePath = new Option(
    "-c, --config <configFilePath>",
    `path to spec-toolkit config file (default: ${DEFAULT_CONFIG_FILE_NAME})`,
  ).default(DEFAULT_CONFIG_FILE_NAME);

  const program = new Command();
  program
    .version(packageJson.default.version)
    .name("spec-toolkit")
    .usage("[options]")
    .description("Generates schema based interface documentation")
    .addOption(configFilePath)
    .action(run);

  program.parse(argv);
}

async function run(argv: CliOptions): Promise<void> {
  let configData: unknown;
  const configFilePath = path.join(process.cwd(), argv.config);

  try {
    if (configFilePath.endsWith(".json")) {
      const configFileContent = readFileSync(configFilePath, "utf-8");
      configData = JSON.parse(configFileContent);
    } else {
      throw new Error(`Unsupported file extension: ${configFilePath}`);
    }
  } catch (error) {
    process.stderr.write(`[error]: ${error}\n\n`);
    process.exit(1);
  }

  try {
    // TODO: Validate configData against spec-toolkit config JSON schema(tbd) before casting it as ConfigFile
    // throw error if validation fails
    await generate(configData as ConfigFile);
  } catch (error) {
    process.stderr.write(`${error}\n\n`);
    process.exit(1);
  }
}

export { init };
