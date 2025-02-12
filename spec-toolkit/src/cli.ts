#!/usr/bin/env node
import { init } from "./cliRunner.js";

try {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split(".");
  const major = parseInt(semver[0]);

  // eslint-disable-next-line no-console
  console.log(process.argv);

  if (major < 20) {
    process.stdout.write(
      "You are running Node " +
        currentNodeVersion +
        ".\n" +
        "spec-toolkit requires Node 20 or higher. \n" +
        "Please update your version of Node.",
    );
    process.exit(1);
  }

  init(process.argv);
} catch (err) {
  process.stdout.write(String(err));
  process.exit(1);
}
