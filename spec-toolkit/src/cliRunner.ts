import { Command, Option } from "commander";
import * as packageJson from "../package.json" with { type: "json" };
import { readFileSync } from "node:fs";
import  {generate } from "./generate.js"
import path from "node:path";

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
    .description(
      "Generates schema based interface documentation",
    )
    .addOption(configFilePath)
    .action(run);

  program.parse(argv);
}

async function run(argv: CliOptions) {
  let configData = "";
  const configFilePath = path.join(process.cwd(), argv.config)

  try {
    configData = readFileSync(configFilePath, "utf-8");
  } catch (error) {
    process.stderr.write(`[error]: ${error}\n\n`);
    process.exit(1);
  }

  try {
    generate(JSON.parse(configData));
  } catch (error) {
    process.stderr.write(`${error}\n\n`);
    process.exit(1);
  }

}

export { init };
