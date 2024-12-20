/* eslint-disable no-console */
// Demo script how we can "fix" / align CSN files that do not fully match the CSN Interop spec
// We could extend this to convert standard ABAP / CAP Effective CSN to CSN Interop in the future,
// if we cover all necessary conversion / fixing cases.

const fg = require("fast-glob");
const fs = require("fs-extra");
const path = require("path");

const targetDir = process.argv[2] || "./tmp/s4-csn/";

const files = fg.sync("*.json", { cwd: targetDir });
console.log(`Found ${files.length} .json files to fix.`);

for (const file of files) {
  const csnModel = fs.readJSONSync(path.join(targetDir, file));
  const originalContent = JSON.stringify(csnModel);

  for (const definitionName in csnModel.definitions) {
    csnModel.definitions[definitionName] = fix(csnModel.definitions[definitionName], file);
    for (const elementName in csnModel.definitions[definitionName]) {
      csnModel.definitions[definitionName][elementName] = fix(csnModel.definitions[definitionName][elementName], file);
    }
  }

  const newContent = JSON.stringify(csnModel);
  if (originalContent !== newContent) {
    const outputFileName = targetDir + "/" + file.replace(".json", ".fixed.json");
    fs.outputFileSync(outputFileName, JSON.stringify(csnModel, null, 2));
    console.log(`Fixed CSN File: ${outputFileName}`);
  }
}

function fix(csn, fileName) {
  if (csn["@ObjectModel.supportedCapabilities"] && !Array.isArray(csn["@ObjectModel.supportedCapabilities"])) {
    csn["@ObjectModel.supportedCapabilities"] = [csn["@ObjectModel.supportedCapabilities"]];
    console.log(`Fixed ${fileName}: Converted @ObjectModel.supportedCapabilities to array.`);
  }
  // Add more fixes / conversions here.
  return csn;
}
