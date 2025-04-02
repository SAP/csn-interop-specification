---
title: "@AnalyticsDetails"
sidebar_position: "3"
description: "@AnalyticsDetails for data analytics use cases."
---

> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

Analytical consumption requires additional, specific semantics, which indicate how to map a relational model to the Analytical meta model, using terms like "Facts", "Dimensions", "Measures", "Cubes", "Queries" and "KPIs".

On entity level these fundamental semantics are mainly captured via the annotations `@ObjectModel.modelingPattern` (design time hints; esp. #ANALYTICAL_FACT, #ANALYTICAL_DIMENSION, #ANALYTICAL_CUBE, #ANALYTICAL_QUERY), and `@ObjectModel.supportedCapabilities` (deployment/runtime hints; esp. #ANALYTICAL_DIMENSION, #ANALYTICAL_PROVIDER, #ANALYTICAL_QUERY).

The annotation `@AnalyticsDetails` captures specific analytical semantics on element level.
We recommend to consistently use the annotations in combination with the above-mentioned analytical modeling patterns and supported capabilities on entity level.

The most fundamental analytical specialization is to declare which elements represent a measure.
Because measures shall be aggregated in Analytical processing, all elements with a default aggregation annotation are candidates to be used as measures in Analytics.
Measures are further categorized into base, restricted and calculated measures.
Restricted and calculated measures shall be specifically treated by an Analytic Engine (esp. by MDS in HANA Cloud), whereas base measures have standard SQL semantics.

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [analytics-details.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/analytics-details.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@AnalyticsDetails.measureType](#analyticsdetailsmeasuretype) | Type | Specifies in which way a measure should treated. |

### @AnalyticsDetails.measureType

Specifies in which way a measure should treated.

**Type**: Object(<a href="#analyticsdetailsmeasuretype_#">#</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="analyticsdetailsmeasuretype_#">#<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#analyticsdetailsmeasuretype_#" title="@AnalyticsDetails.measureType.#"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Provide the value in `{ "#": "<value>" }` enum notation.<hr/>**Allowed Values**: <ul><li><p>`"BASE"`: Measure from the provider.</p></li><li><p>`"RESTRICTION"`: Restricted measure.</p></li><li><p>`"CALCULATION"`: Calculated measure (formula).</p></li></ul></div>|


###### Example Values:


```js
{
  "#": "BASE"
}
```

