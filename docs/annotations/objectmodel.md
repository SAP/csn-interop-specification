---
title: "@ObjectModel"
sidebar_position: 7
description: "@ObjectModel annotations."
---

> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

The object model captures definitions of structural as well as transactional related aspects of the business data model.

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective](../spec-v1/csn-interop-effective).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@ObjectModel.compositionRoot](#objectmodelcompositionroot) | Entity | Entity is the root of a compositional hierarchy. |
| [@ObjectModel.representativeKey](#objectmodelrepresentativekey) | Entity, Service | In case of multiple key elements: key element which represents the entity (in the sense that the entity itself is the list of values for this key element) |
| [@ObjectModel.semanticKey](#objectmodelsemantickey) | Type | The property contains element(s) which shall be used to display the key in UIs (instead of the technical key). |
| [@ObjectModel.modelingPattern](#objectmodelmodelingpattern) | Entity, Service | The property declares the modeling pattern applied in this entity definition. |
| [@ObjectModel.supportedCapabilities](#objectmodelsupportedcapabilities) | Entity, Service | The property declares the supported usage type for this entity in the context of consuming data models. |
| [@ObjectModel.foreignKey.association](#objectmodelforeignkeyassociation) | Type | The element is of type `cds.Association` which points to the list of values.<br/><br/>Use only for service internal associations. For cross service associations, use the [@EntityRelationship Vocabulary](./entity-relationship) instead. |
| [@ObjectModel.text.element](#objectmodeltextelement) | Type | The property contains element(s) containing a text for the annotated (id)element |
| [@ObjectModel.text.association](#objectmodeltextassociation) | Type | The element is of type cds.association, which points to an entity containing (language-dependent) texts for the annotated (id) element |
| [@ObjectModel.usageType.sizeCategory](#objectmodelusagetypesizecategory) | Entity | The size category enables the consumer to judge the possible result data set size. <br/>It is a pure estimation at design time while modeling the entity what the data set size would be at runtime.<br/>It reflects the set of data which has to be searched through to compute for example a count(*) of the data. <br/><br/>The labels correspond to the following size categories (expected number of rows at production customers):<br/>- S: less than 1000<br/>- M: less than 100.000<br/>- L: less than 10.000.000<br/>- XL: less than 100.000.000  <br/>- XXL: more than 100.000.000 |

### @ObjectModel.compositionRoot

Entity is the root of a compositional hierarchy.

**Type:** boolean<br/>
**Default Value**: `true`<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @ObjectModel.representativeKey

In case of multiple key elements: key element which represents the entity (in the sense that the entity itself is the list of values for this key element)

**External Type**: [Element Reference](../spec-v1/csn-interop-effective#element-reference) <br/>
**Scope:** Entity, Service<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition), [ServiceDefinition](../spec-v1/csn-interop-effective#service-definition)

### @ObjectModel.semanticKey

The property contains element(s) which shall be used to display the key in UIs (instead of the technical key).

**Type:** Array&lt;[Element Reference](../spec-v1/csn-interop-effective#element-reference)&gt;<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition)

### @ObjectModel.modelingPattern

The property declares the modeling pattern applied in this entity definition.

**Type**: Object(<a href="#objectmodelmodelingpattern_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="objectmodelmodelingpattern_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#objectmodelmodelingpattern_#" title="@ObjectModel.modelingPattern.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Provide the value in `{ "#": "<value>" }` enum notation.<hr/>**Allowed Values**: <ul><li>`"DATA_STRUCTURE"`</li><li>`"LANGUAGE_DEPENDENT_TEXT"`</li><li>`"UNIT_CONVERSION_RATE"`</li><li>`"VALUE_HELP_PROVIDER"`</li><li>`"COLLECTIVE_VALUE_HELP"`</li><li>`"DERIVATION_FUNCTION"`</li><li>`"PARENT_CHILD_HIERARCHY_NODE_PROVIDER"`</li><li>`"ENTERPRISE_SEARCH_PROVIDER"`</li><li>`"TRANSACTIONAL_INTERFACE"`</li><li>`"TRANSACTIONAL_QUERY"`</li><li>`"ANALYTICAL_QUERY"`</li><li>`"ANALYTICAL_DOCUMENT_STORE"`</li><li>`"ANALYTICAL_CUBE"`</li><li>`"ANALYTICAL_DIMENSION"`</li><li>`"ANALYTICAL_FACT"`</li><li>`"ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"`</li><li>`"ANALYTICAL_KPI"`</li><li>`"OUTPUT_FORM_DATA_PROVIDER"`</li><li>`"OUTPUT_EMAIL_DATA_PROVIDER"`</li><li>`"OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"`</li><li>`"SITUATION_ANCHOR"`</li><li>`"SITUATION_TRIGGER"`</li><li>`"SITUATION_DATACONTEXT"`</li><li>`"EXTERNAL_DATA_PROVIDER"`</li><li>`"NONE"`</li></ul></div>|


###### Example Values:


```js
{
  "#": "DATA_STRUCTURE"
}
```


### @ObjectModel.supportedCapabilities

The property declares the supported usage type for this entity in the context of consuming data models.

**Type:** Array&lt;[Supported Capabilities Enum Value](#supported-capabilities-enum-value)&gt;<br/>
**Scope:** Entity, Service<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition), [ServiceDefinition](../spec-v1/csn-interop-effective#service-definition)

### @ObjectModel.foreignKey.association

The element is of type `cds.Association` which points to the list of values.

Use only for service internal associations. For cross service associations, use the [@EntityRelationship Vocabulary](./entity-relationship) instead.

**External Type**: [Element Reference](../spec-v1/csn-interop-effective#element-reference) <br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition)

### @ObjectModel.text.element

The property contains element(s) containing a text for the annotated (id)element

**Type:** Array&lt;[Element Reference](../spec-v1/csn-interop-effective#element-reference)&gt;<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition)
###### Example Values:


```js
[
  "BillingDocumentTypeName"
]
```



### @ObjectModel.text.association

The element is of type cds.association, which points to an entity containing (language-dependent) texts for the annotated (id) element

**External Type**: [Element Reference](../spec-v1/csn-interop-effective#element-reference) <br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition)

### @ObjectModel.usageType.sizeCategory

The size category enables the consumer to judge the possible result data set size. 
It is a pure estimation at design time while modeling the entity what the data set size would be at runtime.
It reflects the set of data which has to be searched through to compute for example a count(*) of the data. 

The labels correspond to the following size categories (expected number of rows at production customers):
- S: less than 1000
- M: less than 100.000
- L: less than 10.000.000
- XL: less than 100.000.000  
- XXL: more than 100.000.000

**Type**: Object(<a href="#objectmodelusagetypesizecategory_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="objectmodelusagetypesizecategory_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#objectmodelusagetypesizecategory_#" title="@ObjectModel.usageType.sizeCategory.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Provide the value in `{ "#": "<value>" }` enum notation.<hr/>**Allowed Values**: <ul><li>`"S"`</li><li>`"M"`</li><li>`"L"`</li><li>`"XL"`</li><li>`"XXL"`</li></ul></div>|


###### Example Values:


```js
{
  "#": "XL"
}
```


### Supported Capabilities Enum Value

**Type**: Object(<a href="#supported-capabilities-enum-value_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="supported-capabilities-enum-value_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#supported-capabilities-enum-value_#" title="@ObjectModel.SupportedCapabilities_EnumValue.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">The entry declares one supported usage type.<hr/>**Allowed Values**: <ul><li>`"SQL_DATA_SOURCE"`</li><li>`"CDS_MODELING_DATA_SOURCE"`</li><li>`"CDS_MODELING_ASSOCIATION_TARGET"`</li><li>`"DATA_STRUCTURE"`</li><li>`"LANGUAGE_DEPENDENT_TEXT"`</li><li>`"UNIT_CONVERSION_RATE"`</li><li>`"VALUE_HELP_PROVIDER"`</li><li>`"COLLECTIVE_VALUE_HELP"`</li><li>`"EXTRACTION_DATA_SOURCE"`</li><li>`"DERIVATION_FUNCTION"`</li><li>`"PARENT_CHILD_HIERARCHY_NODE_PROVIDER"`</li><li>`"SEARCHABLE_ENTITY"`</li><li>`"ENTERPRISE_SEARCH_PROVIDER"`</li><li>`"TRANSACTIONAL_PROVIDER"`</li><li>`"ANALYTICAL_QUERY"`</li><li>`"ANALYTICAL_DOCUMENT_STORE"`</li><li>`"ANALYTICAL_DIMENSION"`</li><li>`"ANALYTICAL_PROVIDER"`</li><li>`"ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"`</li><li>`"ANALYTICAL_KPI"`</li><li>`"OUTPUT_FORM_DATA_PROVIDER"`</li><li>`"OUTPUT_EMAIL_DATA_PROVIDER"`</li><li>`"OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"`</li><li>`"SITUATION_ANCHOR"`</li><li>`"SITUATION_TRIGGER"`</li><li>`"SITUATION_DATACONTEXT"`</li><li>`"KEY_USER_COPYING_TEMPLATE"`</li><li>`"EXTERNAL_DATA_PROVIDER"`</li><li>`"ODM_COMPLIANT_PROVIDER"`</li><li>`"UI_PROVIDER_PROJECTION_SOURCE"`</li></ul></div>|

