import { Command, Option } from "commander";
import * as packageJson from "../package.json" with { type: "json" };
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
    "-c, --config <configFilePath>",
    "path to spec-toolkit config file (default: `./spec-toolkit.config.js`)",
  ).default("spec-toolkit.config.js");

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
  let configJsModule;
  const configFilePath = path.join(process.cwd(), argv.config);

  try {
    configJsModule = await import(`file:///${configFilePath}`);
  } catch (error) {
    process.stderr.write(`[error]: ${error}\n\n`);
    process.exit(1);
  }

  try {
    // TODO: Validate configData against spec-toolkit config JSON schema(tbd) before casting it as ConfigFile
    // throw error if validation fails
    await generate(configJsModule.default as ConfigFile);
  } catch (error) {
    process.stderr.write(`${error}\n\n`);
    process.exit(1);
  }
}

export { init };
