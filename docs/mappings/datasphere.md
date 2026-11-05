---
sidebar_position: 4
title: SAP Datasphere
description: "CSN Interop types to SAP Datasphere types."
---

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

- Datasphere Data Types coming from here: [Link](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/2f39104e5bd847919b8daee1580c4f68.html)

<!-- prettier-ignore -->
|CDS | Datasphere | Comment |
|--- |----------- |-------- |
|`cds.Boolean`| `cds.Boolean`| |
|`cds.String` (length ) | `cds.String` | Datasphere Logic: IF `cds.String(length = undefined)` THEN `cds.String(length = 5000)` |
|`cds.LargeString` (length ) | `cds.LargeString` | |
|`cds.Integer`| `cds.Integer` | |
|`cds.Integer64`| `cds.Integer64` | |
|`cds.Decimal` (precision = p, scale = s) | `cds.Decimal` | Datasphere Logic: IF `cds.Decimal(p < 17)` THEN `cds.Decimal(p = 17)` |
|`cds.Decimal` (precision = p, scale = floating) | `cds.Decimal` | |
|Amounts with Currencies `cds.Decimal` (precision = 34, scale = 4) | `cds.Decimal(34, 4)` | |
|`cds.Decimal` (no arguments) | DecimalFloat | |
|`cds.Double` | `cds.Double` | |
|`cds.Date` | `cds.Date` | |
|`cds.Time` must be expressed as `cds.String(6)` or `cds.String(12)` depending on the source representation for now + the annotation `@Semantics.time: true` | `cds.String(6)` or `cds.String(12)` | |
|`cds.DateTime` sec precision | `cds.Timestamp` | |
|`cds.Timestamp` µs precision | `cds.Timestamp` | |
|`cds.UUID` + the annotation `@Semantics.uuid: true` | `cds.UUID` | |
|- | hana.ST_GEOMETRY | |
|- | hana.ST_POINT | |
