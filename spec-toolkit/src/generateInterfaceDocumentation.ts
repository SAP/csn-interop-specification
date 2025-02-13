#!/usr/bin/env node

// The documentation how this script works and it's constraints
// can be found at the jsonSchemaToDocumentation() function definition

/**
 * Refactoring Ideas / TODOs:
 * * Use new `x-context` attribute to do better and consistent error / warning / info logging
 * * Share same code to generate descriptions for schemas inside AND outside of an object table
 * * Add **Type**: consistently for non-object Definition entries
 */

import {
  ConfigFile,
  SpecConfig,
  getIntroductionText,
  getOutroText,
  getTargetDocumentForDocumentId,
} from "./model/Config.js";
import { SpecJsonSchema, SpecJsonSchemaRoot } from "./model/SpecJsonSchema.js";
import {
  addVerticalSeparator,
  escapeHtmlChars,
  escapeMdInTable,
  escapeRegexpInTable,
  escapeTextInTable,
  getAnchorLinkFromTitle,
  getMarkdownFrontMatter,
  getMdLinkFromRef,
} from "./util/markdownTextHelper.js";
import {
  checkRequiredPropertiesExist,
  getContextText,
  getJsonSchemaValidator,
  validatePropertyName,
  validateSpecJsonSchema,
} from "./util/validation.js";
import {
  preprocessSpecJsonSchema,
  ensureRootLevelSchema,
  removeDescriptionsFromRefPointers,
  removeExtensionAttributes,
  convertRefToDocToStandardRef,
} from "./util/jsonSchemaConversion.js";

import _ from "lodash";
import fs from "fs-extra";
import { log } from "./util/log.js";
import path from "path";
import yaml from "js-yaml";
import {
  getHashIdForProperty,
  getIdForSchema as getSchemaObjectId,
  getTitleFromSchemaObject,
} from "./util/specJsonSchemaHelper.js";

////////////////////////////////////////////////////////////
// JSON SCHEMA TO MARKDOWN                                //
////////////////////////////////////////////////////////////

export interface DocumentationResult {
  /** The generated markdown documentation */
  markdown: string;
  /** The converted JSON Schema that does not make use of generator specific features anymore */
  jsonSchema: SpecJsonSchemaRoot;
}

//----------------------------------------------------------
// -- Functions for JSON Schema build
//----------------------------------------------------------

/**
 * This is a very rudimentary JSON Schema to text documentation generator
 * It returns both the generated markdown and a converted JSON Schema that
 * is adjusted and simplified for general purpose use
 *
 * This script only works under certain given assumptions of the JSON Schema structure!
 * * The JSON Schema does never nest objects into objects directly
 *   If this is necessary, create a new object in the #/definitions section and use $ref
 *   Structuring a JSON Schema like this may be a good idea for other reasons as well
 * * The JSON Schema does not contain: not conditions
 * * The JSON Schema only uses oneOf for expressing documented enums
 *   * In this case, every oneOf item MUST contain a `const`
 *   * This will be converted back to a regular enum
 * * The JSON Schema root schema object is a "Object"
 *
 */
export function jsonSchemaToDocumentation(configData: ConfigFile): void {
  // Iterate the files and generate the documentation
  for (const docConfig of configData.docsConfig) {
    // Read JSON File
    const jsonSchemaFile = fs.readFileSync(path.join(process.cwd(), docConfig.sourceFilePath)).toString();
    const jsonSchemaFileParsed = yaml.load(jsonSchemaFile) as SpecJsonSchemaRoot;

    /** The Spec JSON Schema based Specification */
    let jsonSchemaRoot = preprocessSpecJsonSchema(jsonSchemaFileParsed, docConfig.sourceFilePath);
    log.info(`${getContextText(jsonSchemaRoot)} loaded and prepared.`);

    // Read extension target file if given
    let extensionTarget: SpecJsonSchemaRoot | undefined;
    if (docConfig.type === "extension") {
      const file = fs.readFileSync(docConfig.targetDocument).toString();
      extensionTarget = yaml.load(file) as SpecJsonSchemaRoot;
    }

    // Validate JSON Schema to be a valid JSON Schema document
    validateSpecJsonSchema(jsonSchemaRoot, true);

    //Write Header Information and Introduction Text
    let text = getMarkdownFrontMatter(
      docConfig.title,
      docConfig.sideBarPosition,
      docConfig.sideBarDescription,
      docConfig.tocMaxHeadingLevel,
    );
    text += getIntroductionText(docConfig).trimEnd();

    text += "\n\n## Schema Definitions\n\n";

    if (docConfig.type === "extension") {
      text += `* This is an extension vocabulary for [${extensionTarget?.title}](${docConfig.targetLink}).\n`;
    } else if (jsonSchemaRoot.$ref) {
      const referencedSchema = getReferencedSchema(jsonSchemaRoot.$ref, jsonSchemaRoot, docConfig.title);
      if (referencedSchema.title) {
        const link = getAnchorLinkFromTitle(referencedSchema.title);
        text += `* The root schema of the document is [${referencedSchema.title}](${link})\n`;
      } else {
        throw new Error(
          `Every JSON Schema object need to have a title. Problem: ${JSON.stringify(referencedSchema, null, 2)}`,
        );
      }
    }

    if (jsonSchemaRoot.$id) {
      // TODO: Add those links depending on config
      // text += `* Example files can be found [here](/spec-v1/examples/${title.toLocaleLowerCase()}).\n`
      // text += `* Visual diagrams can be found here: [ORD ${title} Class Diagram](/spec-v1/diagrams/${title}.md).\n`
      text += `* The interface is available as JSON Schema: [${docConfig.targetJsonSchemaFilePath}](${jsonSchemaRoot.$id}).\n`;
      // text += `* A high-level overview can also be exported as [Excel](/spec-v1/interfaces/${docConfig.title}.xlsx) and [CSV](/spec-v1/interfaces/${docConfig.title}.csv) file.\n`
    }

    // Add custom facts / bullet points
    if (docConfig.facts) {
      for (const fact of docConfig.facts) {
        text += `* ${fact}\n`;
      }
    }

    // If extension: Create extension property overview table
    if (docConfig.type === "extension") {
      text += getExtensionOverviewTable(jsonSchemaRoot);
    }

    // Document definitions block
    if (jsonSchemaRoot.definitions) {
      const definitionEntries = Object.keys(jsonSchemaRoot.definitions);
      const propertyOrder = jsonSchemaRoot["x-property-order"] || [];

      const finalPropertyOrder = _.union(propertyOrder, definitionEntries);

      // Refactor: Loop within jsonSchemaToMd, then we don't have to pass definition name
      for (const definitionName of finalPropertyOrder) {
        const definition = jsonSchemaRoot.definitions[definitionName];
        text += jsonSchemaToMd(
          definition,
          jsonSchemaRoot,
          configData.docsConfig,
          docConfig,
          definitionName,
          extensionTarget,
        );
      }
    }

    if (jsonSchemaRoot.examples) {
      text += "\n## Complete Examples\n";
      text += getObjectExampleText(jsonSchemaRoot, jsonSchemaRoot, true);
    }

    text += getOutroText(docConfig).trimEnd();

    // Write Markdown Documentation
    fs.outputFileSync(docConfig.targetMarkdownFilePath, text);
    log.info(`Written: ${docConfig.targetMarkdownFilePath}`);

    if (!jsonSchemaRoot.type && docConfig.type === "main") {
      jsonSchemaRoot = ensureRootLevelSchema(jsonSchemaRoot);
    }

    writeSpecJsonSchemaFiles(docConfig.targetJsonSchemaFilePath, jsonSchemaRoot);

    log.info("--------------------------------------------------------------------------");
  }
}
/**
 * Converts a Spec JSON Schema to markdown documentation
 *
 * For JSON Objects, it will choose a table renderer
 */
function jsonSchemaToMd(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  docsConfigs: SpecConfig[],
  specConfig: SpecConfig,
  definitionName?: string,
  extensionTarget?: SpecJsonSchemaRoot,
): string {
  let text = "";

  jsonSchemaObject = _.cloneDeep(jsonSchemaObject);

  const title = getTitleFromSchemaObject(jsonSchemaObject);
  const schemaObjectId = getSchemaObjectId(jsonSchemaObject);
  const anchorName = definitionName || schemaObjectId;

  const headerLevelNumber = jsonSchemaObject["x-header-level"];
  if (headerLevelNumber) {
    const mdHeaderLevel = "#".repeat(headerLevelNumber);
    text += `\n${mdHeaderLevel} ${title}\n\n`;
  } else {
    text += `\n### ${title}\n\n`;
  }

  // is this an object currently in development?
  if (jsonSchemaObject["x-feature-status"]) {
    const status = jsonSchemaObject["x-feature-status"];
    text += `<span className="feature-status-${status}" title="This feature is ${status.toUpperCase()} status and subject to potential changes.">${status.toUpperCase()}</span> \n\n`;
  }

  // add introduction text of the object
  if (jsonSchemaObject.description) {
    text += `${jsonSchemaObject.description.trim()}\n\n`;
  }

  //Distinction if this is an object or a simple type
  if (
    !jsonSchemaObject.type &&
    !jsonSchemaObject.oneOf &&
    !jsonSchemaObject.anyOf &&
    !jsonSchemaObject["x-ref-to-doc"]
  ) {
    throw new Error(`Schema Object must have a "type" keyword! ${JSON.stringify(jsonSchemaObject, null, 2)}`);
  }

  //is this an object with a reference to core?
  // TODO: not sure if I understand this code. Consider refactoring here
  const refToDoc =
    typeof jsonSchemaObject === "object" && "x-ref-to-doc" in jsonSchemaObject ? jsonSchemaObject["x-ref-to-doc"] : "";
  if (jsonSchemaObject.type === "object" && !refToDoc) {
    text += getObjectDescriptionTable(
      jsonSchemaObject,
      jsonSchemaRoot,
      docsConfigs,
      anchorName,
      schemaObjectId,
      specConfig,
    );
  } else {
    text += generatePrimitiveTypeDescription(
      jsonSchemaObject,
      jsonSchemaRoot,
      docsConfigs,
      specConfig,
      extensionTarget,
    );
  }
  return text;
}

//----------------------------------------------------------------------------------------------
// ------------ Functions to Calculate certain Texts for MD ------------------------------------
//----------------------------------------------------------------------------------------------

function handleRefToCore(jsonSchemaObject: SpecJsonSchema, docsConfigs: SpecConfig[]): string {
  //Resolve RefToCores
  const refToDoc =
    typeof jsonSchemaObject === "object" && "x-ref-to-doc" in jsonSchemaObject ? jsonSchemaObject["x-ref-to-doc"] : "";
  if (refToDoc) {
    let refToDocTitle = "";
    let refToDocDocId = "";
    let refToDocDoc = "";
    if (typeof refToDoc === "object" && refToDoc !== undefined) {
      refToDocTitle = "title" in refToDoc ? refToDoc.title + "" : ""; // TODO: Simplify this
      refToDocDocId = "$refDoc" in refToDoc ? refToDoc.$refDoc + "" : ""; // TODO: Simplify this
      refToDocDoc = getTargetDocumentForDocumentId(refToDocDocId, docsConfigs) + "";
    }
    //TODO: Calculate RefToCore from Document Title?
    //TODO: remove calculation, use general function
    return `[${refToDocTitle}](${refToDocDoc}#${refToDocTitle.toLowerCase().replace(/ /g, "-").replace("#/definitions/", "")})`;
  } else return "";
}
//Calculates the Text for the "Type Column Entry"
function getTypeColumnText(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  docsConfigs: SpecConfig[],
  specConfig: SpecConfig,
): string {
  //in case of an Array: Array< Type of ArrayItems>
  if (jsonSchemaObject && jsonSchemaObject.type === "array") {
    return escapeHtmlChars(
      `Array<${getTypeColumnText(jsonSchemaObject.items as SpecJsonSchema, jsonSchemaRoot, docsConfigs, specConfig)}>`,
    );
  }
  // in case of a reference link to the reference object
  else if (jsonSchemaObject && jsonSchemaObject.$ref) {
    return getMdLinkFromRef(jsonSchemaObject.$ref, jsonSchemaObject, jsonSchemaRoot);
  }
  //in case it is an object through an error that $ ref should be used!
  else if (jsonSchemaObject && jsonSchemaObject.type === "object") {
    //Check if we have a reference to another file
    const text = handleRefToCore(jsonSchemaObject, docsConfigs);
    if (text) {
      return text;
    } else {
      throw new Error(
        `ERROR: Objects nested in objects are not supported. Please move the inline object to #/definitions and use $ref! Currently at ${JSON.stringify(
          jsonSchemaObject,
          null,
          2,
        )}`,
      );
    }
  }
  //in case it is a primitive type just return it
  else if (jsonSchemaObject["x-ref-to-doc"] && specConfig.type === "extension") {
    return `[${jsonSchemaObject["x-ref-to-doc"].title}](${specConfig.targetLink}${getAnchorLinkFromTitle(jsonSchemaObject["x-ref-to-doc"].title)})`;
  }
  // if its referencing to an interface in another document, create a cross-page link:
  else if (jsonSchemaObject && jsonSchemaObject.type) {
    return jsonSchemaObject.type as string;
  }
  //in case it is a anyOf: option 1 | option 2 | option 3 ...
  else if (jsonSchemaObject && jsonSchemaObject.anyOf) {
    const anyOfReferences: string[] = [];
    for (const anyOf of jsonSchemaObject.anyOf) {
      if (!anyOf.$ref) {
        throw new Error("anyOf needs to use $refs");
      }
      anyOfReferences.push(getMdLinkFromRef(anyOf.$ref, jsonSchemaObject, jsonSchemaRoot));
    }
    return anyOfReferences.join(" \\| ");
  }
  //in case it is a oneOf: option 1 | option 2 | option 3 ...
  //TODO: the syntax is exactly the same as anyOf - Is this correct?
  else if (jsonSchemaObject && jsonSchemaObject.oneOf) {
    return oneOfReferenceHandling(jsonSchemaObject, jsonSchemaRoot);
  } else if (jsonSchemaObject && jsonSchemaObject.allOf) {
    return allOfReferenceHandling(jsonSchemaObject, jsonSchemaRoot);
  } else {
    //Check if we have a reference to another file
    const text = handleRefToCore(jsonSchemaObject, docsConfigs);
    if (text) {
      return text;
    } else {
      //in no other case than we do not support the type
      throw new Error(`Could not determine type for ${JSON.stringify(jsonSchemaObject)}`);
    }
  }
}

function oneOfReferenceHandling(jsonSchemaObject: SpecJsonSchema, jsonSchemaRoot: SpecJsonSchemaRoot): string {
  const oneOfReferences: string[] = [];
  if (jsonSchemaObject.oneOf) {
    for (const oneOf of jsonSchemaObject.oneOf) {
      if (!oneOf.$ref) {
        throw new Error("oneOf needs to use $refs");
      }
      oneOfReferences.push(getMdLinkFromRef(oneOf.$ref, jsonSchemaObject, jsonSchemaRoot));
    }
    return oneOfReferences.join(" \\| ");
  }
  return "";
}

function allOfReferenceHandling(jsonSchemaObject: SpecJsonSchema, jsonSchemaRoot: SpecJsonSchemaRoot): string {
  const allOfReferences: string[] = [];
  if (jsonSchemaObject.allOf) {
    for (const allOf of jsonSchemaObject.allOf) {
      if (allOf.$ref) {
        allOfReferences.push(getMdLinkFromRef(allOf.$ref, jsonSchemaObject, jsonSchemaRoot));
      } else if (allOf.if && allOf.then && allOf.then.$ref) {
        allOfReferences.push(getMdLinkFromRef(allOf.then.$ref, jsonSchemaObject, jsonSchemaRoot));
      } else {
        throw new Error("allOf needs to use $refs or if/then with $ref");
      }
    }
    return allOfReferences.join(" \\| ");
  }
  return "";
}

//-- Calculates Text for the first column "Property" including Property Name, mandatory/optional/recommended as well as the anchor link
function getObjectPropertyEntryText(
  jsonSchemaObject: SpecJsonSchema,
  property: SpecJsonSchema,
  propertyName: string,
  propertyId: string,
  anchorName: string,
): string {
  //Get Property Required Entry
  const required = getRequired(jsonSchemaObject, propertyName);

  //First Entry in Property Text is Name
  let propertyText = `${propertyName}`;
  //Decide for the "mandatory, recommended,..." entry

  if (required === "mandatory") {
    propertyText += '<br/><span className="mandatory">MANDATORY</span>';
  } else if (required === "recommended") {
    propertyText += '<br/><span className="recommended">RECOMMENDED</span>';
  } else {
    propertyText += '<br/><span className="optional">OPTIONAL</span>';
  }

  //add comment if Property is still in "development"
  if (property["x-feature-status"]) {
    const status = property["x-feature-status"];
    propertyText += ` <span className="feature-status-${status}" title="This feature is ${status.toUpperCase()} status and subject to potential changes.">${status.toUpperCase()}</span>`;
  }

  // Add anchor tag link
  log.info(propertyId);
  const link = getAnchorLinkFromTitle(propertyId);
  propertyText += `<a className="hash-link" href="${link}" title="${anchorName}.${propertyName}"></a>`;
  return propertyText;
}

//-- Calculates the text for the entries of the properties
function getPropertiesTableEntryText(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  anchorName: string,
  schemaObjectId: string,
  docsConfigs: SpecConfig[],
  specConfig: SpecConfig,
): string {
  let text = "";
  // Iterate the Properties to fill the table
  if (jsonSchemaObject.properties) {
    //get properties
    const properties = Object.keys(jsonSchemaObject.properties);

    for (const propertyName of properties) {
      // get Property to hand over to functions
      const property = jsonSchemaObject.properties[propertyName];

      if (property["x-hide-property"]) {
        continue;
      }

      // check if checks shall be ignored
      if (!jsonSchemaObject["x-ignore-conventions"]) {
        // Validate Property Name e.g. for lowercase
        validatePropertyName(propertyName);
      }

      // Get Information of the Properties
      const type = getTypeColumnText(property, jsonSchemaRoot, docsConfigs, specConfig);
      let description = getDescriptionWithinTable(property, jsonSchemaRoot);

      if (!description) {
        if (property.$ref) {
          const referencedSchema = getReferencedSchema(
            property.$ref,
            jsonSchemaRoot,
            `${jsonSchemaObject.title} > ${propertyName}`,
          );
          if (referencedSchema && referencedSchema.description) {
            description = escapeMdInTable(referencedSchema.description);
            log.debug(`Inheriting description for ${jsonSchemaObject.title} > ${propertyName}`);
          } else {
            log.warn(`Missing description for ${jsonSchemaObject.title} > ${propertyName}`);
          }
        }
      }

      // TODO: Properly handle propertyId, without getting an anchor tag first and then removing it again.
      const propertyId = getHashIdForProperty(schemaObjectId, propertyName);

      //Get the text of the property
      const propertyText = getObjectPropertyEntryText(jsonSchemaObject, property, propertyName, propertyId, anchorName);

      //Build Text of the Table
      text += `|<div className="interface-property-name anchor" id="${propertyId}">${propertyText}</div>`;
      text += `|<div className="interface-property-type">${type}</div>`;
      text += `|<div className="interface-property-description">${description}</div>|\n`;
    }
  }
  return text;
}

//-- Calculates the text for the entries of the pattern properties
function getPatternPropertiesTableEntryText(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
): string {
  let text = "";
  //Iterate the pattern Properties and add them to the table (optional)
  if (jsonSchemaObject.patternProperties) {
    for (const pattern in jsonSchemaObject.patternProperties) {
      //get the Pattern
      const value = jsonSchemaObject.patternProperties[pattern];
      const valueItems = value.items as SpecJsonSchema;

      //calculate the value Type(s) of the Pattern
      let valueType = value.type?.toString() || "string";
      if (Array.isArray(value.type)) {
        valueType = value.type.join(" \\| ");
      }
      if (valueItems && valueItems.type) {
        valueType = `${valueType}<${valueItems.type}>`;
      }

      // Support direct (singular) $ref
      if (value.$ref) {
        valueType = getMdLinkFromRef(value.$ref, value, jsonSchemaRoot);
      }

      // Support oneOf (multiple) $refs
      if (value.oneOf) {
        const links: string[] = [];
        for (const oneOf of value.oneOf) {
          if (oneOf.$ref) {
            links.push(getMdLinkFromRef(oneOf.$ref, value, jsonSchemaRoot));
          } else {
            log.error(`Unsupported patternProperties oneOf without $ref`, value);
          }
        }
        valueType = links.join(" \\| ");
      }

      //// Support if/then/else
      // TODO: code is actually there and works but there is no use case yet in the schema
      // if (value.if && value.then && value.else) {
      //   const links: string[] = [];
      //   if (value.then.$ref) {
      //     links.push(getMdLinkFromRef(value.then.$ref, value, definitions));
      //   } else {
      //     log.error(`Unsupported patternProperties oneOf without $ref`, value);
      //   }
      //   if (value.else.$ref) {
      //     links.push(getMdLinkFromRef(value.else.$ref, value, definitions));
      //   } else {
      //     log.error(`Unsupported patternProperties if/else/then without $ref`, value);
      //   }
      //   valueType = links.join(" \\| ");
      // }

      text += `| Additional Properties<br/><i>${escapeRegexpInTable(pattern)}</i><br/><span className="optional">OPTIONAL</span>`;

      if (jsonSchemaObject["x-pattern-properties-description"]) {
        text += `<p>${jsonSchemaObject["x-pattern-properties-description"]}</p>`;
      }
      text += ` | ${valueType} | `;
      if (value.description) {
        text += `${escapeMdInTable(value.description.trim())}`;
        text += `<br/><br/><i>Additional properties MUST follow key name regexp pattern</i>: ${escapeRegexpInTable(pattern)}`;
      } else {
        text += `<i>Additional properties MUST follow key name regexp pattern</i>: ${escapeRegexpInTable(pattern)}`;
      }
      text += " |\n";
    }
  }
  return text;
}

/**
 * Adds example values to a JSON Object
 *
 * Will also validate that the examples match the schema
 */
function getObjectExampleText(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  skipHeader: boolean = false,
): string {
  let text = "";

  if (jsonSchemaObject.examples) {
    if (!skipHeader) {
      text += `\n###### Example Values:\n`;
    }

    try {
      //Validate Examples
      const validate = getJsonSchemaValidator({
        ...jsonSchemaObject,
        definitions: jsonSchemaRoot.definitions,
      });

      //Add all Examples to Text
      for (const example of jsonSchemaObject.examples as unknown[]) {
        text += "\n\n```js\n";
        text += JSON.stringify(example, null, 2);
        text += "\n```\n";

        // Validate example if it complies to the JSON Schema
        const valid = validate(example);

        if (!valid) {
          log.info("--------------------------------------------------------------------------");
          log.error(
            `Invalid example for ${
              jsonSchemaObject.title || jsonSchemaObject.description || JSON.stringify(jsonSchemaObject)
            }`,
          );
          log.info(validate.errors);
          log.info("--------------------------------------------------------------------------");
          process.exit(1);
        }
      }
    } catch (err) {
      log.error(err);
      throw err;
    }
    return text + "\n";
  }
  return "";
}

/**
 * Documents a JSON Object as a Table
 * Properties will be table rows.
 *
 * Documentation stops at associations and composition of other objects ($ref)
 * Array of primitive type is allowed, so are oneOf / anyOf with simple types or references.
 */
function getObjectDescriptionTable(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  docsConfigs: SpecConfig[],
  anchorName: string,
  schemaObjectId: string,
  specConfig: SpecConfig,
): string {
  let text = "";

  if (jsonSchemaObject.allOf) {
    // we write "One of the following" in the generated UI because we use allOf with discriminator "kind"
    // and don't want to confuse the end users with terms like "All of the following"
    // text += "**One of the following**: \n";
    text += "**Type**: \n";
    text += allOfReferenceHandling(jsonSchemaObject, jsonSchemaRoot);
    text += "<br/>\n";
  }

  if (!jsonSchemaObject["x-hide-properties"]) {
    if (jsonSchemaObject.properties || jsonSchemaObject.patternProperties) {
      // Add overview type
      // TODO: Consider making this an option. Maybe dependent on how many properties there are?
      if (jsonSchemaObject.properties) {
        // Filter our hidden properties
        const objectProperties = [];
        for (const propertyName in jsonSchemaObject.properties) {
          if (!jsonSchemaObject.properties[propertyName]["x-hide-property"]) {
            objectProperties.push(propertyName);
          }
        }
        const propertiesList = objectProperties.map((propertyName) => {
          const propertyId = getHashIdForProperty(schemaObjectId, propertyName);
          return `<a href="#${propertyId}">${propertyName}</a>`;
        });
        text += `**Type**: Object(${propertiesList.join(", ")})\n\n`;
      }

      //create object table header
      text += "| Property | Type | Description |\n";
      text += "| -------- | ---- | ----------- |\n";

      //Object does have to have properties for the following
      //Remark: Root Object (definitions) does not have properties
      //TODO: is it possible that an entry can also have only "Pattern Properties?"
      if (jsonSchemaObject.properties) {
        //Check if Required Properties exist
        checkRequiredPropertiesExist(jsonSchemaObject);

        //Add Properties
        text += getPropertiesTableEntryText(
          jsonSchemaObject,
          jsonSchemaRoot,
          anchorName,
          schemaObjectId,
          docsConfigs,
          specConfig,
        );
      }

      //Add Pattern Properties
      text += getPatternPropertiesTableEntryText(jsonSchemaObject, jsonSchemaRoot);

      //Add information about additional properties
      if (jsonSchemaObject.additionalProperties) {
        text += "| <i>*<i> | | <i>Additional, unspecified properties MAY be added to the object</i>. |\n";
      }
      text += "\n";
    } else {
      throw new Error(`Expected object to have either properties or patternProperties: ${jsonSchemaObject.title}`);
    }
  }

  if (jsonSchemaObject.oneOf) {
    text += "One of the following: \n";
    text += oneOfReferenceHandling(jsonSchemaObject, jsonSchemaRoot);
    text += "<br/>\n";
  }

  //Add Example
  text += getObjectExampleText(jsonSchemaObject, jsonSchemaRoot);

  return text;
}

function getExtensionOverviewTable(jsonSchema: SpecJsonSchemaRoot): string {
  let text = "\n### Annotations Overview\n\n";

  text += "| Annotation | Scope | Description |\n";
  text += "| -------- | ---- | ----------- |\n";

  for (const definitionName in jsonSchema.definitions) {
    const definition = jsonSchema.definitions[definitionName];
    // Only document the definition which have extension target(s)
    if (definition["x-extension-targets"]) {
      text += `| [${definitionName}](${getAnchorLinkFromTitle(definitionName)}) | ${definition["x-extension-targets"].join(", ")} | ${escapeMdInTable(definition.description)} |\n`;
    }
  }
  return text;
}

/**
 * Creates an entry for primitive types that are not inline described in a table (of Objects)
 *
 * TODO: Refactor this to share code with the type descriptions in the Table
 * TODO: Refactor to always just pass the full "root JSON Schema and take definitions from there"
 */
function generatePrimitiveTypeDescription(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  docsConfigs: SpecConfig[],
  specConfig: SpecConfig,
  extensionTarget?: SpecJsonSchemaRoot,
): string {
  let text = "";

  const type = getTypeColumnText(jsonSchemaObject, jsonSchemaRoot, docsConfigs, specConfig);

  if (jsonSchemaObject.type !== undefined) {
    text += `**Type:** ${type}<br/>\n`;
  }

  if (jsonSchemaObject.format !== undefined) {
    text += `**JSON Schema Format**: \`${jsonSchemaObject.format}\`<br/>\n`;
  }

  if (jsonSchemaObject["x-association-target"]) {
    const links = jsonSchemaObject["x-association-target"]
      .map((el) => {
        return getMdLinkFromRef(el, jsonSchemaObject, jsonSchemaRoot);
      })
      .join(" \\| ");
    text += `**Association Target**: ${links}<br/>\n`;
  }

  if (jsonSchemaObject.default !== undefined) {
    text += `**Default Value**: \`${jsonSchemaObject.default}\`<br/>\n`;
  }

  if (jsonSchemaObject.const !== undefined) {
    text += `**Constant Value**: \`${jsonSchemaObject.const}\`<br/>\n`;
  }

  if (jsonSchemaObject.pattern) {
    text += `**Regex Pattern**: ${escapeRegexpInTable(jsonSchemaObject.pattern)}<br/>\n`;
  }
  if (jsonSchemaObject.minLength !== undefined) {
    text += `**Minimum Length**: \`${jsonSchemaObject.minLength}\`<br/>\n`;
  }
  if (jsonSchemaObject.maxLength !== undefined) {
    text += `**Maximum Length**: \`${jsonSchemaObject.maxLength}\`<br/>\n`;
  }

  // Array constraints
  if (jsonSchemaObject.minItems !== undefined) {
    text += `**Array Constraint**: MUST have at least ${jsonSchemaObject.minItems} items<br/>\n`;
  }
  if (jsonSchemaObject.maxItems !== undefined) {
    text += `**Array Constraint**: MUST have at most ${jsonSchemaObject.maxItems} items<br/>\n`;
  }

  // Number constraints
  if (jsonSchemaObject.minimum !== undefined) {
    text += `**Number Constraint**: MUST have a minimum value of ${jsonSchemaObject.minimum}<br/>\n`;
  }
  if (jsonSchemaObject.maximum !== undefined) {
    text += `**Number Constraint**: MUST have a maximum value of ${jsonSchemaObject.maximum}<br/>\n`;
  }
  if (jsonSchemaObject.exclusiveMinimum !== undefined) {
    text += `**Number Constraint**: MUST have an exclusive minimum value of ${jsonSchemaObject.exclusiveMinimum}<br/>\n`;
  }
  if (jsonSchemaObject.exclusiveMaximum !== undefined) {
    text += `**Number Constraint**: MUST have an exclusive maximum value of ${jsonSchemaObject.exclusiveMaximum}<br/>\n`;
  }

  // jsonSchemaObject.definitions = definitions || jsonSchemaObject.definitions

  // List allowed enum values
  if (jsonSchemaObject.enum) {
    text += "**Allowed Values**: <ul>";
    for (const value of jsonSchemaObject.enum) {
      text += `<li>${escapeTextInTable(value, false)}</li>`;
    }
    text += "</ul><br/>\n";
  }
  // Support enums defined as oneOf const
  // See https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
  if (detectOneOfEnum(jsonSchemaObject)) {
    text += getOneOfEnumDescription(jsonSchemaObject) + "\n";
  }

  if (detectOneOfRef(jsonSchemaObject)) {
    text += getOneOfRefDescription(jsonSchemaObject, jsonSchemaRoot) + "\n";
  }

  // Support extensible enums defined as anyOf[] const
  // See https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
  if (detectAnyOfEnum(jsonSchemaObject)) {
    text += getAnyOfDescription(jsonSchemaObject) + "\n";
  }

  if (jsonSchemaObject["x-introduced-in-version"]) {
    text += `<strong className="introduced-version">Introduced in Version</strong>: ${jsonSchemaObject["x-introduced-in-version"]}<br/>\n`;
  }

  if (jsonSchemaObject["x-ref-to-doc"] && specConfig.type === "extension") {
    text += `**External Type**: [${jsonSchemaObject["x-ref-to-doc"].title}](${specConfig.targetLink}${getAnchorLinkFromTitle(jsonSchemaObject["x-ref-to-doc"].title)}) <br/>\n`;
  }

  // Document extensions towards other target documents
  if (jsonSchemaObject["x-extension-targets"]) {
    text += `**Scope:** ${jsonSchemaObject["x-extension-targets"].join(", ")}<br/>\n`;
    text += `**Extending:** `;

    for (const extensionPoint of jsonSchemaObject["x-extension-targets"]) {
      let found = 0;
      // Find extension point
      for (const definitionName in extensionTarget!.definitions) {
        const definition = extensionTarget!.definitions[definitionName];
        if (
          definition["x-extension-points"] &&
          definition["x-extension-points"].includes(extensionPoint) &&
          specConfig.type === "extension"
        ) {
          text += `[${definitionName}](${specConfig.targetLink}${getAnchorLinkFromTitle(definition.title)}), `;
          found++;
        }
      }
      if (!found) {
        throw new Error(`Could not find extension point "${extensionPoint}" in extension target file.`);
      }
    }
    text = text.substring(0, text.length - 2);
  }

  if (text.endsWith("<br/>\n")) {
    text = text.substring(0, text.length - 6) + "\n";
  }

  text += getObjectExampleText(jsonSchemaObject, jsonSchemaRoot);

  text += "\n";

  return text;
}

function getRequired(jsonSchemaObject: SpecJsonSchema, propertyName: string): "mandatory" | "recommended" | "optional" {
  if (jsonSchemaObject.required && jsonSchemaObject.required.includes(propertyName)) {
    return "mandatory";
  } else if (jsonSchemaObject["x-recommended"] && jsonSchemaObject["x-recommended"].includes(propertyName)) {
    return "recommended";
  } else {
    return "optional";
  }
}

function getDescriptionWithinTable(jsonSchemaObject: SpecJsonSchema, jsonSchemaRoot: SpecJsonSchemaRoot): string {
  let result = "";

  if (jsonSchemaObject.title) {
    result += `${escapeMdInTable(jsonSchemaObject.title)}<br/><br/>`;
  }

  if (jsonSchemaObject.description) {
    result += `${escapeMdInTable(jsonSchemaObject.description)}`;
  }

  if (jsonSchemaObject.format) {
    result = addVerticalSeparator(result);
    result += `**JSON Schema Format**: ${escapeTextInTable(jsonSchemaObject.format, false)}`;
  }

  if (jsonSchemaObject["x-association-target"]) {
    const links = jsonSchemaObject["x-association-target"]
      .map((el) => {
        return getMdLinkFromRef(el, jsonSchemaObject, jsonSchemaRoot);
      })
      .join(" \\| ");
    result = addVerticalSeparator(result);
    result += `**Association Target**: ${links}`;
  }

  if (jsonSchemaObject.default !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Default Value**: ${escapeTextInTable(jsonSchemaObject.default, false)}`;
  }

  if (jsonSchemaObject.const !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Constant Value**: ${escapeTextInTable(jsonSchemaObject.const, false)}`;
  }

  if (jsonSchemaObject.pattern) {
    result = addVerticalSeparator(result);
    result += `**Regex Pattern**: ${escapeRegexpInTable(jsonSchemaObject.pattern)}`;
  }
  if (jsonSchemaObject.minLength !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Minimum Length**: ${escapeTextInTable(jsonSchemaObject.minLength, false)}`;
  }
  if (jsonSchemaObject.maxLength !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Maximum Length**: ${escapeTextInTable(jsonSchemaObject.maxLength, false)}`;
  }

  // Array constraints
  if (jsonSchemaObject.minItems !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Array Constraint**: MUST have at least ${jsonSchemaObject.minItems} items`;
  }
  if (jsonSchemaObject.maxItems !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Array Constraint**: MUST have at most ${jsonSchemaObject.maxItems} items`;
  }

  // Number constraints
  if (jsonSchemaObject.minimum !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Number Constraint**: MUST have a minimum value of ${jsonSchemaObject.minimum}`;
  }
  if (jsonSchemaObject.maximum !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Number Constraint**: MUST have a maximum value of ${jsonSchemaObject.maximum}`;
  }
  if (jsonSchemaObject.exclusiveMinimum !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Number Constraint**: MUST have an exclusive minimum value of ${jsonSchemaObject.exclusiveMinimum}`;
  }
  if (jsonSchemaObject.exclusiveMaximum !== undefined) {
    result = addVerticalSeparator(result);
    result += `**Number Constraint**: MUST have an exclusive maximum value of ${jsonSchemaObject.exclusiveMaximum}`;
  }

  if (jsonSchemaObject.items) {
    const items = jsonSchemaObject.items;

    // TODO: This covers just some basic cases of what can be defined within items
    // TODO: Ideally, this would reuse the same logic as above, just nested for array items

    if (items["x-association-target"]) {
      const links = items["x-association-target"]
        .map((el: string) => {
          return getMdLinkFromRef(el, items, jsonSchemaRoot);
        })
        .join(" \\| ");
      result = addVerticalSeparator(result);
      result += `**Array Item Association Target**: ${links}`;
    }

    if (items.format) {
      result = addVerticalSeparator(result);
      result += `**Array Item Format**: ${escapeTextInTable(items.format, false)}`;
    }

    if (items.pattern) {
      result = addVerticalSeparator(result);
      result += `**Array Item Regex Pattern**: ${escapeRegexpInTable(items.pattern)}`;
    }

    if (detectOneOfEnum(jsonSchemaObject.items)) {
      result = addVerticalSeparator(result);
      result += getOneOfEnumDescription(jsonSchemaObject.items, "Array Item Allowed Values");
    }

    if (detectAnyOfEnum(jsonSchemaObject.items)) {
      result = addVerticalSeparator(result);
      result += getAnyOfDescription(jsonSchemaObject.items, "Array Item Recommended Values");
    }
  }

  // TODO: Check if we really don't need this
  // jsonSchemaObject.definitions = definitions || jsonSchemaObject.definitions

  // List allowed enum values
  if (jsonSchemaObject.enum) {
    result = addVerticalSeparator(result);
    result += "**Allowed Values**: <ul>";
    for (const value of jsonSchemaObject.enum) {
      result += `<li>${escapeTextInTable(value)}</li>`;
    }
    result += "</ul>";
  }

  // Support enums defined as oneOf const
  // See https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
  if (detectOneOfEnum(jsonSchemaObject)) {
    result = addVerticalSeparator(result);
    result += getOneOfEnumDescription(jsonSchemaObject);
  }

  if (detectOneOfRef(jsonSchemaObject)) {
    result = addVerticalSeparator(result);
    result += getOneOfRefDescription(jsonSchemaObject, jsonSchemaRoot);
  }

  if (jsonSchemaObject.allOf) {
    result = addVerticalSeparator(result);
    result += getAllOfRefDescription(jsonSchemaObject, jsonSchemaRoot);
  }

  // Support extensible enums defined as anyOf[] const
  // See https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
  if (detectAnyOfEnum(jsonSchemaObject)) {
    result = addVerticalSeparator(result);
    result += getAnyOfDescription(jsonSchemaObject);
  }

  if (jsonSchemaObject["x-introduced-in-version"]) {
    result = addVerticalSeparator(result);
    result += `<strong className="introduced-version">Introduced in Version</strong>: ${jsonSchemaObject["x-introduced-in-version"]}`;
  }

  // Add examples
  if (jsonSchemaObject.examples && Array.isArray(jsonSchemaObject.examples)) {
    result = addVerticalSeparator(result);
    result += '**Example Values**: <ul className="examples">';

    // Validate examples before adding them
    // TODO: Move this (or reuse) util/validation.ts
    let validate;
    try {
      validate = getJsonSchemaValidator({
        ...jsonSchemaObject,
        // Add definitions so that $ref works
        definitions: jsonSchemaRoot.definitions,
      });
    } catch (err: unknown) {
      log.error(`Could not compile JSON schema to AJV validator.`);
      if (err && err instanceof Error) {
        log.error(`Validation ${err.message || ""}`);
        log.error(err.stack);
      }
      throw err;
    }

    for (const example of jsonSchemaObject.examples) {
      result += `<li>${escapeTextInTable(example)}</li>`;

      // Validate example if it complies to the JSON Schema
      try {
        const valid = validate(example);
        if (!valid) {
          log.info("--------------------------------------------------------------------------");
          log.error(
            `Invalid example for "${
              jsonSchemaObject.title || jsonSchemaObject.description || JSON.stringify(jsonSchemaObject)
            }"`,
          );
          log.info(validate.errors);
          log.info("--------------------------------------------------------------------------");
          process.exit(1);
        }
      } catch (err) {
        log.error(err);
      }
    }
    result += "</ul>";
  }

  return result;
}

/**
 * Detects whether the oneOf is used to
 * * describe an enum (with additional descriptions)
 * * or is used in other, more generic ways
 *
 * @see https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
 */
export function detectOneOfEnum(jsonSchemaObject: SpecJsonSchema): boolean {
  if (!jsonSchemaObject.oneOf) {
    return false;
  }
  let oneOfWithConst = 0;

  // Count how often const was used in the oneOf items
  for (const oneOfItem of jsonSchemaObject.oneOf) {
    if (oneOfItem.const) {
      oneOfWithConst++;
    }
  }

  if (oneOfWithConst === jsonSchemaObject.oneOf.length) {
    return true;
  }
  return false;
}

/**
 * Detects whether the oneOf is used to
 * * describe an enum (with additional descriptions)
 * * or is used in other, more generic ways
 *
 * @see https://github.com/json-schema-org/json-schema-spec/issues/57#issuecomment-247861695
 */
export function detectOneOfRef(jsonSchemaObject: SpecJsonSchema): boolean {
  if (!jsonSchemaObject.oneOf) {
    return false;
  }
  let oneOfWithRef = 0;

  // Count how often const was used in the oneOf items
  for (const oneOfItem of jsonSchemaObject.oneOf) {
    if (oneOfItem.$ref) {
      oneOfWithRef++;
    }
  }

  if (oneOfWithRef === jsonSchemaObject.oneOf.length) {
    return true;
  }
  return false;
}

/**
 * Detects whether the oneOf is used to
 * * describe an extensible enum
 * * or is used in other, more generic ways
 *
 * @see https://github.com/zalando/restful-api-guidelines/issues/412
 */
export function detectAnyOfEnum(jsonSchemaObject: SpecJsonSchema): boolean {
  if (!jsonSchemaObject.anyOf) {
    return false;
  }
  let anyOfWithConst = 0;
  let anyOfWithStringType = 0;

  // Count how often const was used in the oneOf items
  for (const oneOfItem of jsonSchemaObject.anyOf) {
    if (oneOfItem.const) {
      anyOfWithConst++;
    } else if (oneOfItem.type === "string") {
      anyOfWithStringType++;
    }
  }

  if (anyOfWithConst === jsonSchemaObject.anyOf.length - 1 && anyOfWithStringType === 1) {
    // If all but one anyOf items have a const value and the other one is a generic type: string
    // we assume that we have an extensible enum
    // FIXME: This detection is not foolproof, but it'll work for the scope of what we have ATM
    return true;
  }
  return false;
}

export function getReferencedSchema(
  $ref: string,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  location: string,
): SpecJsonSchema {
  // In this case there is no direct object in the JSON Schema root
  // We'll look up the main level $ref to see which one is considered the Root
  const refName = $ref.replace("#/definitions/", "");
  if (!jsonSchemaRoot.definitions[refName]) {
    throw new Error(`Could not find $ref ${$ref} in the definitions of ${location}!`);
  }
  return jsonSchemaRoot.definitions[refName];
}

/**
 * Created description of a oneOf enum that has `const` values and optionally description attached to it
 */
export function getOneOfEnumDescription(jsonSchemaObject: SpecJsonSchema, title = "Allowed Values"): string {
  let result = "";

  const oneOfEnum = detectOneOfEnum(jsonSchemaObject);
  if (oneOfEnum) {
    result += `**${title}**: <ul>`;
    for (const oneOfItem of jsonSchemaObject.oneOf!) {
      if (oneOfItem.description && oneOfItem.description) {
        let suffix = "";
        if (oneOfItem["x-feature-status"]) {
          const status = oneOfItem["x-feature-status"] as string;
          suffix += `\n<strong className="introduced-version">Feature Status</strong>: <span className="feature-status-${status}" title="This feature is ${status.toUpperCase()} status and subject to potential changes.">${status.toUpperCase()}</span>`;
        }
        if (oneOfItem["x-introduced-in-version"]) {
          const version = oneOfItem["x-introduced-in-version"];
          suffix += `\n<strong className="introduced-version">Introduced in Version</strong>: ${version}`;
        }
        result += `<li><p>${escapeTextInTable(oneOfItem.const)}: ${escapeMdInTable(
          `${oneOfItem.description}${suffix}`,
        )}</p></li>`;
      } else {
        result += `<li><p>${escapeTextInTable(oneOfItem.const)}</p></li>`;
      }
    }
    result += "</ul>";
  } else {
    log.error("Currently the documentation generator only supports oneOf for const values (documented enums)");
    log.warn(`Ignoring ${JSON.stringify(jsonSchemaObject.title, null, 2)}`);
  }

  return result;
}

/**
 * Created description of a oneOf enum that has `const` values and optionally description attached to it
 */
export function getOneOfRefDescription(
  jsonSchemaObject: SpecJsonSchema,
  jsonSchemaRoot: SpecJsonSchemaRoot,
  title = "One of",
): string {
  let result = "";

  const oneOfRef = detectOneOfRef(jsonSchemaObject);
  if (oneOfRef) {
    result += `**${title}**: <ul>`;
    for (const oneOfItem of jsonSchemaObject.oneOf!) {
      let suffix = "";
      // TODO: Make this reused
      if (oneOfItem["x-feature-status"]) {
        const status = oneOfItem["x-feature-status"] as string;
        suffix += `\n<strong className="introduced-version">Feature Status</strong>: <span className="feature-status-${status}" title="This feature is ${status.toUpperCase()} status and subject to potential changes.">${status.toUpperCase()}</span>`;
      }
      // TODO: Make this reused
      if (oneOfItem["x-introduced-in-version"]) {
        const version = oneOfItem["x-introduced-in-version"];
        suffix += `\n<strong className="introduced-version">Introduced in Version</strong>: ${version}`;
      }
      if (oneOfItem.$ref) {
        result += `<li><p>${getMdLinkFromRef(oneOfItem.$ref, jsonSchemaObject, jsonSchemaRoot)}</p></li>`;
      } else {
        throw new Error(`Expected $ref on oneOf item ${JSON.stringify(jsonSchemaObject, null, 2)}`);
      }
      result += suffix;
    }
    result += "</ul>";
  } else {
    log.error("Currently the documentation generator only supports oneOf for const values (documented enums)");
    log.warn(`Ignoring ${JSON.stringify(jsonSchemaObject.title, null, 2)}`);
  }

  return result;
}

export function getAllOfRefDescription(jsonSchemaObject: SpecJsonSchema, jsonSchemaRoot: SpecJsonSchemaRoot): string {
  let result = "";
  if (jsonSchemaObject.allOf) {
    result += `**All of**: <ul>`;
    for (const allOfItem of jsonSchemaObject.allOf) {
      if (allOfItem.$ref) {
        result += `<li><p>${getMdLinkFromRef(allOfItem.$ref, jsonSchemaObject, jsonSchemaRoot)}</p></li>`;
      } else {
        throw new Error(`Expected $ref on allOf item ${JSON.stringify(jsonSchemaObject, null, 2)}`);
      }
    }
    result += "</ul>";
  }

  return result;
}

export function getAnyOfDescription(jsonSchemaObject: SpecJsonSchema, title = "Recommended Values"): string {
  let result = "";

  const anyOfEnum = detectAnyOfEnum(jsonSchemaObject);
  if (anyOfEnum) {
    result += `**${title}**: <ul>`;
    for (const anyOfItem of jsonSchemaObject.anyOf!) {
      if (anyOfItem.const) {
        if (anyOfItem.description) {
          result += `<li>${escapeTextInTable(anyOfItem.const)}: ${escapeMdInTable(anyOfItem.description)}</li>`;
        } else {
          result += `<li>${escapeTextInTable(anyOfItem.const)}</li>`;
        }
      }
    }
    result += "</ul>";
  } else {
    log.error(
      "Currently the documentation generator only supports anyOf for const values (documented extensible enums)",
    );
    log.warn(`Ignoring ${JSON.stringify(jsonSchemaObject, null, 2)}`);
  }

  return result;
}

////////////////////////////////////////////////////////////
// ------------------ Output Functions - ------------------
////////////////////////////////////////////////////////////

export function writeSpecJsonSchemaFiles(
  filePath: string,
  jsonSchema: SpecJsonSchemaRoot,
  isMainSchema?: boolean,
): void {
  const refConvertedJsonSchema = convertRefToDocToStandardRef(jsonSchema);

  // NOTE: only for "main" schemas we remove the x- annotations and write the cleaned-up version to file system
  // all other auto-generated "extensions" schemas will keep the x- annotations
  // as they cannot be understood by readers without them
  if (isMainSchema) {
    // Clean up the JSON Schema from everything spec specific
    // As this could cause confusion with other JSON Schema based libraries
    const jsonSchema1 = removeDescriptionsFromRefPointers(refConvertedJsonSchema);
    const jsonSchema2 = removeExtensionAttributes(jsonSchema1);

    // write it as schema file that does not include all the x- extensions
    fs.outputFileSync(filePath, JSON.stringify(jsonSchema2, null, 2));
  } else {
    // write it as schema file that includes all the x- extensions
    fs.outputFileSync(
      filePath,
      JSON.stringify(
        {
          description: "JSON Schema with custom (x-) annotations",
          ...refConvertedJsonSchema,
        },
        null,
        2,
      ),
    );
  }
}
