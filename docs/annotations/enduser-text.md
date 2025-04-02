---
title: "@EndUserText"
sidebar_position: "5"
description: "@EndUserText annotations for end user UIs."
---

> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

To allow an intuitive consumption of the data model in (End User) UIs, further metadata needs to be defined which helps the end user to understand the semantics of the underlying data model artifacts. Depending on the concrete context different types of UI texts are required. The UI text is displayed on the screen in the logon language of the user (if the text was translated into this language).

### Reference i18n keys

In the `@EndUserText` annotations it is also possible to reference [i18n](../spec-v1/csn-interop-effective#i18n) entries that are embedded into the CSN document.
In this case, the string has to include `{i18n>` as a prefix, then the key and end with `}`

Example: `{i18n>AD01PROFNR@ENDUSERTEXT.HEADING}`

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [enduser-text.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/enduser-text.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@EndUserText.label](#endusertextlabel) | Entity, Type, Service, Context, EnumDictionaryEntry | The property contains a human-readable text to be displayed on UIs (besides or instead of the technical name).<br/><br/>Corresponds to CAP CDS `@title` annotation. |
| [@EndUserText.heading](#endusertextheading) | Type | Defines a human-readable text that is displayed as column headers. |
| [@EndUserText.quickInfo](#endusertextquickinfo) | Entity, Type, Service, Context, EnumDictionaryEntry | Defines a human-readable text that provides additional information compared to the label text.<br/>The quickInfo is used for accessibility hints or the "Mouse over" function.<br/><br/>Corresponds to CAP CDS `@description` annotation. |

### @EndUserText.label

The property contains a human-readable text to be displayed on UIs (besides or instead of the technical name).

Corresponds to CAP CDS `@title` annotation.

**Type:** string<br/>
**Scope:** Entity, Type, Service, Context, EnumDictionaryEntry<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition), [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition), [ServiceDefinition](../spec-v1/csn-interop-effective#service-definition), [ContextDefinition](../spec-v1/csn-interop-effective#context-definition), [EnumDictionaryEntry](../spec-v1/csn-interop-effective#enum-dictionary-entry)
###### Example Values:


```js
"Sales Order Header"
```


```js
"{i18n>AD01PROFNR@ENDUSERTEXT.LABEL}"
```



### @EndUserText.heading

Defines a human-readable text that is displayed as column headers.

**Type:** string<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)

### @EndUserText.quickInfo

Defines a human-readable text that provides additional information compared to the label text.
The quickInfo is used for accessibility hints or the "Mouse over" function.

Corresponds to CAP CDS `@description` annotation.

**Type:** string<br/>
**Scope:** Entity, Type, Service, Context, EnumDictionaryEntry<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition), [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition), [ServiceDefinition](../spec-v1/csn-interop-effective#service-definition), [ContextDefinition](../spec-v1/csn-interop-effective#context-definition), [EnumDictionaryEntry](../spec-v1/csn-interop-effective#enum-dictionary-entry)
###### Example Values:


```js
"Sales Order Header that contains data relevant for all items"
```



## Complete Examples


```js
{
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": {
    "SalesOrderHeader": {
      "kind": "type",
      "type": "cds.String",
      "@EndUserText.label": "Sales Order Header",
      "@EndUserText.quickInfo": "Sales Order Header that contains data relevant for all items"
    }
  }
}
```


```js
{
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": {
    "AD01PROFNR": {
      "kind": "type",
      "type": "cds.String",
      "length": 8,
      "@EndUserText.heading": "{i18n>AD01PROFNR@ENDUSERTEXT.HEADING}",
      "@EndUserText.label": "{i18n>AD01PROFNR@ENDUSERTEXT.LABEL}",
      "@EndUserText.quickInfo": "{i18n>AD01PROFNR@ENDUSERTEXT.QUICKINFO}"
    }
  }
}
```

