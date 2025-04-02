---
title: "@PersonalData"
sidebar_position: "9"
description: "@PersonalData to annotate DPP relevant information."
---

> <span className="feature-status-stable">STABLE</span> This annotation can be used productively.

## Introduction

The processing of personal data is key in business processes. SAP's products must enable our customers to operate their applications in compliance with data protection laws. One way of enabling is applying DPP-related annotations. Via those annotations the specific DPP-related behavior can be enabled by the consumers. The annotations are derived from existing personal data annotations in OData and OpenAPI.

## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Related Links

- OData personal data vocabulary: [PersonalData](https://github.com/SAP/odata-vocabularies/blob/main/vocabularies/PersonalData.md)
- OpenAPI: [Extensions](https://github.com/SAP/openapi-specification/tree/main/sap-extensions)

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [personal-data.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/personal-data.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@PersonalData.entitySemantics](#personaldataentitysemantics) | Entity | Primary meaning of the entities in the annotated entity set. Entities annotated with @PersonalData.entitySemantics are synonymous to @PersonalData.isPotentiallyPersonal. |
| [@PersonalData.dataSubjectRole](#personaldatadatasubjectrole) | Entity | Role of the data subjects in this set (e.g. employee, customer). Values are application-specific. |
| [@PersonalData.dataSubjectRoleDescription](#personaldatadatasubjectroledescription) | Entity | Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific. |
| [@PersonalData.fieldSemantics](#personaldatafieldsemantics) | Type | Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal. |
| [@PersonalData.isPotentiallyPersonal](#personaldataispotentiallypersonal) | Type | Property contains potentially personal data. Properties annotated with `@PersonalData.fieldSemantics` need not be additionally annotated with this annotation. Personal data describes any information which is related to an identified or identifiable natural person (data subject). An identifiable person is one who can be identified, directly or indirectly, in particular by a reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. |
| [@PersonalData.isPotentiallySensitive](#personaldataispotentiallysensitive) | Type | Property contains potentially sensitive personal data. Sensitive personal data is a category of personal data that needs special handling. The determination which personal data is sensitive may differ for different legal areas or industries.<br/>Examples of sensitive personal data:<br/>-	Special categories of personal data, such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, data concerning health or sex life or sexual orientation.<br/>-	Personal data subject to professional secrecy<br/>-	Personal data relating to criminal or administrative offenses<br/>-	Personal data concerning insurances and bank or credit card accounts |

### @PersonalData.entitySemantics

Primary meaning of the entities in the annotated entity set. Entities annotated with @PersonalData.entitySemantics are synonymous to @PersonalData.isPotentiallyPersonal.

**Type:** string<br/>
**Allowed Values**: <ul><li><p>`"DataSubject"`: Describes a data subject, for example, a customer or vendor.</p></li><li><p>`"DataSubjectDetails"`: Describes entities that contain details for a data subject, for example an address.</p></li><li><p>`"Other"`: Entities that contain personal data or references to data subjects but do not represent data subjects or details itself. For example: customer quote, customer order, or purchase order.</p></li></ul>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @PersonalData.dataSubjectRole

Role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

**Type:** string<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @PersonalData.dataSubjectRoleDescription

Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

**Type:** string<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @PersonalData.fieldSemantics

Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.

**Type:** string<br/>
**Allowed Values**: <ul><li><p>`"DataSubjectID"`: Identifies the data subject unique key or references it.</p></li><li><p>`"DataSubjectIDType"`: The type describing the DataSubjectID identifying the data subject, e.g., an e-mail address, semantic of the ID or a customer.</p></li><li><p>`"ConsentID"`: The unique identifier for a consent. A consent is an action of data subjects confirming that the usage of their personal data shall be allowed for a given purpose. A consent functionality allows the storage of a consent record in relation to a specific purpose and shows if a data subject has granted, withdrawn, or denied consent.</p></li><li><p>`"PurposeID"`: The unique identifier for the purpose of processing of personal data. Any processing of personal data is based on specified, explicit, and legitimate purposes and not further processed in a manner that is incompatible with those purposes. The purpose is defined by the data controller or joint data controllers.</p></li><li><p>`"ContractRelatedID"`: The unique identifier for transactional data that is related to a contract that requires processing of personal data. For example, Sales Contract ID, Purchase Contract ID, or Service Contract ID.</p></li><li><p>`"DataControllerID"`: The unique identifier of a legal entity which alone or jointly with others determines the purposes and means of the processing of personal data. The Data Controller is fully responsible (and accountable) that data protection and privacy principles (such as purpose limitation or data minimization), defined in the European General Data Protection Regulation (GDPR) or any other data protection legislation, are adhered to when processing personal data. The DataControllerID succeeds the LegalEntityID.</p></li><li><p>`"UserID"`: The unique identifier of a user. A user is an individual who interacts with the services supplied by a system.</p></li><li><p>`"EndOfBusinessDate"`: Defines the end of active business and the start of residence time and retention period. End of business is the point in time when the processing of a set of personal data is no longer required for the active business, for example, when a contract is fulfilled. After it has been reached and a customer-defined residence period has passed, the data is blocked and can only be accessed by users with special authorizations (for example, tax auditors). All fields of type Edm.Date or Edm.DateTimeOffset on which the end of business determination depends should be annotated.</p></li><li><p>`"BlockingDate"`: Defines a date that marks when the provider of the data will block these. This is the point in time when the processing of a set of personal data is no longer required for the active business, for example, when a contract is fulfilled. After it has been reached, the data is blocked in the source and can only be displayed by users with special authorizations (for example, tax auditors); however, it is not allowed to create/change/copy/follow-up blocked data. Consumers of the data should consider if there is an additional purpose to process the data beyond the defined blocking date</p></li><li><p>`"EndOfRetentionDate"`: Defines a date that marks when the provider of the data can destroy these. Consumers of the data should consider if there is an additional purpose (or a legal hold) to process the data beyond the defined destruction date.</p></li></ul>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)

### @PersonalData.isPotentiallyPersonal

Property contains potentially personal data. Properties annotated with `@PersonalData.fieldSemantics` need not be additionally annotated with this annotation. Personal data describes any information which is related to an identified or identifiable natural person (data subject). An identifiable person is one who can be identified, directly or indirectly, in particular by a reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.

**Type:** boolean<br/>
**Default Value**: `true`<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)

### @PersonalData.isPotentiallySensitive

Property contains potentially sensitive personal data. Sensitive personal data is a category of personal data that needs special handling. The determination which personal data is sensitive may differ for different legal areas or industries.
Examples of sensitive personal data:
-	Special categories of personal data, such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, data concerning health or sex life or sexual orientation.
-	Personal data subject to professional secrecy
-	Personal data relating to criminal or administrative offenses
-	Personal data concerning insurances and bank or credit card accounts

**Type:** boolean<br/>
**Default Value**: `true`<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)
