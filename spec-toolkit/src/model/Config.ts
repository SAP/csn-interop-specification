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
  title: string;
  sourceFilePath: string;
  sourceIntroductionFilePath?: string;
  sourceFileOutro?: string;
  examples?: {
    sourceJsonFolderPath: string;
  };
  sideBarPosition: number;
  sideBarDescription: string;

  /**
   * Overrides docusaurus max MD heading level that should be displayed in the table of contents (in the docusaurus right sidebar).
   * Docusaurus default value if not specified: 3
   */
  tocMaxHeadingLevel?: number;

  /** List of bullet points to add at the top as quick facts / links (in markdown) */
  facts?: string[];
}
export interface ExtensionSpecConfig {
  type: "specExtension";
  id: string;
  title: string;
  sourceFilePath: string;
  sourceIntroductionFilePath?: string;
  sourceFileOutro?: string;
  sideBarPosition: number;
  sideBarDescription: string;

  /**
   * Overrides docusaurus max MD heading level that should be displayed in the table of contents (in the docusaurus right sidebar).
   * Docusaurus default value if not specified: 3
   */
  tocMaxHeadingLevel?: number;

  /** List of bullet points to add at the top as quick facts / links (in markdown) */
  facts?: string[];
  targetDocumentId: string;
  targetLink: string;
}

//Retrieve Text from Introduction File
export function getIntroductionText(docConfig: SpecConfig): string {
  if (!docConfig.sourceIntroductionFilePath) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceIntroductionFilePath);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}
//Retrieve Text from Introduction File
export function getOutroText(docConfig: SpecConfig): string {
  if (!docConfig.sourceFileOutro) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceFileOutro);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}
