---
sidebar_position: 1
title: Apache Spark
description: "CSN Interop types to Apache Spark types."
---

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

- Spark Data Types coming from here: [Link](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/data_types.html)

<!-- prettier-ignore -->
|CDS | Spark / Delta Lake | Comment | Spark format |
|--- |------------------- |-------- |--------------|
|`cds.Boolean`| BOOLEAN| | |
|`cds.String` (length ) | STRING | | |
|`cds.LargeString` (length ) | STRING | | |
|`cds.Integer`| INT | | |
|`cds.Integer64`| BIGINT | | |
|`cds.Decimal` (precision = p, scale = s) | DECIMAL(p,s) | | |
|`cds.Decimal` (precision = p, scale = floating) | ***not supported*** | Decimal with scale = floating is not supported in spark | |
|Amounts with Currencies `cds.Decimal` (precision = 34, scale = 4) | `cds.Decimal(34, 4)` | Since spark does not support `cds.DecimalFloat` we use cds.Decimal(34,4) as compromise for now | |
|`cds.Decimal` (no arguments) | ***not supported*** | | |
|`cds.Double` | DOUBLE | | |
|`cds.Date` | DATE | | "yyyyMMdd" |
|`cds.Time` must be expressed as `cds.String(6)` or `cds.String(12)` depending on the source representation for now + the annotation `@Semantics.time: true` | STRING | Data is in format `HHmmss` or `HH:mm:ss.SSS` - consumer must use the function to_time() to convert to `cds.Time`| |
|`cds.DateTime` sec precision | TIMESTAMP | | |
|`cds.Timestamp` µs precision | TIMESTAMP | | "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS" |
|`cds.UUID` + the annotation `@Semantics.uuid: true` | STRING (36) | | |
|hana.ST_GEOMETRY (in DSP, not in CDS) | STRING | CSN with type info | |
|hana.ST_POINT | STRING | CSN with type info | |
