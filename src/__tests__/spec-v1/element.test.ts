import assert from "node:assert/strict";
import { describe, test } from "node:test";
import * as fs from "fs-extra";
import { compileSchema, type JsonSchema } from "json-schema-library";
import {
  assertContainsValidationMessage,
  getCsnDocumentTestData,
  getElementTestDataByElementType,
} from "./testUtils";

describe("Tests for all elements", (): void => {
  const effectiveCsnSchema = fs.readJSONSync(
    "./src/generated/spec/v1/schemas/csn-interop-effective.schema.json",
  ) as JsonSchema;

  const effectiveCsnSchemaValidator = compileSchema(effectiveCsnSchema);

  const elementDefinitions: Array<{ name: string; type: string }> = [
    { name: "BooleanType", type: "cds.Boolean" },
    { name: "StringType", type: "cds.String" },
    { name: "LargeStringType", type: "cds.LargeString" },
    { name: "IntegerType", type: "cds.Integer" },
    { name: "Int16Type", type: "cds.Int16" },
    { name: "Integer64Type", type: "cds.Integer64" },
    { name: "UInt8Type", type: "cds.UInt8" },
    { name: "DecimalType", type: "cds.Decimal" },
    { name: "DoubleType", type: "cds.Double" },
    { name: "DateType", type: "cds.Date" },
    { name: "TimeType", type: "cds.Time" },
    { name: "DateTimeType", type: "cds.DateTime" },
    { name: "TimestampType", type: "cds.Timestamp" },
    { name: "UUIDType", type: "cds.UUID" },
    { name: "AssociationType", type: "cds.Association" },
    { name: "CompositionType", type: "cds.Composition" },
  ] satisfies Array<{ name: string; type: string }>;

  describe("Test Element", (): void => {
    test("fails with missing 'type' property for Element", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          kind: "entity",
          elements: {
            // @ts-expect-error intentional invalid data for test
            MyElement: {},
          },
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      assert.strictEqual(errors.errors.length, 1);
      assertContainsValidationMessage(
        errors.errors,
        "The required property `type` is missing at `#/definitions/ABTEI/elements/MyElement`",
      );
    });

    test("fails with invalid 'type' property for Element", (): void => {
      const errorData = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          kind: "entity",
          elements: {
            MyElement: {
              type: "cds.MyType",
            },
          },
        },
      });
      const goodData = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          kind: "entity",
          elements: {
            MyElement: {
              type: "MyType",
            },
          },
        },
      });

      const errorsForGoodData = effectiveCsnSchemaValidator.validate(goodData);
      assert.strictEqual(errorsForGoodData.errors.length, 0);

      const errorsForErrorData =
        effectiveCsnSchemaValidator.validate(errorData);
      assert.strictEqual(errorsForErrorData.errors.length, 1);
      assert.ok(
        errorsForErrorData.errors[0].message.includes(
          "Expected given value `cds.MyType`",
        ),
      );
      assert.ok(errorsForErrorData.errors[0].message.includes("to be one of"));
    });
  });

  for (const { name, type } of elementDefinitions) {
    describe(`Test ${name}`, (): void => {
      test(`fails with not allowed additional property for element of type ${type}`, (): void => {
        const data = getCsnDocumentTestData({
          ABTEI: {
            "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
            "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
            "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
            kind: "entity",
            elements: {
              MyElement: {
                ...getElementTestDataByElementType(type),
                // @ts-expect-error intentional invalid data for test
                "EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
                "_@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
                thisIsNotAllowed: true,
              },
            },
          },
        });

        const errors = effectiveCsnSchemaValidator.validate(data);
        assert.strictEqual(errors.errors.length, 3);
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/elements/MyElement/EndUserText.heading` is not allowed",
        );
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/elements/MyElement/_@EndUserText.label` is not allowed",
        );
        assertContainsValidationMessage(
          errors.errors,
          "Additional property `` in `#/definitions/ABTEI/elements/MyElement/thisIsNotAllowed` is not allowed",
        );
      });

      test(`succeeds with allowed additional property for element of type ${type}`, (): void => {
        const data = getCsnDocumentTestData({
          ABTEI: {
            "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
            "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
            "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
            kind: "entity",
            elements: {
              MyElement: {
                ...getElementTestDataByElementType(type),
                __thisIsAllowed: true,
                "@Aggregation.default": { "#": "NONE" },
                "@AnalyticsDetails.measureType": { "#": "BASE" },
                "@Common.bar": "foo",
                "@Common.foo.bar": true,
                "@Common.array": [{ foo: true }],
                "@Consumption.valueHelpDefinition": [],
                "@EndUserText.heading": "",
                "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
                "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
                "@EntityRelationship.reference": [],
                "@ObjectModel.foreignKey.association": "",
                "@ObjectModel.semanticKey": [],
                "@ObjectModel.text.association": "",
                "@ObjectModel.text.element": [],
                "@PersonalData.entitySemantics": { "#": "DATA_SUBJECT" },
                "@PersonalData.fieldSemantics": { "#": "USER_ID" },
                "@PersonalData.isPotentiallyPersonal": true,
                "@PersonalData.isPotentiallySensitive": true,
                "@PersonalData.relatedDataCategoryID": [
                  "foo.bar:dataCategory:example1",
                  "foo.bar:dataCategory:example1",
                ],
                "@Semantics.amount.currencyCode": "",
                "@Semantics.businessDate.from": true,
                "@Semantics.businessDate.to": true,
                "@Semantics.calendar.dayOfMonth": true,
                "@Semantics.calendar.dayOfYear": true,
                "@Semantics.calendar.halfyear": true,
                "@Semantics.calendar.month": true,
                "@Semantics.calendar.quarter": true,
                "@Semantics.calendar.week": true,
                "@Semantics.calendar.year": true,
                "@Semantics.calendar.yearHalfyear": true,
                "@Semantics.calendar.yearMonth": true,
                "@Semantics.calendar.yearQuarter": true,
                "@Semantics.calendar.yearWeek": true,
                "@Semantics.currencyCode": true,
                "@Semantics.fiscal.dayOfYear": true,
                "@Semantics.fiscal.period": true,
                "@Semantics.fiscal.quarter": true,
                "@Semantics.fiscal.week": true,
                "@Semantics.fiscal.year": true,
                "@Semantics.fiscal.yearPeriod": true,
                "@Semantics.fiscal.yearQuarter": true,
                "@Semantics.fiscal.yearVariant": true,
                "@Semantics.fiscal.yearWeek": true,
                "@Semantics.language": true,
                "@Semantics.quantity.unitOfMeasure": "",
                "@Semantics.text": true,
                "@Semantics.time": true,
                "@Semantics.unitOfMeasure": true,
                "@Semantics.uuid": true,
              },
            },
          },
        });

        const errors = effectiveCsnSchemaValidator.validate(data);
        assert.deepStrictEqual(errors.errors, []);
      });
    });
  }
});
