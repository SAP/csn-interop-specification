import fs from "fs-extra";
import path from "path";
export interface ConfigFile {
  generalConfig: GeneralConfig;
  outputPath: string;
  docsConfig: SpecConfig[];
}

// Configuration General Configuration Interface
export interface GeneralConfig {
  sortProperties: boolean;
}

export type SpecType = "spec" | "specExtension";
export type SpecConfig = MainSpecConfig | ExtensionSpecConfig;
// Configuration Document Interface
export interface MainSpecConfig {
  type: "spec";
  id: string;
  sourceFilePath: string;
  sourceIntroFilePath?: string;
  sourceOutroFilePath?: string;
  examplesFolderPath?: string;
  /**
   * Custom markdown frontmatter "key": "value" pairs that should be added to the generated markdown file.
   * By this spec-toolkit offers support for different markdown browser rendering tools.
   */
  mdFrontmatter?: {
    [key: string]: string;
  };
}
export interface ExtensionSpecConfig {
  type: "specExtension";
  id: string;
  sourceFilePath: string;
  sourceIntroFilePath?: string;
  sourceOutroFilePath?: string;
  targetDocumentId: string;

  /**
   * Custom markdown frontmatter "key": "value" pairs that should be added to the generated markdown file.
   * By this spec-toolkit offers support for different markdown browser rendering tools.
   */
  mdFrontmatter?: {
    [key: string]: string;
  };
}

//Retrieve Text from Introduction File
export function getIntroductionText(docConfig: SpecConfig): string {
  if (!docConfig.sourceIntroFilePath) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceIntroFilePath);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}
//Retrieve Text from Introduction File
export function getOutroText(docConfig: SpecConfig): string {
  if (!docConfig.sourceOutroFilePath) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceOutroFilePath);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}
