import * as fs from "fs-extra";
import * as fg from "fast-glob";
import { log } from "./spec-toolkit/util/log";

// Only execute this when called via CLI
if (require.main === module) {
  execCli();
}

function execCli(): void {
  log.info(" ");
  log.info("==========================================================================");
  log.info("CLEANUP PROJECT");
  log.info("==========================================================================");

  clean();

  log.info("--------------------------------------------------------------------------");
  log.info("SUCCESS: Cleanup done.");
  log.info("--------------------------------------------------------------------------");
  log.info(" ");
}

function clean(): void {
  const folders = ["./build", "./dist", "./docs/annotations", "./docs/spec-v1/", "./static/spec-v1"];
  for (const folder of folders) {
    log.info("Cleaning up: " + folder);
    const files = fg.sync("**/*", {
      cwd: folder,
      absolute: true,
      ignore: ["**/index.md", "**/index.mdx", "**/_category_.json"],
    });
    for (const file of files) {
      log.debug("Deleting: " + file);
      fs.removeSync(file);
    }
  }
}
