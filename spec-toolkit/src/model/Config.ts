import fs from "fs-extra";
import path from "path";
export interface ConfigFile {
  generalConfig: GeneralConfig;
  docsConfig: DocsConfig[];
}

// Configuration General Configuration Interface
export interface GeneralConfig {
  sortProperties: boolean;
}

// Configuration Document Interface
export interface DocsConfig {
  id: string;
  title: string;
  sourceFile: string;
  sourceFileIntroduction?: string;
  sourceFileOutro?: string;
  targetFile: string;
  targetFolder?: string;
  extensionTargetFile?: string;
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

//Retrieve Text from Introduction File
export function getIntroductionText(docConfig: DocsConfig): string {
  if (!docConfig.sourceFileIntroduction) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceFileIntroduction);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}
//Retrieve Text from Introduction File
export function getOutroText(docConfig: DocsConfig): string {
  if (!docConfig.sourceFileOutro) {
    return "";
  }

  const mdFilePath = path.resolve(docConfig.sourceFileOutro);

  if (!fs.existsSync(mdFilePath)) {
    throw new Error("Could not read markdown file: " + mdFilePath);
  }

  return fs.readFileSync(mdFilePath, "utf-8");
}

export function getTargetDocumentForDocumentId(documentID: string, docsConfigs: DocsConfig[]): string {
  for (let i = 0; i < docsConfigs.length; i++) {
    if (docsConfigs[i].id === documentID) {
      return docsConfigs[i].targetFile;
    }
  }
  return "";
}
