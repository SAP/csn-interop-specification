---
sidebar_position: 1
title: Apache Spark
description: "CSN Interop types to Apache Spark types."
---

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

- Spark Data Types coming from here: [Link](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/data_types.html)
- DataSphere Data Types coming from here: [Link](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/7b1dc6e0fad147de8e50aa8dc4744aa3.html?locale=en-US)
- HANA data types coming from here: [Link](https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20a1569875191014b507cf392724b7eb.html?locale=en-US) and in context with CAP / OData here: [Link](https://cap.cloud.sap/docs/advanced/hana#hana-types)

<!-- prettier-ignore -->
|CDS | Spark / Delta Lake | Datasphere | HANA | Comment | Spark format |
|--- |------------------- |----------- |----- |-------- |--------------|
|`cds.Boolean`| BOOLEAN| `cds.Boolean`| BOOLEAN | | |
|`cds.String` (length ) | STRING | `cds.String` | NVARCHAR(length) | Datasphere Logic: IF `cds.String(length = undefined)` THEN `cds.String(length = 5000)` | |
|`cds.LargeString` (length ) | STRING | `cds.LargeString` | NCLOB | | |
|`cds.Integer`| INT | `cds.Integer` | INTEGER | | |
|`cds.Integer64`| BIGINT | `cds.Integer64` | BIGINT | | |
|`cds.Decimal` (precision = p, scale = s) | DECIMAL(p,s) | `cds.Decimal` | DECIMAL(p,s) | Datasphere Logic: IF `cds.Decimal(p < 17)` THEN `cds.Decimal(p = 17)` | |
|`cds.Decimal` (precision = p, scale = floating) | ***not supported*** | `cds.Decimal` | DECIMAL | Decimal with scale = floating is not supported in spark | |
|Amounts with Currencies `cds.Decimal` (precision = 34, scale = 4) | `cds.Decimal(34, 4)` | `cds.Decimal(34, 4)` | DECIMAL(34,4) | Since spark does not support `cds.DecimalFloat` we use cds.Decimal(34,4) as compromise for now |
`cds.Decimal` (no arguments) | ***not supported*** | DecimalFloat | DECIMAL | | | |
|`cds.Double` | DOUBLE | `cds.Double` | DOUBLE | | |
|`cds.Date` | DATE | `cds.Date` | DATE | | "yyyyMMdd" |
|`cds.Time` must be expressed as `cds.String(6)` or `cds.String(12)` depending on the source representation for now + the annotation `@Semantics.time: true` | STRING | `cds.String(6)` or `cds.String(12)` | TIME | Data is in format `HHmmss` or `HH:mm:ss.SSS` - consumer must use the function to_time() to convert to `cds.Time`| |
|`cds.DateTime` sec precision | TIMESTAMP | `cds.Timestamp` | TIMESTAMP | | |
|`cds.Timestamp` µs precision | TIMESTAMP | `cds.Timestamp` | TIMESTAMP | HANA with ns precision (precision loss) | "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS" |
|`cds.UUID` + the annotation `@Semantics.uuid: true` | STRING (36) | `cds.UUID` | NVARCHAR(36) | | | |
| | | hana.ST_GEOMETRY | ST_GEOMETRY | | | |
| | | hana.ST_POINT | ST_POINT | | |
`cds.vector` | | | REAL_VECTOR | | | |
| | | | HALF_VECTOR | | | |
