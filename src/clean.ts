// TODO: review file necessity, probably it can be deleted
/* eslint-disable no-console */
import * as fs from "fs-extra";
import * as fg from "fast-glob";

// Only execute this when called via CLI
if (require.main === module) {
  execCli();
}

function execCli(): void {
  console.info(" ");
  console.info("==========================================================================");
  console.info("CLEANUP PROJECT");
  console.info("==========================================================================");

  clean();

  console.info("--------------------------------------------------------------------------");
  console.info("SUCCESS: Cleanup done.");
  console.info("--------------------------------------------------------------------------");
  console.info(" ");
}

function clean(): void {
  const folders = ["./build", "./dist", "./docs/spec-v1/", "./static/spec-v1"];
  for (const folder of folders) {
    console.info("Cleaning up: " + folder);
    const files = fg.sync("**/*", {
      cwd: folder,
      absolute: true,
      ignore: ["**/index.md", "**/index.mdx", "**/_category_.json", "**/consumption.md"],
    });
    for (const file of files) {
      console.debug("Deleting: " + file);
      fs.removeSync(file);
    }
  }
}
