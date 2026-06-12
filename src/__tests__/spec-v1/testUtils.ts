import assert from "node:assert/strict";
import type { JsonError } from "json-schema-library";
import type {
  AssociationType,
  BooleanType,
  CdsType,
  CdsTypeValue,
  CompositionType,
  CSNInteropEffectiveDocument,
  CustomType,
  CustomTypeValue,
  DateTimeType,
  DateType,
  DecimalType,
  Definitions,
  DoubleType,
  Int16Type,
  Integer64Type,
  IntegerType,
  LargeStringType,
  StringType,
  TimestampType,
  TimeType,
  UInt8Type,
  UUIDType,
} from "../../generated/spec/v1/types";

export function assertContainsValidationMessage(
  validationResults: JsonError[],
  message: string,
  count = 1,
): void {
  let found = 0;
  for (const result of validationResults) {
    if (result.message.includes(message)) {
      found++;
    }
  }
  assert.strictEqual(
    found,
    count,
    `Expected ${count} validation message(s) containing "${message}", got ${found}`,
  );
}

export function getElementTestDataByElementType(
  elementType: CdsTypeValue | CustomTypeValue,
): CdsType | CustomType {
  switch (elementType) {
    case "cds.Boolean":
      return getBooleanTypeTestData();
    case "cds.String":
      return getStringTypeTestData();
    case "cds.LargeString":
      return getLargeStringTypeTestData();
    case "cds.Integer":
      return getIntegerTypeTestData();
    case "cds.Int16":
      return getInt16TypeTestData();
    case "cds.Integer64":
      return getInteger64TypeTestData();
    case "cds.UInt8":
      return getUInt8TypeTestData();
    case "cds.Decimal":
      return getDecimalTypeTestData();
    case "cds.Double":
      return getDoubleTypeTestData();
    case "cds.Date":
      return getDateTypeTestData();
    case "cds.Time":
      return getTimeTypeTestData();
    case "cds.DateTime":
      return getDateTimeTypeTestData();
    case "cds.Timestamp":
      return getTimestampTypeTestData();
    case "cds.UUID":
      return getUuidTypeTestData();
    case "cds.Association":
      return getAssociationTypeTestData();
    case "cds.Composition":
      return getCompositionTypeTestData();
    default:
      return gerDerivedTypeTestData();
  }
}

export function getCsnDocumentTestData(
  definitions?: Definitions,
): CSNInteropEffectiveDocument {
  return {
    csnInteropEffective: "1.2",
    $version: "2.0",
    definitions: definitions || {},
  };
}

function getBooleanTypeTestData(): BooleanType {
  return {
    type: "cds.Boolean",
    default: { val: true },
    notNull: true,
    key: false,
  };
}

function getStringTypeTestData(): StringType {
  return {
    type: "cds.String",
    default: { val: "hello world" },
    notNull: true,
    key: true,
    enum: {
      submitted: {
        val: 1,
      },
      fulfilled: {
        val: 2,
      },
    },
  };
}

function getLargeStringTypeTestData(): LargeStringType {
  return {
    type: "cds.LargeString",
    default: { val: "hello world large" },
    notNull: true,
    enum: {},
  };
}

function getIntegerTypeTestData(): IntegerType {
  return {
    type: "cds.Integer",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getInt16TypeTestData(): Int16Type {
  return {
    type: "cds.Int16",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getInteger64TypeTestData(): Integer64Type {
  return {
    type: "cds.Integer64",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getUInt8TypeTestData(): UInt8Type {
  return {
    type: "cds.UInt8",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getDecimalTypeTestData(): DecimalType {
  return {
    type: "cds.Decimal",
    default: { val: 15.2 },
    notNull: true,
    enum: {},
  };
}

function getDoubleTypeTestData(): DoubleType {
  return {
    type: "cds.Double",
    default: { val: 15.2 },
    notNull: true,
    enum: {},
  };
}

function getDateTypeTestData(): DateType {
  return {
    type: "cds.Date",
    default: { val: "2021-06-27" },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getTimeTypeTestData(): TimeType {
  return {
    type: "cds.Time",
    default: { val: "07:59:59" },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getDateTimeTypeTestData(): DateTimeType {
  return {
    type: "cds.DateTime",
    default: { val: "2021-06-27T14:52:23Z" },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getTimestampTypeTestData(): TimestampType {
  return {
    type: "cds.Timestamp",
    default: { val: "2021-06-27T14:52:23.123Z" },
    notNull: true,
    key: false,
    enum: {},
  };
}

function getUuidTypeTestData(): UUIDType {
  return {
    type: "cds.UUID",
    default: { val: "3c2e503f-1e76-435f-abc8-df53467d3639" },
    notNull: true,
    key: false,
  };
}

function getAssociationTypeTestData(): AssociationType {
  return {
    type: "cds.Association",
    target: "cds.MyTargetAssociationEntity",
    cardinality: { max: 1, min: 0 },
    on: [{ ref: ["SomeEntity", "someRef"] }, "=", { val: "someVal" }],
  };
}

function getCompositionTypeTestData(): CompositionType {
  return {
    type: "cds.Composition",
    target: "cds.MyTargetCompositionEntity",
    cardinality: { max: 1, min: 0 },
    on: [{ ref: ["SomeEntity", "someRef"] }, "=", { val: "someVal" }],
  };
}

function gerDerivedTypeTestData(): CustomType {
  return {
    type: "cds.MyCustomType",
    default: { val: "myDefaultValueHere" },
    notNull: true,
    key: false,
    enum: {},
    precision: 12,
    scale: 3,
  };
}
