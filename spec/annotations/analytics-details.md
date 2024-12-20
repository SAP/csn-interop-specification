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
