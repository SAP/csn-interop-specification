---
sidebar_position: 1
title: Apache Spark
description: "CSN Interop types to Apache Spark types."
---

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

- Spark Data Types coming from here: [Link](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/data_types.html)
- DataSphere Data Types coming from here: [Link](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/7b1dc6e0fad147de8e50aa8dc4744aa3.html?locale=en-US)

<!-- prettier-ignore -->
|CDS | Spark / Delta Lake | Datasphere | Comment | CDS format | Spark format |
|--- |------------------- |----------- |-------- |------------|--------------|
|`cds.Boolean`| BOOLEAN | `cds.Boolean`| | | |
|`cds.String` (length ) | STRING | `cds.String` | | | |
|`cds.LargeString` (length ) | STRING | `cds.LargeString` | | | |
|`cds.Integer`| INT | `cds.Integer` | | | |
|`cds.Integer64`| BIGINT | `cds.Integer64` | | | |
|`cds.Decimal` (precision, scale)| DECIMAL(p,s) | `cds.Decimal` | | | |
|`cds.Decimal` (precision = 34, scale = floating) | ***not supported*** | `cds.DecimalFloat` | Decimal with scale = floating is not supported in spark | | |
|Amounts with Currencies `cds.Decimal` (precision = 34, scale = 4) | `cds.Decimal(34, 4)` | `cds.Decimal(34, 4)` | Since spark does not support `cds.DecimalFloat` we use cds.Decimal(34,4) as compromise for now | | |
|`cds.Double`| DOUBLE | `cds.Double` | | | |
|`cds.Date`| DATE | `cds.Date` | | "yyyyMMdd" | "yyyyMMdd" |
|`cds.Time` must be expressed as `cds.String(6)` or `cds.String(12)` depending on the source representation for now + the annotation `@Semantics.time: true`| STRING | `cds.String(6)` or `cds.String(12)` | Data is in format `HHmmss` or `HH:mm:ss.SSS` - consumer must use the function to_time() to convert to `cds.Time`| | |
|`cds.DateTime` sec precision| TIMESTAMP | `cds.Timestamp` | | | |
|`cds.Timestamp` µs precision| TIMESTAMP | `cds.Timestamp` | | "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS" | "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS" |
|`cds.UUID` + the annotation `@Semantics.uuid: true`| STRING (36) | `cds.UUID` | | | |
