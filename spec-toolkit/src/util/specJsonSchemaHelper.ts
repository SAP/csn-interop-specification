import { ConfigFile } from "../model/Config.js";
import { SpecJsonSchema, SpecJsonSchemaRoot } from "../model/SpecJsonSchema.js";
import { getAnchorLinkFromTitle } from "./markdownTextHelper.js";

export interface Context {
  document: SpecJsonSchemaRoot;
  config: ConfigFile;
  path: string[];
}

export function getTitleFromSchemaObject(jsonSchemaObject: SpecJsonSchema): string {
  if (!jsonSchemaObject.title) {
    throw new Error(`Schema Object must have a "title" keyword! ${JSON.stringify(jsonSchemaObject, null, 2)}`);
  }
  return jsonSchemaObject.title;
}

/** returns a sanitized ID for the schema object / thing */
export function getIdForSchema(jsonSchemaObject: SpecJsonSchema): string {
  if (!jsonSchemaObject.title) {
    throw new Error(`Schema Object must have a "title" keyword! ${JSON.stringify(jsonSchemaObject, null, 2)}`);
  }
  // TODO: Fix this. The title shouldn't have the anchor tag hashtag link
  return getAnchorLinkFromTitle(jsonSchemaObject.title.replace("#", ""));
}

export function getHashIdForProperty(schemaObjectId: string, propertyName: string): string {
  return `${schemaObjectId}_${propertyName}`.toLowerCase().replace("#", "");
}
