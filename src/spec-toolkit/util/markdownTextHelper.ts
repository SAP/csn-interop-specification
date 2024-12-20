import { SpecJsonSchema, SpecJsonSchemaRoot } from "../model/SpecJsonSchema";
import { log } from "./log";
import GfmEscape from "gfm-escape";
const escaper = new GfmEscape({ table: true });

export function escapeMdInTable(text: string = ""): string {
  return text.split("\n").join("<br/>");
}

/**
 * Escapes text input to work within markdown tables
 * @see https://www.npmjs.com/package/gfm-escape
 *
 * TODO: Simplify this, e.g. only take text. Use separate function to escape code.
 */
export function escapeTextInTable(text: string | string[] | unknown, jsonStringify = true, inlineCode = true): string {
  let result = text || "";

  // Convert this to a string. Either use JSON.stringify or string casting
  if (jsonStringify) {
    result = JSON.stringify(result);
  } else {
    result = `${text}`; // cast to text

    result = escaper.escape(result, { inTable: true });
  }

  if (inlineCode) {
    result = `\`${result}\``;
  }
  return result as string;
}

export function escapeRegexpInTable(text: string): string {
  const escapedRegexp = text.split("|").join(`\\|`).split("{").join(`\\{`).split("}").join(`\\}`);
  return `<code className="regex">${escapedRegexp}</code>`;
}

export function escapeHtmlChars(input: string): string {
  input = input.replace(/&/g, "&amp;");
  input = input.replace(/</g, "&lt;");
  input = input.replace(/>/g, "&gt;");
  return input;
}

export function getOutputFileName(title: string): string {
  return title.toLowerCase().split(" ").join("-");
}

/**
 * Generates a YAML Frontmatter header with common needed meta information
 */
export function getMarkdownFrontMatter(
  title: string,
  sideBarPosition: number,
  sideBarDescription: string,
  tocMaxHeadingLevel?: number,
): string {
  let text = "";
  text += "---\n";
  text += `title: "${title.split("-").join(" ")}"\n`;
  text += `sidebar_position: ${sideBarPosition}\n`;
  if (tocMaxHeadingLevel) {
    text += `toc_max_heading_level: ${tocMaxHeadingLevel}\n`;
  }
  text += `description: "${sideBarDescription}"\n`;
  text += "---\n\n";
  return text;
}

/**
 * Calculate Anchor Links removing special characters
 */
export function getAnchorLinkFromTitle(link: string | undefined): string {
  if (!link) {
    throw new Error(`Cannot create anchor link for undefined target`);
  }
  let cleanLink = `#${link.toLowerCase().split(" ").join("-")}`;
  cleanLink = cleanLink.replace(/@/g, "");
  cleanLink = cleanLink.replace(/\./g, "");
  cleanLink = cleanLink.replace(/\(/g, "");
  cleanLink = cleanLink.replace(/\)/g, "");
  cleanLink = cleanLink.replace(/\*/g, "");
  //cleanLink = cleanLink.replace(/-/g,'')
  return cleanLink;
}

/**
 * Takes a $ref link and returns a markdown link
 */
export function getMdLinkFromRef($ref: string, context: SpecJsonSchema, rootJsonSchema: SpecJsonSchemaRoot): string {
  const split = $ref.split("/");
  const entityName = split[2];
  const propertyName = split[3] || undefined;

  const referencedSchema = rootJsonSchema.definitions[entityName];

  if (!referencedSchema) {
    throw new Error(`Could not resolve $ref "${$ref}" for ${JSON.stringify(context, null, 2)}`);
  }

  if (!referencedSchema.title) {
    referencedSchema.title = propertyName || entityName;
    log.warn(`Referenced Schema is missing the title property. Falling back to property name from $ref: ${$ref}`);
    if (!referencedSchema.title) {
      throw new Error(`Referenced Schema is missing the title property: ${JSON.stringify(referencedSchema)}`);
    }
  }

  let link = `[${referencedSchema.title}](${getAnchorLinkFromTitle(referencedSchema.title)})`;

  if (propertyName) {
    if (!referencedSchema.properties || !referencedSchema.properties[propertyName]) {
      throw new Error(`Could not resolve $ref "${$ref}" for ${JSON.stringify(context, null, 2)}`);
    }
    link = `[${propertyName}](${getAnchorLinkFromTitle(referencedSchema.title)}_${propertyName.toLowerCase()}))`;
  }
  return link;
}

export function addVerticalSeparator(result: string): string {
  if (!result.includes("<hr/>")) {
    result += "<hr/>";
  } else {
    result += "<br/>";
  }
  return result;
}
