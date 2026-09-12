const { cp, mkdir } = require("node:fs/promises");

async function copyGeneratedToDestination() {
  try {
    console.log("Starting file copy operations...");

    // Create docs/spec-v1/ directory and copy files
    await mkdir("docs/spec-v1/", { recursive: true });
    await cp("./src/generated/spec/v1/docs", "docs/spec-v1/", {
      recursive: true,
    });

    // Create static/spec-v1/ directory and copy files
    await mkdir("static/spec-v1/", { recursive: true });
    await cp("./src/generated/spec/v1/schemas", "static/spec-v1/", {
      recursive: true,
    });

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
