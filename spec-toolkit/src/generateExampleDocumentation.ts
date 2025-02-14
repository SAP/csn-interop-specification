import fg from "fast-glob";
import fs from "fs-extra";
import * as path from "path";
import { log } from "./util/log.js";
import { ConfigFile } from "./model/Config.js";

interface ExampleDocumentsDict {
  [fileName: string]: string;
}

export function generateExampleDocumentation(configData: ConfigFile): void {
  for (const docConfig of configData.docsConfig) {
    if (docConfig.type === "spec" && docConfig.examples) {
      const jsonExampleFilePaths = fg.sync(`${docConfig.examples.sourceJsonFolderPath}/*.json`, { ignore: ["_*"] });

      const mdExamplePages: ExampleDocumentsDict = {};

      // for each .json example generate a documentation .md site
      for (const filePath of jsonExampleFilePaths) {
        let text = "";
        const exampleFileContent = fs.readFileSync(filePath).toString();
        const fileName = path.parse(filePath).name + ".md";

        const title = path.parse(filePath).name;
        const description = `Example documents for ${docConfig.id}.`;

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

        log.info(`Found ${docConfig.id} example file: ${filePath}`);
        text += `## Example File\n\n`;
        text += "```js\n";
        text += exampleFileContent;
        text += "\n```\n";

        mdExamplePages[fileName] = text;
      }

      for (const fileName in mdExamplePages) {
        const fileContent = mdExamplePages[fileName];
        fs.outputFileSync(path.join(docConfig.examples.targetMarkdownFolderPath, fileName), fileContent);
        log.info("Written: " + path.join(docConfig.examples.targetMarkdownFolderPath, fileName));
      }
    }
  }
}
