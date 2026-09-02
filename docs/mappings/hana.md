---
sidebar_position: 3
title: SAP HANA
description: "CSN Interop types to SAP HANA types."
---

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

- HANA data types coming from here: [Link](https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20a1569875191014b507cf392724b7eb.html?locale=en-US) and in context with CAP / OData here: [Link](https://cap.cloud.sap/docs/advanced/hana#hana-types)

<!-- prettier-ignore -->
|CDS | HANA | Comment |
|--- |----- |-------- |
|`cds.Boolean`| BOOLEAN | |
|`cds.String` (length ) | NVARCHAR(length) | |
|`cds.LargeString` (length ) | NCLOB | |
|`cds.Integer`| INTEGER | |
|`cds.Integer64`| BIGINT | |
|`cds.Decimal` (precision = p, scale = s) | DECIMAL(p,s) | |
|`cds.Decimal` (precision = p, scale = floating) | DECIMAL | |
|Amounts with Currencies `cds.Decimal` (precision = 34, scale = 4) | DECIMAL(34,4) | |
|`cds.Decimal` (no arguments) | DECIMAL | |
|`cds.Double` | DOUBLE | |
|`cds.Date` | DATE | |
|`cds.Time` must be expressed as `cds.String(6)` or `cds.String(12)` depending on the source representation for now + the annotation `@Semantics.time: true` | TIME | Data is in format `HHmmss` or `HH:mm:ss.SSS` - consumer must use the function to_time() to convert to `cds.Time`|
|`cds.DateTime` sec precision | TIMESTAMP | |
|`cds.Timestamp` µs precision | TIMESTAMP | HANA with ns precision (precision loss) |
|`cds.UUID` + the annotation `@Semantics.uuid: true` | NVARCHAR(36) | |
|- | ST_GEOMETRY | |
|- | ST_POINT | |
|`cds.vector` | REAL_VECTOR | |
|- | HALF_VECTOR | HANA half-precision vector type |
