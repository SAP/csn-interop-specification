---
title: "@Aggregation"
sidebar_position: "2"
description: "@Aggregation annotations."
---

> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

When purely relying on standard SQL, the developer/provider of a view needs to decide explicitly within the view definition, if the view should deliver aggregated results or single records. This definition cannot be overwritten by the consumer of the view.

In some scenarios a more flexible behavior is desired, in a sense that the view definition doesn’t restrict its invocation either to delivering single records or aggregated results. This decision should be left to the consumer of the view who has explicit means in the CDS Query Language to express which behavior should be applied. This approach also allows avoiding the usage of the implicit aggregation behavior of the Calc Engine.

To support those kinds of scenarios, the view developer

- defines the “core” view definition (= the parts being described via a QL-Query) in a way that it returns single records (when the view is consumed via “aggregation-free” QL-statements) and
- adds dedicated annotations to the elements in the projection list that define which aggregation behavior should be applied when the consumer wants to get aggregated results from the view.

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [aggregation.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/aggregation.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@Aggregation.default](#aggregationdefault) | Type | The element shall per default be aggregated using the annotated SQL aggregate function.<br/><br/>The chosen value defines which aggregation semantics should be applied.<br/>The aggregation types SUM, MAX, MIN, NOP are only allowed for elements with numeric type<br/><br/>> ℹ️ Note: There is an semantically equivalent annotation `@DefaultAggregation`, which is now obsolete.<br/>> As consumers are not expected to interpret `@DefaultAggregation`, providers shall consistently adopt `@Aggregation.default` for interoperability. |

### @Aggregation.default

The element shall per default be aggregated using the annotated SQL aggregate function.

The chosen value defines which aggregation semantics should be applied.
The aggregation types SUM, MAX, MIN, NOP are only allowed for elements with numeric type

> ℹ️ Note: There is an semantically equivalent annotation `@DefaultAggregation`, which is now obsolete.
> As consumers are not expected to interpret `@DefaultAggregation`, providers shall consistently adopt `@Aggregation.default` for interoperability.

**Type**: Object(<a href="#aggregationdefault_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="aggregationdefault_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#aggregationdefault_#" title="@Aggregation.default.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Provide the value in `{ "#": "<value>" }` enum notation.<hr/>**Allowed Values**: <ul><li><p>`"NONE"`: Indicates that the element is not a measure.<br/>Usually these elements are used in filters and GROUP BY-statements. Should not be used explicit.<br/>It is the default for all elements which can be mapped to a dimension.</p></li><li><p>`"SUM"`: Correspond to the standard SQL aggregation type.</p></li><li><p>`"MIN"`: Correspond to the standard SQL aggregation type.</p></li><li><p>`"MAX"`: Correspond to the standard SQL aggregation type.</p></li><li><p>`"AVG"`: Correspond to the standard SQL aggregation type.</p></li><li><p>`"COUNT_DISTINCT"`: Counts the number of distinct values of the element specified with `@Aggregation.referenceElement`.<br/><br/>> TODO: `@Aggregation.referenceElement` is not yet documented here.</p></li><li><p>`"NOP"`: Returns a value, if it is unique; otherwise it returns a special error value. It is the default in views with Analytics.dataCategory CUBE, FACT, and DIMENSION, if the data type of the element is numeric.</p></li><li><p>`"FORMULA"`: The element is a formula which has to be calculated after the operands have been determined by aggregation or calculation. It should never be aggregated. If the element is not a formula, then this value must not be used. It is only supported in analytical queries. Example: Margin : = Revenue / Cost. If in a report Margin should be shown per OrgUnit, then first the aggregates of Revenue and Cost have to be de-termined per OrgUnit and then the Margin has to be calculated per OrgUn-it. The Margin for the company is not the aggregate of the Margin per Or-gUnit but has to be calculated separately by Revenue for all OrgUnits divided by the Costs for all OrgUnits.</p></li></ul></div>|


###### Example Values:


```js
{
  "#": "SUM"
}
```

