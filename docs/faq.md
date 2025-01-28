---
title: FAQ
sidebar_position: 22
---

# FAQ

#### Q: Do you have a library for language XYZ?

Adopting CSN Interop is mostly about creating, exporting or importing the documents correctly.

Right now we don't have libraries, but we expect that SAP frameworks will add support for importing and exporting into their own metadata model or internal CSN variant.

Two things are usually helpful for adopters:

- If you export / convert: Use a validator to ensure that the documents are correct and compliant.
  - We have added CSN Interop validation to the API Metadata Validator, which we'll plan to open-source 2025.
  - Until then, it is recommended to run schema based validation against the [JSON Schema definition](https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json).
  - Ideally this runs automatically as CI/CD step or inside your test cases.
- Implement against a generated (ideally type safe) schema interface.
  - CSN Interop comes with a [JSON Schema definition](https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json), which can be converted into interfaces / clients for most programming languages.
    This can be done with converters like [quicktype](https://quicktype.io/).

#### Q: How does it compare to JSON Schema?

[JSON Schema](https://json-schema.org/) is widely known and established, so a comparison can help to understand the positioning of CSN Interop better:

<!-- prettier-ignore-start -->
|                    | CSN Interop | JSON Schema |
| ------------------ | ----------- | ----------- |
| **Serialization**: | JSON | JSON |
| **Design Goal**:   | Describe models with semantics | Describe data interfaces with their validation |
| **Layer**:         | "Conceptual" models, with optional mapping to physical API / data models | "Physical" data model only |
| **Extensibility**: | Annotations (`@`) and private properties (`_`) | Extension properties (usually x-`) |
| **Strengths**:     | Describing models with rich entity-relationship and semantic metadata | Describing actual data interfaces and validation. Can describe very complex JSON structures. |
| **Weaknesses**:    | Only limited validation constraints, physical model not directly defined. | No entity-relationship information (e.g. no concept for associations and IDs), no inheritance. |
<!-- prettier-ignore-end -->

In general, it could be stated that JSON Schema is not designed for describing models, although it's often used for that purpose.
This leads to problems with more complex models, e.g. when `$ref` is used together with constructs like `oneOf`, `anyOf`, `allOf` etc. to describe inheritance or polymorphism although their purpose is only to list, combine and reuse data shape constraints.

CSN Interop is designed to describe (conceptual) models first and not so much their physical data models and constraints.
Because the models in CSN are more abstract, it's possible to expose the same model via different API Protocols or derive persistence models for different databases. Depending on those choices, the [mapping](./mappings/) to an actual data model can be different.
The resulting data structure / API interface is not directly expressed in CSN, so either the mapping to it needs to be clearly specified or the resulting interface needs to be additionally described with a format fit for that purpose, like JSON Schema.

To sum it up, CSN Interop and JSON Schema serve different purposes and mostly complement each other.
If you start with a model first, we recommend to start with CSN and then derive JSON Schema (or other formats) based on the mapping.
