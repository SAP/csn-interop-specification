---
sidebar_position: 5
description: "ABAP Type System"
---

# ABAP to CSN Interop

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

<!-- prettier-ignore -->
| ABAP DataType | CDS Datatype | Properties | Spark Type | ABAP Format | Comment | - | Transformer |
|-------------- | ------------ | ---------- | ---------- | ------ | ------- | - | ----------- |
| abap.cuky (len=5) | cds.String | length = 5 | STRING(5) | | | | - |
| abap.unit (len=3) | cds.String | length = 3 | STRING(3) | | | | - |
| abap.char (len=x) | cds.String | length = x | STRING(x) | | | | - |
| abap.varc (len=x) | cds.String | length = x | STRING(x) | | | | - |
| abap.string | cds.LargeString | length = x | STRING(x) | | | | - |
| abap.lchr | cds.LargeString | length = x | STRING(x) | | | | - |
| abap.sstring (len=x) | cds.String | length = x | STRING(x) | | | | - |
| abap.rawstring | cds.LargeString | length = x | STRING(x) | | | | - |
| abap.geom_ewkb | cds.LargeString | length = x | STRING(x) | | | | - |
| abap.numc (len=x) | cds.String | length = x | STRING(x) | | | | - |
| abap.clnt (len=3) | cds.String | length = 3 | STRING(3) | | | | - |
| abap.lang (len=2) | cds.String | length = 2 | STRING(2) | | | | - |
| abap.accp (len=6) | cds.String | length = 6 | STRING(6) | | | | - |
| abap.char(1) (*"@Semantic.booleanIndicator: true"*) | cds.String | length = 1 | STRING(1) | | We can't enforce the right values - therefore we must use string | | - |
| abap.utclong | cds.Timestamp | | TIMESTAMP | | | | "castToTimestamp": \[\{ "sourceColumnName": "abap_tstmpl", "sourceFormat": \["yyyy-MM-dd'T'HH:mm:ss.SSSSSSS"\], "valueReplacements": \[\{"sourceValues": \[ "" \], "targetValue": "NULL_VALUE" \}\]\}\] |
| abap.tims | cds.Time | | STRING(6) | HHmmss | | - |
| abap.timn | cds.Time | | STRING(12) | HH:mm:ss.SSS | | - |
| abap.dats | cds.Date | | DATE | "yyyyMMdd" | | | "castToDate": \[\{ "sourceColumnName": "abap_dats", "sourceFormat": \["yyyyMMdd"\], "valueReplacements": \[\{"sourceValues": \[ "00000000", "" \], "targetValue": "NULL_VALUE" \}\]\}\] |
| abap.datn | cds.Date | | DATE | "yyyy-MM-dd" | | |  "castToDate": \[\{ "sourceColumnName": "abap_dats", "sourceFormat": \["yyyy-MM-dd"\], "valueReplacements": \[\{"sourceValues": \[ "0000-00-00", "" \], "targetValue": "NULL_VALUE" \}\]\}\]  |
| abap.dec(precision = p, scale = s) | cds.Decimal | precision = p, scale = s | DECIMAL(p,s) | | | | - |
| abap.quan(precision = p, scale = s) | cds.Decimal | precision = p, scale = s | DECIMAL(p,s) | | | | - |
| abap.decfloat16(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | *not supported* | | | | - |
| abap.df16_dec(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | *not supported* | | | | - |
| abap.df16_raw(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | *not supported* | | | | - |
| abap.df16_scl(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | *not supported* | | | | - |
| abap.decfloat34(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | *not supported* | | | | - |
| abap.df34_dec(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | *not supported* | | | | - |
| abap.df34_raw(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | *not supported* | | | | - |
| abap.df34_scl(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | *not supported* | | | | - |
| abap.curr(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = 4 | DECIMAL(34, 4) | | | | - |
| abap.int8 | cds.Integer64 | | BIGINT | | | | - |
| abap.int1 | cds.Integer | | INT | | | | - |
| abap.int2 | cds.Integer | | INT | | | | - |
| abap.int4 | cds.Integer | | INT | | | | - |
| abap.prec | cds.Integer | | INT | | | | - |
| abap.fltp | cds.Double | | DOUBLE | | | | - |
| abap.raw | *not supported* | | | | | *not supported* | - |
| abap.lraw | *not supported* | | | | | *not supported* | - |

