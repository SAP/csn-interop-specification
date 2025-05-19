---
sidebar_position: 5
description: "ABAP Type System"
---

# ABAP to CSN Interop

> <span className="feature-status-draft">DRAFT</span> This mapping definition is work in progress and may be subject to further change.

<!-- prettier-ignore -->
| ABAP DataType | CDS Datatype | Properties | Format | Comment | New CDS Datatype  |
|-------------- | ------------ | ---------- | ------ | ------- | ----------------- |
| abap.cuky (len=5) | cds.String | length = 5 | | | no change  |
| abap.unit (len=3) | cds.String | length = 3 | | | no change  |
| abap.char (len=x) | cds.String | length = x | | | no change  |
| abap.varc (len=x) | cds.String | length = x | | | no change  |
| abap.sstring (len=x) | cds.String | length = x | | | no change  |
| abap.numc (len=x) | cds.String | length = x | | | no change  |
| abap.clnt (len=3) | cds.String | length = 2 | | | no change  |
| abap.lang (len=2) | cds.String | length = 2 | | | no change  |
| abap.accp (len=6) | cds.String | length = 6 | | | no change  |
| special logic (mainly char(1)) | cds.Boolean | | | decision is taken based on certain domains | no change  |
| abap.utclong | cds.Timestamp | | | | no change  |
| abap.tims | cds.Time | | | | no change  |
| abap.timn | cds.Time | | | | no change  |
| abap.dats | cds.Date | |"yyyyMMdd" | | no change  |
| abap.datn | cds.Date | |"yyyy-MM-dd" | | no change  |
| abap.dec(precision = x, scale = y) | cds.Decimal | precision = x, scale = y | | | no change  |
| abap.quan(precision = x, scale = y) | cds.Decimal | precision = x, scale = y | | | no change  |
| abap.decfloat16(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | | | cds.decimal(16,?)  |
| abap.df16_dec(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | | | cds.decimal(16,?)  |
| abap.df16_raw(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | | | cds.decimal(16,?)  |
| abap.df16_scl(precision = 16, scale = floating) | cds.Decimal | precision = 16, scale = floating | | | cds.decimal(16,?)  |
| abap.decfloat34(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | | | cds.decimal(34,?)  |
| abap.df34_dec(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | | | cds.decimal(34,?)  |
| abap.df34_raw(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | | | cds.decimal(34,?)  |
| abap.df34_scl(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | | | cds.decimal(34,?)  |
| abap.curr(precision = 34, scale = floating) | cds.Decimal | precision = 34, scale = floating | | | cds.decimal(34,?)  |
| abap.int8 | cds.Integer64 | | | | no change  |
| abap.int1 | cds.Integer | | | | no change  |
| abap.int2 | cds.Integer | | | | no change  |
| abap.int4 | cds.Integer | | | | no change  |
| abap.prec | cds.Integer | | | | no change  |
| abap.raw | cds.binary | | | | default: cds.String(2 \* raw-length) - later we have to discuss how to encode e.g. images or for which data types we use cds.UUID (max 36) (for a dedicated list of abap data types) - for cds.UUID use rules from OData Data Types |
| abap.fltp | cds.double | | | | cds.Double |
| abap.string | cds.largestring | | | | cds.String length is either given or blank |
| abap.lchr | cds.largestring | | | | cds.String length is either given or blank |
| abap.lraw | cds.largebinary | | | | not supported  |
| abap.rawstring | cds.largebinary | | | | not supported  |
| abap.geom_ewkb | cds.largebinary | | | not supported  |
