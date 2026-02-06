/* eslint-disable no-console */
const fs = require("fs-extra");

async function copyGeneratedToDestination() {
  try {
    console.log("Starting file copy operations...");

    // Create docs/spec-v1/ directory and copy files
    await fs.ensureDir("docs/spec-v1/");
    await fs.copy("./src/generated/spec/v1/docs", "docs/spec-v1/");

    // Create static/spec-v1/ directory and copy files
    await fs.ensureDir("static/spec-v1/");
    await fs.copy("./src/generated/spec/v1/schemas", "static/spec-v1/");

    console.log("Files copied successfully.");
  } catch (error) {
    console.error("Error copying files:", error);
    process.exit(1);
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  copyGeneratedToDestination();
}

module.exports = copyGeneratedToDestination;
