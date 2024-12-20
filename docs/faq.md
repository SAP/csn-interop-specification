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
