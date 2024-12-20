import fs from "fs-extra";
import path from "path";

//////////////////////////////////////////
// NEW CONFIG (TODO, WIP)               //
//////////////////////////////////////////

export interface SpecToolkitConfig {
  specs?: SpecConfig[];
  specExtensions?: ExtensionConfig[];
  // specOutput?: {};
  examples?: ExampleConfig[];
}

// Configuration Document Interface
export interface SpecConfig {
  id: string;
  title: string;
  sourceFile: string;
  sourceFileIntroduction: string;
  targetFile: string;
  targetFolder?: string;
  extensionTargetFile?: string;
  sideBarPosition: number;
  sideBarDescription: string;
  /** List of bullet points to add at the top as quick facts / links (in markdown) */
  facts?: string[];
}

export interface ExtensionConfig {
  targetDocument: string;
  targetDocumentFileName: string;
  targetDocumentFolder: string;
  specExtensions: string[]; // array of file paths
}

export interface ExampleConfig {
  folder: string; // TODO: Point to folder? Or just give a glob pattern?
}

//////////////////////////////////////////
// ORIGINAL CONFIG                      //
//////////////////////////////////////////

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
  sourceFileIntroduction: string;
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

//Get Config for a given ID
export function getConfigForId(docsConfigs: DocsConfig[], id: string): DocsConfig | null {
  for (let i = 0; i < docsConfigs.length; i++) {
    if (docsConfigs[i].id === id) {
      return docsConfigs[i];
    }
  }
  return null;
}

//Retrieve Text from Introduction File
export function getIntroductionText(docConfig: DocsConfig): string {
  // Get the file path for markdown file
  const mdFilePath = docConfig.sourceFileIntroduction;
  const filePath = path.resolve(mdFilePath);

  // If file is not existing than return empty string
  if (!fs.existsSync(filePath)) {
    return "";
  }

  // Return content of the file
  return fs.readFileSync(filePath, "utf-8");
}

export function getTargetDocumentForDocumentId(documentID: string, docsConfigs: DocsConfig[]): string {
  for (let i = 0; i < docsConfigs.length; i++) {
    if (docsConfigs[i].id === documentID) {
      return docsConfigs[i].targetFile;
    }
  }
  return "";
}
