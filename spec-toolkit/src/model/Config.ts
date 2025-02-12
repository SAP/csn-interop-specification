import fs from "fs-extra";
import path from "path";
export interface ConfigFile {
  generalConfig: GeneralConfig;
  docsConfig: SpecConfig[];
}

// Configuration General Configuration Interface
export interface GeneralConfig {
  sortProperties: boolean;
}

export type SpecType = "main" | "extension";
export type SpecConfig = MainSpecConfig | ExtensionSpecConfig;
// Configuration Document Interface
export interface MainSpecConfig {
  type: "main";
  id: string;
  title: string;
  sourceFilePath: string;
  sourceIntroductionFilePath?: string;
  sourceFileOutro?: string;
  targetMarkdownFilePath: string;
  targetJsonSchemaFilePath: string;
  targetFolder?: string;
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
  type: "extension";
  id: string;
  title: string;
  sourceFilePath: string;
  sourceIntroductionFilePath?: string;
  sourceFileOutro?: string;
  targetMarkdownFilePath: string;
  targetJsonSchemaFilePath: string;
  targetFolder?: string;
  sideBarPosition: number;
  sideBarDescription: string;

  /**
   * Overrides docusaurus max MD heading level that should be displayed in the table of contents (in the docusaurus right sidebar).
   * Docusaurus default value if not specified: 3
   */
  tocMaxHeadingLevel?: number;

  /** List of bullet points to add at the top as quick facts / links (in markdown) */
  facts?: string[];
  targetDocument: string;
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

export function getTargetDocumentForDocumentId(documentID: string, docsConfigs: SpecConfig[]): string {
  for (let i = 0; i < docsConfigs.length; i++) {
    if (docsConfigs[i].id === documentID) {
      return docsConfigs[i].targetMarkdownFilePath;
    }
  }
  return "";
}
