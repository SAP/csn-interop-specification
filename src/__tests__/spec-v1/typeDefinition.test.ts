import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import jsonSchemaLib from "json-schema-library";
import { getCsnDocumentTestData } from "./testUtils";

describe("Tests for all type definitions", (): void => {
  const effectiveCsnSchema = yaml.load(
    fs.readFileSync(`./spec/v1/CSN-Interop-Effective.schema.yaml`).toString(),
  ) as jsonSchemaLib.JsonSchema;

  const effectiveCsnSchemaValidator = jsonSchemaLib.compileSchema(effectiveCsnSchema);

  const typeDefinitions = [
    { name: "BooleanTypeDefinition", type: "cds.Boolean" },
    { name: "StringTypeDefinition", type: "cds.String" },
    { name: "LargeStringTypeDefinition", type: "cds.LargeString" },
    { name: "IntegerTypeDefinition", type: "cds.Integer" },
    { name: "Integer64TypeDefinition", type: "cds.Integer64" },
    { name: "DecimalTypeDefinition", type: "cds.Decimal" },
    { name: "DoubleTypeDefinition", type: "cds.Double" },
    { name: "DateTypeDefinition", type: "cds.Date" },
    { name: "TimeTypeDefinition", type: "cds.Time" },
    { name: "DateTimeTypeDefinition", type: "cds.DateTime" },
    { name: "TimestampTypeDefinition", type: "cds.Timestamp" },
    { name: "UUIDTypeDefinition", type: "cds.UUID" },
    { name: "AssociationTypeDefinition", type: "cds.Association" },
    { name: "CompositionTypeDefinition", type: "cds.Composition" },
  ];

  describe("Test TypeDefinition", (): void => {
    test("fails with missing 'kind' property for TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        // intentionally break the type here for the test
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "type": "cds.String",
          "length": 12,
        },
      });

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors[0].message).toContain("The required property `kind` is missing");
    });

    test("fails with missing 'type' property for TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        // intentionally break the type here for the test
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "type",
          "length": 12,
        },
      });

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors[0].message).toContain("The required property `type` is missing");
    });

    test("fails with invalid 'kind' property for a TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          // intentionally break the type here for the test
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "kind": "typeDoesNotExist",
          "type": "cds.String",
          "length": 12,
        },
      });

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors[0].message).toContain("Expected given value `typeDoesNotExist`");
      expect(validateResult.errors[0].message).toContain('be one of `["context","entity","service","type"]');
    });

    test("fails with invalid 'type' property for a TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "type",
          // intentionally break the type here for the test
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "type": "cds.TypeDoesNotExist",
          "length": 12,
        },
      });

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors[0].message).toContain("Expected given value `cds.TypeDoesNotExist`");
      expect(validateResult.errors[0].message).toContain(
        'to be one of `["cds.Boolean","cds.String","cds.LargeString","cds.Integer","cds.Integer64","cds.Decimal","cds.Double","cds.Date","cds.Time","cds.DateTime","cds.Timestamp","cds.UUID","cds.Association","cds.Composition"]',
      );
    });
  });

  describe.each(typeDefinitions)("Test $name", ({ type }): void => {
    test(`fails with missing 'kind' property for TypeDefinition of type ${type}`, (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "type": type,
        },
      });
      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors[0].message).toContain("The required property `kind` is missing");
    });

    test(`fails with not allowed additional property for TypeDefinition of type ${type}`, (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}", // property key does not start with @
          "_@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}", // property key does not start with __
          "thisIsNotAllowed": true, // property key does not start with __
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "__thisIsAllowed": true,
          "kind": "type",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "type": type,
          "key": true,
          "notNull": true,
          "enum": {},
          "default": {
            val: true,
          },
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      expect(errors).toContainValidationMessage("Property `EndUserText.heading` does not match any patterns", 1);
      expect(errors).toContainValidationMessage("Property `_@EndUserText.label` does not match any patterns", 1);
      expect(errors).toContainValidationMessage("Property `thisIsNotAllowed` does not match any patterns", 1);
    });
  });
});
