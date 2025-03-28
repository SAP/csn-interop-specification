---
slug: /
sidebar_position: 0
title: "Overview"
---

# Core Schema Notation Interoperability Specification

**VERSION**: v1.0

## Summary

Core schema notation interoperability (short: CSN Interop) is a powerful and flexible format used to describe entity and service models in the wider SAP and BTP ecosystem. CSN files are JSON-based and provide comprehensive metadata about entities and their structure, relationships, and other aspects of the model.

A CSN Interop file can look like this (extracted from [./examples/airline.json](./spec-v1/examples/airline.md)):

```js
{
  "csnInteropEffective": "1.0",
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

To get a first overview, read the [informal Primer](./primer.md).
The actual specification is described mostly in the [formal interface documentation](./spec-v1/csn-interop-effective.md), also described in [JSON Schema](/spec-v1/csn-interop-effective.schema.json).

## What is CSN Interop Effective?

For now, we describe the [CSN](#csn) [Interoperability](#interoperability) [Effective](#effective) exchange format.

### CSN

Core Schema Notation (CSN, pronounced as "Season") is a JSON based serialization format for Core Data Services (CDS) models that can be used to describe domain, data and service models (and more) on a _conceptual_ level, with rich semantics and annotations.

The [Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/cds/) is one platform to create CDS models and it is the first to productize CSN and provide a good [documentation](https://cap.cloud.sap/docs/cds/csn) on CSN.

### Interoperability

CSN is well-suited as data format to exchange information about data models (a.k.a. metadata integration) between different systems or even technology stacks such as CAP and ABAP. Thus, it is a key ingredient to support data integration between such systems and technologies.

As a consequence, there is a variety of syntax in CSN that can be specific to the source technology that might be incompatible with some consuming technology stacks. To mitigate such incompatibilities, a certain set of well-defined manipulations of the CSN syntax (so-called feature dimensions) can be used to create a more compatible _flavor_, i.e. a more _interoperable_ description of CDS models.

This specification aims to specify an _interoperable_ flavor of CSN with the following goals in mind:

- Overall ecosystem agreement on supported features and annotations.
- Importing / exporting data and API model metadata across different tech stacks and products.
- Simplify the format for the consumers, so it is explicit and easy to parse / understand (see [effective](#effective)).

This includes:

- The [core specification](./spec-v1/csn-interop-effective.md), which is a subset of regular CSN.
- Interoperable [annotation vocabularies](./spec-v1/annotations/index.mdx), only describe what is relevant for the wider ecosystem.
- Defined [mappings](./mappings/index.mdx), how CSN maps to other data type systems and can be serialized in APIs and data formats.

### Effective

Right now, this spec describes only the [effective](./spec-v1/csn-interop-effective) feature dimension.

Effective means that the format is "[denormalized](https://en.wikipedia.org/wiki/Denormalization)", and optimized towards easy consumption by machines, with the tradeoff of more verbosity and duplicated information.

Information reuse concepts like aspects have already been resolved, applied and cleaned up. What the consumer gets, is a document that does not require further post-processing / logic to be interpreted correctly. This is a tradeoff, prioritizing easy consumption over convenient creation.

## Intended Audience

- Developers and Architects that either need to export or import CSN across different technology stacks.
- End consumers that need to understand CSN Interop as a metadata description format for resources they want to integrate with (e.g. APIs and Events).

## Contact

**CONTACT**: Create a GitHub PR or [issue](https://github.com/SAP/csn-interop-specification/issues).

**CONTRIBUTORS**: [Andreas Balzar](mailto:andreas.balzar@sap.com), Michael Belenki, Timo Bergmann, Daniel Buchmann, Timm Falter, Daniel Hutzel, Steffen Weinstock, [Simon Heimler](mailto:simon.heimler@sap.com), Sandra Bracholdt, Raluca Gruber, ...
