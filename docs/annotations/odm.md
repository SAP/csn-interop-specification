---
title: "@ODM"
sidebar_position: "8"
description: "@ODM for One Domain Model (ODM) related annotations."
---

> <span className="feature-status-stable">STABLE</span> This annotation can be used productively.

## Introduction

Annotations of the one domain model allow specifying entities and their elements to make them ODM compliant accordingly to ODM Compliance rules.

> 🔗 For more background, see blog post: [Harnessing Half a Century of Knowledge: SAP's Journey of Enriching APIs with Business Metadata](https://community.sap.com/t5/technology-blogs-by-sap/harnessing-half-a-century-of-knowledge-sap-s-journey-of-enriching-apis-with/ba-p/13578364)

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [odm.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/odm.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@ODM.entityName](#odmentityname) | Entity | The entity represents an ODM Entity with this official name. |
| [@ODM.oid](#odmoid) | Entity | The annotation references the element which contains the oid. |
| [@ODM.oidReference.entityName](#odmoidreferenceentityname) | Type | The property contains an OID for the ODM Entity with this official name |

### @ODM.entityName

The entity represents an ODM Entity with this official name.

**Type:** string<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @ODM.oid

The annotation references the element which contains the oid.

**External Type**: [Element Reference](../spec-v1/csn-interop-effective#element-reference) <br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @ODM.oidReference.entityName

The property contains an OID for the ODM Entity with this official name

**Type:** string<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)
