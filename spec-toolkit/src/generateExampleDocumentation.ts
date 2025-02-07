import fg from "fast-glob";
import fs from "fs-extra";
import * as path from "path";
import { log } from "./util/log.js";

interface ExampleDocumentsDict {
  [fileName: string]: string;
}

export function generateExampleDocumentation(examplesFolder: string, specTitle: string, outputFolder: string): void {
  // .jsonc files are ignored. We can use them to create quick mock examples including comments that are not fully validated
  const csnInteropEffectiveFilePaths = fg.sync(`${examplesFolder}/*.json`, { ignore: ["_*"] });

  const documentExamplePages = generateExampleDocumentationPage(csnInteropEffectiveFilePaths, specTitle);
  for (const fileName in documentExamplePages) {
    const fileContent = documentExamplePages[fileName];
    fs.outputFileSync(path.join(outputFolder, fileName), fileContent);
    log.info("Written: " + path.join(outputFolder, fileName));
  }
}

function generateExampleDocumentationPage(filePaths: string[], documentType: string): ExampleDocumentsDict {
  const examplePages: ExampleDocumentsDict = {};
  for (const filePath of filePaths) {
    let text = "";
    const exampleFileContent = fs.readFileSync(filePath).toString();
    const exampleParsed = JSON.parse(exampleFileContent);
    const fileName = path.parse(filePath).name + ".md";

    // const title = exampleParsed.meta?.document?.title || path;
    const title = path.parse(filePath).name;
    const description = exampleParsed.meta?.document?.doc || `Example documents for ${documentType}.`;

    let prefix = "";
    try {
      prefix = fs.readFileSync(filePath.replace(".json", ".md")).toString() + "\n\n";
    } catch (_) {
      // Ignore
    }

    if (prefix) {
      text += prefix;
    } else {
      text += `---\n`;
      text += `title: ${title}\n`;
      // text += `sidebar_position: 2\n`;
      text += `description: ${description}\n`;
      text += `---\n\n`;
      text += `# Example: ${title} \n\n`;
    }

    log.info(`Found ${documentType} example file: ${filePath}`);
    text += `## Example File\n\n`;
    text += `> Source Code: [${filePath}](${filePath.replace(
      "./",
      "https://github.com/SAP/csn-interop-specification/blob/main/",
    )})\n\n`;
    text += "```js\n";
    text += exampleFileContent;
    text += "\n```\n";

    examplePages[fileName] = text;
  }

  return examplePages;
}
