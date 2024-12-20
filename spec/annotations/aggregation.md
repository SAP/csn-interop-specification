> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

When purely relying on standard SQL, the developer/provider of a view needs to decide explicitly within the view definition, if the view should deliver aggregated results or single records. This definition cannot be overwritten by the consumer of the view.

In some scenarios a more flexible behavior is desired, in a sense that the view definition doesn’t restrict its invocation either to delivering single records or aggregated results. This decision should be left to the consumer of the view who has explicit means in the CDS Query Language to express which behavior should be applied. This approach also allows avoiding the usage of the implicit aggregation behavior of the Calc Engine.

To support those kinds of scenarios, the view developer

- defines the “core” view definition (= the parts being described via a QL-Query) in a way that it returns single records (when the view is consumed via “aggregation-free” QL-statements) and
- adds dedicated annotations to the elements in the projection list that define which aggregation behavior should be applied when the consumer wants to get aggregated results from the view.
