---
slug: /
sidebar_position: 0
title: "Overview"
---

# CSN Interop v1.2

## Summary

Core Schema Notation Interoperability (short: CSN Interop) is a modeling format to describe entity and service models within the SAP and Business Technology Platform (BTP) ecosystem.
CSN Interop files are serialized as JSON and provide comprehensive metadata about entities and their structure, relationships, and other aspects of the model.

A CSN Interop file can look like this (extracted from [./examples/airline.json](./spec-v1/examples/airline.md)):

```js
{
  "csnInteropEffective": "1.2",
  "$version": "2.0",
  "meta": {
    "document": {
      "version": "1.2.3",
      "doc": "This is a minimal CSN example document."
    }
  },
  "definitions": {
    "AirlineService": {
      "kind": "service",
      "doc": "This is describing the service that exposes the CDS entities through an API."
    },
    "AirlineService.Airline": {
      "kind": "entity",
      "doc": "Human readable description of the entity, in **markdown**.",
      "@EndUserText.label": "Airline",
      "@ObjectModel.modelingPattern": {
        "#": "ANALYTICAL_DIMENSION"
      },
      "elements": {
        "AirlineID": {
          "doc": "Human readable description of the element, in **markdown**.",
          "key": true,
          "type": "cds.UUID"
} } } } }
```

## Quick Start

**What**: CSN Interop is a JSON format for describing data models (entities, types, services) with rich metadata and annotations.

**When to use**:

- Exchanging metadata between SAP technology stacks (CAP, ABAP, Datasphere, etc.)
- Describing APIs and events with standardized, machine-readable metadata
- Integrating data models across different platforms

**Key characteristics**:

- 📄 **JSON-based** – Easy to parse and generate in any programming language
- 🔗 **Interoperable** – Standardized subset of CSN that works across tech stacks
- ✨ **Effective** – Denormalized format optimized for consumption (no post-processing needed)
- 📝 **Annotated** – Rich semantic annotations for labels, data privacy, analytics, and more

**Next steps**:

1. Read the [Primer](./primer.md) for an informal introduction
2. Explore [examples](./spec-v1/examples/index.mdx) to see CSN Interop in action
3. Review the [formal specification](./spec-v1/csn-interop-effective.md) and [JSON Schema](/spec-v1/csn-interop-effective.schema.json) for complete details

## What is CSN Interop Effective?

### CSN

Core Schema Notation (CSN, pronounced as "Season") is a JSON-based serialization format for Core Data Services (CDS) models that can be used to describe domain, data and service models (and more) on a _conceptual_ level, with rich semantics and annotations.

The [Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/cds/) can be used to create CDS models. The CAP documentation provides a comprehensive reference for [CSN](https://cap.cloud.sap/docs/cds/csn) and [CDL (CDS Definition Language)](https://cap.cloud.sap/docs/cds/cdl). Please note that CAP CSN is not identical to CSN Interop, as the latter is a well-defined subset of the first, with a focus on interoperability.

#### Relationship to CAP CSN

CSN Interop is closely related to CAP CSN, but with important differences:

| Aspect              | CAP CSN                                     | CSN Interop                                                                                   |
| ------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Scope**           | Full CSN syntax with all features           | Interoperable subset focused on data exchange                                                 |
| **Flavor**          | Supports parsed, effective, and persistence | Currently only the _effective_ (denormalized) flavor                                          |
| **Annotations**     | Technology-specific annotations allowed     | Standardized [annotation vocabularies](./spec-v1/extensions/index.mdx) for cross-platform use |
| **Target audience** | CAP developers                              | Cross-technology integration (CAP, ABAP, Datasphere, etc.)                                    |

If you are coming from CAP: CSN Interop documents are valid CSN, but not all CSN documents are valid CSN Interop. Think of CSN Interop as a **well-specified, portable subset** designed for metadata exchange between different SAP technologies.

### Interoperability

CSN is well-suited as data format to exchange information about data models (a.k.a. metadata integration) between different systems or even technology stacks such as CAP and ABAP. Thus, it is a key ingredient to support data integration between such systems and technologies.

As a consequence, there is a variety of syntax in CSN that can be specific to the source technology that might be incompatible with some consuming technology stacks. To mitigate such incompatibilities, a certain set of well-defined manipulations of the CSN syntax (so-called feature dimensions) can be used to create a more compatible _flavor_, i.e. a more _interoperable_ description of CDS models.

This specification aims to specify an _interoperable_ flavor of CSN with the following goals in mind:

- Overall ecosystem agreement on supported features and annotations.
- Importing / exporting data and API model metadata across different tech stacks and products.
- Simplify the format for consumers, making it explicit and straightforward to parse and understand (see [effective](#effective)).

This includes:

- The [core specification](./spec-v1/csn-interop-effective.md), which is a subset of regular CSN.
- Interoperable [annotation vocabularies](./spec-v1/extensions/index.mdx), only describe what is relevant for the wider ecosystem.
- Defined [mappings](./mappings/index.mdx), how CSN maps to other data type systems and can be serialized in APIs and data formats.

### Effective

Currently, this spec describes only the [effective](./spec-v1/csn-interop-effective) feature dimension.

Effective means that the format is [denormalized](https://en.wikipedia.org/wiki/Denormalization), and optimized towards easy consumption by machines, with the tradeoff of more verbosity and duplicated information.

Information reuse concepts like aspects have already been resolved, applied and cleaned up. What the consumer gets, is a document that does not require further post-processing / logic to be interpreted correctly. This is a tradeoff, prioritizing easy consumption over convenient creation.

### Serialization

A CSN Interop file is serialized as [JSON](https://www.json.org/json-en.html).

The correct media type for CSN Interop files is either `application/json` (because it is a valid JSON file) or `application/csn-interop+json` if you want to be more specific about the content type.

## Intended Audience

- Developers and Architects that either need to export or import CSN across different technology stacks.
- End consumers that need to understand CSN Interop as a metadata description format for resources they want to integrate with (e.g. APIs and Events).

## Contact

**CONTACT**: Create a GitHub PR or [issue](https://github.com/SAP/csn-interop-specification/issues).

**CONTRIBUTORS**: [Andreas Balzar](mailto:andreas.balzar@sap.com), Michael Belenki, Timo Bergmann, Daniel Buchmann, Timm Falter, Daniel Hutzel, Steffen Weinstock, [Simon Heimler](mailto:simon.heimler@sap.com), Sandra Bracholdt, Raluca Gruber, ...
