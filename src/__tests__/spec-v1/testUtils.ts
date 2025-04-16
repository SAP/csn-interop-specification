import { CsnInteropEffective } from "../../generated/spec-v1/types";

export function getElementTestDataByElementType(
  elementType: CsnInteropEffective.CdsTypeValue | CsnInteropEffective.CustomTypeValue,
): CsnInteropEffective.CdsType | CsnInteropEffective.CustomType {
  switch (elementType) {
    case "cds.Boolean":
      return getBooleanTypeTestData();
    case "cds.String":
      return getStringTypeTestData();
    case "cds.LargeString":
      return getLargeStringTypeTestData();
    case "cds.Integer":
      return getIntegerTypeTestData();
    case "cds.Integer64":
      return getInteger64TypeTestData();
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
  definitions?: CsnInteropEffective.Definitions,
): CsnInteropEffective.CSNInteropEffectiveDocument {
  return {
    csnInteropEffective: "1.0",
    $version: "2.0",
    definitions: definitions || {},
  };
}

/**
 * Returns a basic object of type BooleanType with only the relevant properties
 *  that discriminate an boolean from any other type
 **/
function getBooleanTypeTestData(): CsnInteropEffective.BooleanType {
  return {
    type: "cds.Boolean",
    default: { val: true },
    notNull: true,
    key: false,
  };
}

/**
 * Returns a basic object of type StringType with only the relevant properties
 *  that discriminate an string from any other type
 **/
function getStringTypeTestData(): CsnInteropEffective.StringType {
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

/**
 * Returns a basic object of type LargeStringType with only the relevant properties
 *  that discriminate an large string from any other type
 **/
function getLargeStringTypeTestData(): CsnInteropEffective.LargeStringType {
  return {
    type: "cds.LargeString",
    default: { val: "hello world large" },
    notNull: true,
    enum: {},
  };
}

/**
 * Returns a basic object of type IntegerType with only the relevant properties
 *  that discriminate an integer from any other type
 **/
function getIntegerTypeTestData(): CsnInteropEffective.IntegerType {
  return {
    type: "cds.Integer",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type Integer64Type with only the relevant properties
 *  that discriminate an integer64 from any other type
 **/
function getInteger64TypeTestData(): CsnInteropEffective.Integer64Type {
  return {
    type: "cds.Integer64",
    default: { val: 1337 },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type DecimalType with only the relevant properties
 *  that discriminate an decimal from any other type
 **/
function getDecimalTypeTestData(): CsnInteropEffective.DecimalType {
  return {
    type: "cds.Decimal",
    default: { val: 15.2 },
    notNull: true,
    enum: {},
  };
}

/**
 * Returns a basic object of type DoubleType with only the relevant properties
 *  that discriminate an double from any other type
 **/
function getDoubleTypeTestData(): CsnInteropEffective.DoubleType {
  return {
    type: "cds.Double",
    default: { val: 15.2 },
    notNull: true,
    enum: {},
  };
}

/**
 * Returns a basic object of type DateType with only the relevant properties
 *  that discriminate an date from any other type
 **/
function getDateTypeTestData(): CsnInteropEffective.DateType {
  return {
    type: "cds.Date",
    default: { val: "2021-06-27" },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type TimeType with only the relevant properties
 *  that discriminate a time from any other type
 **/
function getTimeTypeTestData(): CsnInteropEffective.TimeType {
  return {
    type: "cds.Time",
    default: { val: "07:59:59" },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type DateTimeType with only the relevant properties
 *  that discriminate a dateTime from any other type
 **/
function getDateTimeTypeTestData(): CsnInteropEffective.DateTimeType {
  return {
    type: "cds.DateTime",
    default: { val: "2021-06-27T14:52:23Z" },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type TimestampType with only the relevant properties
 *  that discriminate a timestamp from any other type
 **/
function getTimestampTypeTestData(): CsnInteropEffective.TimestampType {
  return {
    type: "cds.Timestamp",
    default: { val: "2021-06-27T14:52:23.123Z" },
    notNull: true,
    key: false,
    enum: {},
  };
}

/**
 * Returns a basic object of type UUIDType with only the relevant properties
 *  that discriminate a uuid from any other type
 **/
function getUuidTypeTestData(): CsnInteropEffective.UUIDType {
  return {
    type: "cds.UUID",
    default: { val: "3c2e503f-1e76-435f-abc8-df53467d3639" },
    notNull: true,
    key: false,
  };
}

/**
 * Returns a basic object of type AssociationType with only the relevant properties
 *  that discriminate an association from any other type
 **/
function getAssociationTypeTestData(): CsnInteropEffective.AssociationType {
  return {
    type: "cds.Association",
    target: "cds.MyTargetAssociationEntity",
    cardinality: { max: 1, min: 0 },
    on: [{ ref: ["SomeEntity", "someRef"] }, "=", { val: "someVal" }],
  };
}

/**
 * Returns a basic object of type CompositionType with only the relevant properties
 *  that discriminate a composition from any other type
 **/
function getCompositionTypeTestData(): CsnInteropEffective.CompositionType {
  return {
    type: "cds.Composition",
    target: "cds.MyTargetCompositionEntity",
    cardinality: { max: 1, min: 0 },
    on: [{ ref: ["SomeEntity", "someRef"] }, "=", { val: "someVal" }],
  };
}

/**
 * Returns a basic object of type CustomType with only the relevant properties
 *  that discriminate an derived type from any other type
 **/
function gerDerivedTypeTestData(): CsnInteropEffective.CustomType {
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
