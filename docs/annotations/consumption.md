---
title: "@Consumption"
sidebar_position: "4"
description: "@Consumption annotations."
---

> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

Via those Annotations the specific behavior is defined which is related to the consumption of CDS content via domain-specific frameworks. This metadata makes no assumptions on the concrete consumption technology/infrastructure but is applicable across multiple consumption technologies (Analytics, OData, …).

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [consumption.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/consumption.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@Consumption.valueHelpDefinition](#consumptionvaluehelpdefinition) | Entity, Type | The property defines how value helps for this element shall be constructed.<br/><br/>It allows to associate a (set of) View/Entity that provides the "Value Help" for the annotated field or parameter.<br/>This is achieved by either referencing the target view/entity of a modelled association or by directly establishing a relationship to view/entity that shall act as a value help provider. |

### @Consumption.valueHelpDefinition

The property defines how value helps for this element shall be constructed.

It allows to associate a (set of) View/Entity that provides the "Value Help" for the annotated field or parameter.
This is achieved by either referencing the target view/entity of a modelled association or by directly establishing a relationship to view/entity that shall act as a value help provider.

**Type:** Array&lt;[Consumption Value Help Definition](#consumption-value-help-definition)&gt;<br/>
**Scope:** Entity, Type<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition), [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)

### Consumption Value Help Definition

**Type**: Object(<a href="#consumption-value-help-definition_entity">entity</a>, <a href="#consumption-value-help-definition_additionalbinding">additionalBinding</a>, <a href="#consumption-value-help-definition_association">association</a>, <a href="#consumption-value-help-definition_distinctvalues">distinctValues</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="consumption-value-help-definition_entity">entity<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_entity" title="@Consumption.ConsumptionValueHelpDefinition.entity"></a></div>|<div className="interface-property-type">[Consumption Value Help Definition](#consumption-value-help-definition)</div>|<div className="interface-property-description">Value help defining view or entity.</div>|
|<div className="interface-property-name anchor" id="consumption-value-help-definition_additionalbinding">additionalBinding<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_additionalbinding" title="@Consumption.ConsumptionValueHelpDefinition.additionalBinding"></a></div>|<div className="interface-property-type">Array&lt;[Additional Binding](#additional-binding)&gt;</div>|<div className="interface-property-description">Additional bindings for filtering the value help result list.</div>|
|<div className="interface-property-name anchor" id="consumption-value-help-definition_association">association<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_association" title="@Consumption.ConsumptionValueHelpDefinition.association"></a></div>|<div className="interface-property-type">[Element Reference](../spec-v1/csn-interop-effective#element-reference)</div>|<div className="interface-property-description">Reference to the modelled association (in local entity) for which the target view represents the value help providing view or entity for the annotated local field. The on-condition of the association may only contain bindings of the source and target fields that use an equal operator. All these bindings are automatically considered by the value help for both filter and result mappings.<br/>Mutually exclusive to the usage of `valueHelpDefinition.entity`.</div>|
|<div className="interface-property-name anchor" id="consumption-value-help-definition_distinctvalues">distinctValues<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_distinctvalues" title="@Consumption.ConsumptionValueHelpDefinition.distinctValues"></a></div>|<div className="interface-property-type">boolean</div>|<div className="interface-property-description">Specifies whether the value help result list shall only contain distinct values for the annotated field or parameter.<br/>If set to true all mappings will be used for filtering, but only the value for the field/parameter which the value help was requested for will be returned by the value help.<hr/>**Default Value**: `true`</div>|


###### Example Values:


```js
{
  "entity": {
    "name": "I_ControllingAreaStdVH",
    "element": "ControllingArea"
  }
}
```


```js
{
  "entity": {
    "name": "I_CostCenterStdVH",
    "element": "CostCenter"
  },
  "additionalBinding": [
    {
      "localElement": "ControllingArea",
      "element": "ControllingArea"
    }
  ]
}
```


```js
{
  "association": {
    "=": "to_Airline"
  }
}
```


### Consumption Value Help Definition

Value help defining view or entity.

**Type**: Object(<a href="#consumption-value-help-definition_name">name</a>, <a href="#consumption-value-help-definition_element">element</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="consumption-value-help-definition_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_name" title="@Consumption.ConsumptionValueHelpDefinition.Entity.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Name of the value help providing view or entity</div>|
|<div className="interface-property-name anchor" id="consumption-value-help-definition_element">element<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#consumption-value-help-definition_element" title="@Consumption.ConsumptionValueHelpDefinition.Entity.element"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Name of the field of the value help view or entity, which the annotated local field or parameter is bound to.<br/><br/>Mutually exclusive to the usage of `valueHelpDefinition.association`.</div>|


### Additional Binding

Allows to define additional bindings (besides the ones defined by `valueHelpDefinition.association` or `valueHelpDefinition.entity`) for filtering the value help result list and/or returning values from the selected value help record.

**Type**: Object(<a href="#additional-binding_localelement">localElement</a>, <a href="#additional-binding_element">element</a>, <a href="#additional-binding_usage">usage</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="additional-binding_localelement">localElement<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#additional-binding_localelement" title="@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.localElement"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Field of the current view/entity; mutually exclusive to the usage of `localParameter`.</div>|
|<div className="interface-property-name anchor" id="additional-binding_element">element<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#additional-binding_element" title="@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.element"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Name of the field of the value help view or entity, which the annotated local field or parameter is bound to.</div>|
|<div className="interface-property-name anchor" id="additional-binding_usage">usage<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#additional-binding_usage" title="@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.usage"></a></div>|<div className="interface-property-type">[@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.Usage](#consumptionconsumptionvaluehelpdefinitionadditionalbindingusage)</div>|<div className="interface-property-description">The binding may either specify an additional filter-criterion on the value help list (`#FILTER`), or an additional result mapping for the selected value help record (`#RESULT`) or a combination thereof (`#FILTER_AND_RESULT`).<br/>If not specified explicitly the usage is `#FILTER_AND_RESULT`.<br/>If distinctValues is set to true, additional bindings must specify the usage as `#FILTER`.</div>|


### @Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.Usage

The binding may either specify an additional filter-criterion on the value help list (`#FILTER`), or an additional result mapping for the selected value help record (`#RESULT`) or a combination thereof (`#FILTER_AND_RESULT`).
If not specified explicitly the usage is `#FILTER_AND_RESULT`.
If distinctValues is set to true, additional bindings must specify the usage as `#FILTER`.

**Type**: Object(<a href="#consumptionconsumptionvaluehelpdefinitionadditionalbindingusage_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="consumptionconsumptionvaluehelpdefinitionadditionalbindingusage_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#consumptionconsumptionvaluehelpdefinitionadditionalbindingusage_#" title="@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.Usage.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Provide the value in `{ "#": "<value>" }` enum notation.<hr/>**Default Value**: `FILTER_AND_RESULT`<br/>**Allowed Values**: <ul><li>`"FILTER"`</li><li>`"RESULT"`</li><li>`"FILTER_AND_RESULT"`</li></ul></div>|


###### Example Values:


```js
{
  "#": "FILTER_AND_RESULT"
}
```

