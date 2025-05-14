import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import jsonSchemaLib from "json-schema-library";
import { getCsnDocumentTestData, getElementTestDataByElementType } from "./testUtils";

describe("Tests for all elements", (): void => {
  const effectiveCsnSchema = yaml.load(
    fs.readFileSync(`./spec/v1/CSN-Interop-Effective.schema.yaml`).toString(),
  ) as jsonSchemaLib.JsonSchema;

  const effectiveCsnSchemaValidator = jsonSchemaLib.compileSchema(effectiveCsnSchema);

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

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(1);
      expect(validateResult.errors).toContainValidationMessage(
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

      const validateResultForGoodData = effectiveCsnSchemaValidator.validate(goodData);
      expect(validateResultForGoodData.errors.length).toEqual(0);

      const validateResultForErrorData = effectiveCsnSchemaValidator.validate(errorData);
      expect(validateResultForErrorData.errors.length).toEqual(2); // TODO: why is the error duplicated? probably there is still improvement potential with the spec syntax?
      expect(validateResultForErrorData.errors[0].message).toContain("Expected given value `cds.MyType`");
      expect(validateResultForErrorData.errors[0].message).toContain(
        'to be one of `["cds.Boolean","cds.String","cds.LargeString","cds.Integer","cds.Integer64","cds.Decimal","cds.Double","cds.Date","cds.Time","cds.DateTime","cds.Timestamp","cds.UUID","cds.Association","cds.Composition"]`',
      );
      expect(validateResultForErrorData.errors[1].message).toContain("Expected given value `cds.MyType`");
      expect(validateResultForErrorData.errors[1].message).toContain(
        'to be one of `["cds.Boolean","cds.String","cds.LargeString","cds.Integer","cds.Integer64","cds.Decimal","cds.Double","cds.Date","cds.Time","cds.DateTime","cds.Timestamp","cds.UUID","cds.Association","cds.Composition"]`',
      );
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

      const validateResult = effectiveCsnSchemaValidator.validate(data);
      expect(validateResult.errors.length).toEqual(3);
      expect(validateResult.errors).toContainValidationMessage(
        "Property `EndUserText.heading` does not match any patterns",
      );
      expect(validateResult.errors).toContainValidationMessage(
        "Property `_@EndUserText.label` does not match any patterns",
      );
      expect(validateResult.errors).toContainValidationMessage(
        "Property `thisIsNotAllowed` does not match any patterns",
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
              "@EntityRelationship.propertyType": "",
              "@EntityRelationship.reference": [],
              "@ObjectModel.foreignKey.association": "",
              "@ObjectModel.semanticKey": [],
              "@ObjectModel.text.association": "",
              "@ObjectModel.text.element": [],
              "@ODM.oidReference.entityName": "",
              "@PersonalData.fieldSemantics": "UserID",
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
      expect(errors).toEqual([]);
    });
  });
});
