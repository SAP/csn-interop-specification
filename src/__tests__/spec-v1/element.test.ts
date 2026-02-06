import * as fs from "fs-extra";
import { compileSchema, JsonSchema } from "json-schema-library";
import { getCsnDocumentTestData, getElementTestDataByElementType } from "./testUtils";

describe("Tests for all elements", (): void => {
  const effectiveCsnSchema = fs.readJSONSync(
    "./src/generated/spec/v1/schemas/csn-interop-effective.schema.json",
  ) as JsonSchema;

  const effectiveCsnSchemaValidator = compileSchema(effectiveCsnSchema);

  const elementDefinitions = [
    { name: "BooleanType", type: "cds.Boolean" },
    { name: "StringType", type: "cds.String" },
    { name: "LargeStringType", type: "cds.LargeString" },
    { name: "IntegerType", type: "cds.Integer" },
    { name: "Integer64Type", type: "cds.Integer64" },
    { name: "DecimalType", type: "cds.Decimal" },
    { name: "DoubleType", type: "cds.Double" },
    { name: "DateType", type: "cds.Date" },
    { name: "TimeType", type: "cds.Time" },
    { name: "DateTimeType", type: "cds.DateTime" },
    { name: "TimestampType", type: "cds.Timestamp" },
    { name: "UUIDType", type: "cds.UUID" },
    { name: "AssociationType", type: "cds.Association" },
    { name: "CompositionType", type: "cds.Composition" },
  ];

  describe("Test Element", (): void => {
    test("fails with missing 'type' property for Element", (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "entity",
          "elements": {
            // intentionally break the type here for the test
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            MyElement: {},
          },
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      expect(errors.errors.length).toEqual(1);
      expect(errors.errors).toContainValidationMessage(
        "The required property `type` is missing at `#/definitions/ABTEI/elements/MyElement`",
      );
    });

    test("fails with invalid 'type' property for Element", (): void => {
      const errorData = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "entity",
          "elements": {
            MyElement: {
              type: "cds.MyType", // derived types are not allowed to start with "cds."
            },
          },
        },
      });
      const goodData = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "entity",
          "elements": {
            MyElement: {
              type: "MyType",
            },
          },
        },
      });

      const errorsForGoodData = effectiveCsnSchemaValidator.validate(goodData);
      expect(errorsForGoodData.errors.length).toEqual(0);

      const errorsForErrorData = effectiveCsnSchemaValidator.validate(errorData);
      expect(errorsForErrorData.errors.length).toEqual(1); // v10 fixed the duplication issue that existed in v9
      expect(errorsForErrorData.errors[0].message).toContain("Expected given value `cds.MyType`");
      expect(errorsForErrorData.errors[0].message).toContain("to be one of");
    });
  });

  describe.each(elementDefinitions)("Test $name", ({ type }): void => {
    test(`fails with not allowed additional property for element of type ${type}`, (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "entity",
          "elements": {
            MyElement: {
              ...getElementTestDataByElementType(type),
              // intentionally break the type here for the test
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              "EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}", // property key does not start with @
              "_@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}", // property key does not start with __
              "thisIsNotAllowed": true, //property key does not start with __
            },
          },
        },
      });

      const errors = effectiveCsnSchemaValidator.validate(data);
      expect(errors.errors.length).toEqual(3);
      expect(errors.errors).toContainValidationMessage(
        "Additional property `` in `#/definitions/ABTEI/elements/MyElement/EndUserText.heading` is not allowed",
      );
      expect(errors.errors).toContainValidationMessage(
        "Additional property `` in `#/definitions/ABTEI/elements/MyElement/_@EndUserText.label` is not allowed",
      );
      expect(errors.errors).toContainValidationMessage(
        "Additional property `` in `#/definitions/ABTEI/elements/MyElement/thisIsNotAllowed` is not allowed",
      );
    });

    test(`succeeds with allowed additional property for element of type ${type}`, (): void => {
      const data = getCsnDocumentTestData({
        ABTEI: {
          "@EndUserText.heading": "{i18n>ABTEI@ENDUSERTEXT.HEADING}",
          "@EndUserText.label": "{i18n>ABTEI@ENDUSERTEXT.LABEL}",
          "@EndUserText.quickInfo": "{i18n>ABTEI@ENDUSERTEXT.QUICKINFO}",
          "kind": "entity",
          "elements": {
            MyElement: {
              ...getElementTestDataByElementType(type),
              "__thisIsAllowed": true,
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
              "@PersonalData.fieldSemantics": { "#": "USER_ID" },
              "@PersonalData.isPotentiallyPersonal": true,
              "@PersonalData.isPotentiallySensitive": true,
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
      expect(errors.errors).toEqual([]);
    });
  });
});
