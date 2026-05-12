import assert from "node:assert/strict";
import { describe, test } from "node:test";
import * as fs from "fs-extra";
import { compileSchema, type JsonSchema } from "json-schema-library";
import {
  assertContainsValidationMessage,
  getCsnDocumentTestData,
} from "./testUtils";

describe("Tests for all type definitions", (): void => {
  const effectiveCsnSchema = fs.readJSONSync(
    "./src/generated/spec/v1/schemas/csn-interop-effective.schema.json",
  ) as JsonSchema;

  const effectiveCsnSchemaValidator = compileSchema(effectiveCsnSchema);

  const typeDefinitions: Array<{ name: string; type: string }> = [
    { name: "BooleanTypeDefinition", type: "cds.Boolean" },
    { name: "StringTypeDefinition", type: "cds.String" },
    { name: "LargeStringTypeDefinition", type: "cds.LargeString" },
    { name: "IntegerTypeDefinition", type: "cds.Integer" },
    { name: "Int16TypeDefinition", type: "cds.Int16" },
    { name: "Integer64TypeDefinition", type: "cds.Integer64" },
    { name: "UInt8TypeDefinition", type: "cds.UInt8" },
    { name: "DecimalTypeDefinition", type: "cds.Decimal" },
    { name: "DoubleTypeDefinition", type: "cds.Double" },
    { name: "DateTypeDefinition", type: "cds.Date" },
    { name: "TimeTypeDefinition", type: "cds.Time" },
    { name: "DateTimeTypeDefinition", type: "cds.DateTime" },
    { name: "TimestampTypeDefinition", type: "cds.Timestamp" },
    { name: "UUIDTypeDefinition", type: "cds.UUID" },
    { name: "AssociationTypeDefinition", type: "cds.Association" },
    { name: "CompositionTypeDefinition", type: "cds.Composition" },
  ] satisfies Array<{ name: string; type: string }>;

  describe("Test TypeDefinition", (): void => {
    test("fails with missing 'kind' property for TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        // @ts-expect-error intentional invalid data for test
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          type: "cds.String",
          length: 12,
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      assert.strictEqual(errors.errors.length, 1);
      assert.ok(
        errors.errors[0].message.includes(
          "The required property `kind` is missing",
        ),
      );
    });

    test("fails with missing 'type' property for TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        // @ts-expect-error intentional invalid data for test
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          kind: "type",
          length: 12,
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      assert.strictEqual(errors.errors.length, 1);
      assert.ok(
        errors.errors[0].message.includes(
          "The required property `type` is missing",
        ),
      );
    });

    test("fails with invalid 'kind' property for a TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          // @ts-expect-error intentional invalid data for test
          kind: "typeDoesNotExist",
          type: "cds.String",
          length: 12,
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      assert.strictEqual(errors.errors.length, 1);
      assert.ok(
        errors.errors[0].message.includes(
          "Expected given value `typeDoesNotExist`",
        ),
      );
      assert.ok(
        errors.errors[0].message.includes(
          "in `#/definitions/ABTEI/kind` to be one of",
        ),
      );
    });

    test("fails with invalid 'type' property for a TypeDefinition", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          kind: "type",
          // @ts-expect-error intentional invalid data for test
          type: "cds.TypeDoesNotExist",
          length: 12,
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      assert.strictEqual(errors.errors.length, 1);
      assert.ok(
        errors.errors[0].message.includes(
          "Expected given value `cds.TypeDoesNotExist`",
        ),
      );
      assert.ok(
        errors.errors[0].message.includes(
          "in `#/definitions/ABTEI/type` to be one of",
        ),
      );
    });
  });

  for (const { name, type } of typeDefinitions) {
    describe(`Test ${name}`, (): void => {
      test(`fails with missing 'kind' property for TypeDefinition of type ${type}`, (): void => {
        const data = getCsnDocumentTestData({
          ABTEI: {
            "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
            "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
            "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
            // @ts-expect-error intentional invalid data for test
            type: type,
          },
        });
        const errors = effectiveCsnSchemaValidator.validate(data);
        assert.strictEqual(errors.errors.length, 1);
        assert.ok(
          errors.errors[0].message.includes(
            "The required property `kind` is missing",
          ),
        );
      });

      test(`fails with not allowed additional property for TypeDefinition of type ${type}`, (): void => {
        const data = getCsnDocumentTestData({
          ABTEI: {
            "EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
            "_@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
            thisIsNotAllowed: true,
            "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
            __thisIsAllowed: true,
            kind: "type",
            // @ts-expect-error intentional invalid data for test
            type: type,
            key: true,
            notNull: true,
            enum: {},
            default: {
              val: true,
            },
          },
        });

        const errors = effectiveCsnSchemaValidator.validate(data);
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/EndUserText.heading` is not allowed",
        );
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/_@EndUserText.label` is not allowed",
        );
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/thisIsNotAllowed` is not allowed",
        );
      });
    });
  }
});
