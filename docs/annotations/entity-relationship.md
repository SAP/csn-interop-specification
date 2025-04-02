---
title: "@EntityRelationship"
sidebar_position: "6"
description: "@EntityRelationship annotations for cross boundary Entity-Relationship IDs and associations."
---

> <span className="feature-status-beta" >BETA</span> This annotation is in **beta state**. Please give feedback if the annotations are correct and sufficient.

## Introduction

Modern business application suites handle thousands of different types of business data and consist of many applications or services.
Business data is heavily interconnected and dynamically evolves over time.

It is not possible to put all data together into a single API covering all relations between data. On the contrary, many smaller APIs are easier to develop and maintain.
As a consequence, many relations between different types of data go across different APIs.
Additionally, the same type of data can be offered by different APIs, either in different API versions, technologies, or even hosted by different technical systems and providers.

Therefore, independent concepts for types of data (so called [entity types](#entity-type)) and for their identifiers (via so called [property types](#property-type)) are needed, which can be used for the flexible definition of references and relations across the local boundary.

Jump to [Concept Explanation](#concept-explanation) for more explanations.

## Schema Definitions

* This is an extension vocabulary for [CSN Interop Effective Document](../spec-v1/csn-interop-effective).
* The interface is available as JSON Schema: [entity-relationship.schema.json](https://sap.github.io/csn-interop-specification/spec-v1/entity-relationship.schema.json#).

### Annotations Overview

| Annotation | Scope | Description |
| -------- | ---- | ----------- |
| [@EntityRelationship.entityType](#entityrelationshipentitytype) | Entity | Defines which [Entity Type](#entity-type) the current data object represents.<br/><br/>There could be several data objects that are assigned to the same Entity Type.<br/>One data object can only have one Entity Type assigned, which corresponds to the applications own Entity Type definition. |
| [@EntityRelationship.propertyType](#entityrelationshippropertytype) | Type | Defines the logical [Property Type](#property-type) of a property.<br/>The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID. |
| [@EntityRelationship.entityIds](#entityrelationshipentityids) | Entity | Defines a list of IDs, which are available to look up the Entity Type or create a reference to it.<br/>An Entity Type can have multiple IDs:<br/>* There can be **alternative IDs** that can also be used to create a reference to the Entity Type<br/>* Some ID properties form a **composite ID** together and need to be combined to function as a unique ID for references<br/>* This is indicated by a [`propertyTypes`](#property-type) array with more than one Property Type ID entry. |
| [@EntityRelationship.reference](#entityrelationshipreference) | Type | Defines references to other Entity Types based on a single ID. |
| [@EntityRelationship.compositeReferences](#entityrelationshipcompositereferences) | Entity | Defines one or many references to other Entity Types based on a composite IDs. |
| [@EntityRelationship.temporalIds](#entityrelationshiptemporalids) | Entity | Defines a list of temporal IDs |
| [@EntityRelationship.temporalReferences](#entityrelationshiptemporalreferences) | Entity | Defines a list of temporal references |
| [@EntityRelationship.referencesWithConstantIds](#entityrelationshipreferenceswithconstantids) | Entity | Defines one or many references to other Entity Types based on a composite IDs where some properties of the references are constant values. |

### @EntityRelationship.entityType

Defines which [Entity Type](#entity-type) the current data object represents.

There could be several data objects that are assigned to the same Entity Type.
One data object can only have one Entity Type assigned, which corresponds to the applications own Entity Type definition.

**Type:** string<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)
###### Example Values:


```js
"sap.vdm.sont:BillOfMaterial"
```



### @EntityRelationship.propertyType

Defines the logical [Property Type](#property-type) of a property.
The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.

**Type:** string<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)
###### Example Values:


```js
"sap.vdm.gfn:BillOfMaterialUUID"
```



### @EntityRelationship.entityIds

Defines a list of IDs, which are available to look up the Entity Type or create a reference to it.
An Entity Type can have multiple IDs:
* There can be **alternative IDs** that can also be used to create a reference to the Entity Type
* Some ID properties form a **composite ID** together and need to be combined to function as a unique ID for references
* This is indicated by a [`propertyTypes`](#property-type) array with more than one Property Type ID entry.

**Type:** Array&lt;[Entity ID](#entity-id)&gt;<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @EntityRelationship.reference

Defines references to other Entity Types based on a single ID.

**Type:** Array&lt;[Reference Target](#reference-target)&gt;<br/>
**Scope:** Type<br/>
**Extending:** [BooleanType](../spec-v1/csn-interop-effective#boolean-type), [StringType](../spec-v1/csn-interop-effective#string-type), [LargeStringType](../spec-v1/csn-interop-effective#largestring-type), [IntegerType](../spec-v1/csn-interop-effective#integer-type), [Integer64Type](../spec-v1/csn-interop-effective#integer64-type), [DecimalType](../spec-v1/csn-interop-effective#decimal-type), [DoubleType](../spec-v1/csn-interop-effective#double-type), [DateType](../spec-v1/csn-interop-effective#date-type), [TimeType](../spec-v1/csn-interop-effective#time-type), [DateTimeType](../spec-v1/csn-interop-effective#datetime-type), [TimestampType](../spec-v1/csn-interop-effective#timestamp-type), [UUIDType](../spec-v1/csn-interop-effective#uuid-type), [AssociationType](../spec-v1/csn-interop-effective#association-type), [CompositionType](../spec-v1/csn-interop-effective#composition-type), [CustomType](../spec-v1/csn-interop-effective#custom-type), [TypeDefinition](../spec-v1/csn-interop-effective#type-definition), [BooleanTypeDefinition](../spec-v1/csn-interop-effective#boolean-type-definition), [StringTypeDefinition](../spec-v1/csn-interop-effective#string-type-definition), [LargeStringTypeDefinition](../spec-v1/csn-interop-effective#largestring-type-definition), [IntegerTypeDefinition](../spec-v1/csn-interop-effective#integer-type-definition), [Integer64TypeDefinition](../spec-v1/csn-interop-effective#integer64-type-definition), [DecimalTypeDefinition](../spec-v1/csn-interop-effective#decimal-type-definition), [DoubleTypeDefinition](../spec-v1/csn-interop-effective#double-type-definition), [DateTypeDefinition](../spec-v1/csn-interop-effective#date-type-definition), [TimeTypeDefinition](../spec-v1/csn-interop-effective#time-type-definition), [DateTimeTypeDefinition](../spec-v1/csn-interop-effective#datetime-type-definition), [TimestampTypeDefinition](../spec-v1/csn-interop-effective#timestamp-type-definition), [UUIDTypeDefinition](../spec-v1/csn-interop-effective#uuid-type-definition), [AssociationTypeDefinition](../spec-v1/csn-interop-effective#association-type-definition), [CompositionTypeDefinition](../spec-v1/csn-interop-effective#composition-type-definition)

### @EntityRelationship.compositeReferences

Defines one or many references to other Entity Types based on a composite IDs.

**Type:** Array&lt;[Composite Reference](#composite-reference)&gt;<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @EntityRelationship.temporalIds

Defines a list of temporal IDs

**Type:** Array&lt;[Temporal ID](#temporal-id)&gt;<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @EntityRelationship.temporalReferences

Defines a list of temporal references

**Type:** Array&lt;[Temporal Reference](#temporal-reference)&gt;<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### @EntityRelationship.referencesWithConstantIds

Defines one or many references to other Entity Types based on a composite IDs where some properties of the references are constant values.

**Type:** Array&lt;[Reference with Constant ID](#reference-with-constant-id)&gt;<br/>
**Scope:** Entity<br/>
**Extending:** [EntityDefinition](../spec-v1/csn-interop-effective#entity-definition)

### Reference Target

Defines a reference to another Entity Type based on a single ID.

**Type**: Object(<a href="#reference-target_name">name</a>, <a href="#reference-target_referencedentitytype">referencedEntityType</a>, <a href="#reference-target_referencedpropertytype">referencedPropertyType</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="reference-target_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#reference-target_name" title="@EntityRelationship.ReferenceTarget.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the reference.</div>|
|<div className="interface-property-name anchor" id="reference-target_referencedentitytype">referencedEntityType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#reference-target_referencedentitytype" title="@EntityRelationship.ReferenceTarget.referencedEntityType"></a></div>|<div className="interface-property-type">[Entity Type ID](#entity-type-id)</div>|<div className="interface-property-description">ID of the [Entity Type](#entity-type).</div>|
|<div className="interface-property-name anchor" id="reference-target_referencedpropertytype">referencedPropertyType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#reference-target_referencedpropertytype" title="@EntityRelationship.ReferenceTarget.referencedPropertyType"></a></div>|<div className="interface-property-type">[Property Type ID](#property-type-id)</div>|<div className="interface-property-description">ID of the [Property Type](#property-type). The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.</div>|


### Entity ID

Defines an ID that can be used to look up the Entity Type or create a reference to it.

**Type**: Object(<a href="#entity-id_name">name</a>, <a href="#entity-id_description">description</a>, <a href="#entity-id_propertytypes">propertyTypes</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="entity-id_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#entity-id_name" title="@EntityRelationship.EntityId.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the ID.</div>|
|<div className="interface-property-name anchor" id="entity-id_description">description<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#entity-id_description" title="@EntityRelationship.EntityId.description"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional description to describe the semantics of the ID.</div>|
|<div className="interface-property-name anchor" id="entity-id_propertytypes">propertyTypes<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#entity-id_propertytypes" title="@EntityRelationship.EntityId.propertyTypes"></a></div>|<div className="interface-property-type">Array&lt;[Property Type ID](#property-type-id)&gt;</div>|<div className="interface-property-description">List of [Property Type](#property-type) IDs.</div>|


### Composite Reference

Defines single a reference to another Entity Type based on a composite ID.

**Type**: Object(<a href="#composite-reference_name">name</a>, <a href="#composite-reference_referencedentitytype">referencedEntityType</a>, <a href="#composite-reference_referencedpropertytypes">referencedPropertyTypes</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="composite-reference_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#composite-reference_name" title="@EntityRelationship.CompositeReference.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the reference.</div>|
|<div className="interface-property-name anchor" id="composite-reference_referencedentitytype">referencedEntityType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#composite-reference_referencedentitytype" title="@EntityRelationship.CompositeReference.referencedEntityType"></a></div>|<div className="interface-property-type">[Entity Type ID](#entity-type-id)</div>|<div className="interface-property-description">ID of the [Entity Type](#entity-type).</div>|
|<div className="interface-property-name anchor" id="composite-reference_referencedpropertytypes">referencedPropertyTypes<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#composite-reference_referencedpropertytypes" title="@EntityRelationship.CompositeReference.referencedPropertyTypes"></a></div>|<div className="interface-property-type">Array&lt;[Referenced Property Type](#referenced-property-type)&gt;</div>|<div className="interface-property-description">List of properties, the composite ID consists of.</div>|


### Referenced Property Type

Grouping of the ID in the referenced entity, by its property type ID and the local name in this entity.

**Type**: Object(<a href="#referenced-property-type_referencedpropertytype">referencedPropertyType</a>, <a href="#referenced-property-type_localpropertyname">localPropertyName</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="referenced-property-type_referencedpropertytype">referencedPropertyType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#referenced-property-type_referencedpropertytype" title="@EntityRelationship.ReferenceTargetdPropertyType.referencedPropertyType"></a></div>|<div className="interface-property-type">[Property Type ID](#property-type-id)</div>|<div className="interface-property-description">ID of the [Property Type](#property-type). The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.</div>|
|<div className="interface-property-name anchor" id="referenced-property-type_localpropertyname">localPropertyName<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#referenced-property-type_localpropertyname" title="@EntityRelationship.ReferenceTargetdPropertyType.localPropertyName"></a></div>|<div className="interface-property-type">[Local Property Name](#local-property-name)</div>|<div className="interface-property-description">Name of the property in the local Entity Type</div>|


### Temporal ID

Defines an ID that includes a temporal interval.

**Type**: Object(<a href="#temporal-id_name">name</a>, <a href="#temporal-id_description">description</a>, <a href="#temporal-id_propertytypes">propertyTypes</a>, <a href="#temporal-id_temporalintervaltype">temporalIntervalType</a>, <a href="#temporal-id_temporaltype">temporalType</a>, <a href="#temporal-id_temporalintervalstartproperty">temporalIntervalStartProperty</a>, <a href="#temporal-id_temporalintervalendproperty">temporalIntervalEndProperty</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="temporal-id_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#temporal-id_name" title="@EntityRelationship.TemporalId.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the ID.</div>|
|<div className="interface-property-name anchor" id="temporal-id_description">description<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#temporal-id_description" title="@EntityRelationship.TemporalId.description"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional description to describe the semantics of the ID.</div>|
|<div className="interface-property-name anchor" id="temporal-id_propertytypes">propertyTypes<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-id_propertytypes" title="@EntityRelationship.TemporalId.propertyTypes"></a></div>|<div className="interface-property-type">Array&lt;[Property Type ID](#property-type-id)&gt;</div>|<div className="interface-property-description">List of [Property Type](#property-type) IDs that are non-temporal.</div>|
|<div className="interface-property-name anchor" id="temporal-id_temporalintervaltype">temporalIntervalType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-id_temporalintervaltype" title="@EntityRelationship.TemporalId.temporalIntervalType"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Interval which includes the boundaries.<hr/>**Allowed Values**: <ul><li><p>`"CLOSED_CLOSED"`</p></li><li><p>`"OPEN_OPEN"`</p></li><li><p>`"OPEN_CLOSED"`</p></li><li><p>`"CLOSED_OPEN"`</p></li></ul><br/>**Example Values**: <ul className="examples"><li>`"CLOSED_CLOSED"`</li></ul></div>|
|<div className="interface-property-name anchor" id="temporal-id_temporaltype">temporalType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-id_temporaltype" title="@EntityRelationship.TemporalId.temporalType"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Temporal type.<hr/>**Allowed Values**: <ul><li><p>`"DATE"`</p></li><li><p>`"DATETIME"`</p></li></ul><br/>**Example Values**: <ul className="examples"><li>`"DATE"`</li></ul></div>|
|<div className="interface-property-name anchor" id="temporal-id_temporalintervalstartproperty">temporalIntervalStartProperty<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-id_temporalintervalstartproperty" title="@EntityRelationship.TemporalId.temporalIntervalStartProperty"></a></div>|<div className="interface-property-type">[Local Property Name](#local-property-name)</div>|<div className="interface-property-description">Property in the local entity that is used to define the start of the interval.</div>|
|<div className="interface-property-name anchor" id="temporal-id_temporalintervalendproperty">temporalIntervalEndProperty<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-id_temporalintervalendproperty" title="@EntityRelationship.TemporalId.temporalIntervalEndProperty"></a></div>|<div className="interface-property-type">[Local Property Name](#local-property-name)</div>|<div className="interface-property-description">Property in the local entity that is used to define the end of the interval.</div>|


### Temporal Reference

Defines single temporal reference to another Entity Type.

**Type**: Object(<a href="#temporal-reference_name">name</a>, <a href="#temporal-reference_referencedentitytype">referencedEntityType</a>, <a href="#temporal-reference_referencedpropertytypes">referencedPropertyTypes</a>, <a href="#temporal-reference_category">category</a>, <a href="#temporal-reference_selectiondateproperty">selectionDateProperty</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="temporal-reference_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#temporal-reference_name" title="@EntityRelationship.TemporalReference.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the reference.</div>|
|<div className="interface-property-name anchor" id="temporal-reference_referencedentitytype">referencedEntityType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-reference_referencedentitytype" title="@EntityRelationship.TemporalReference.referencedEntityType"></a></div>|<div className="interface-property-type">[Entity Type ID](#entity-type-id)</div>|<div className="interface-property-description">ID of the [Entity Type](#entity-type).</div>|
|<div className="interface-property-name anchor" id="temporal-reference_referencedpropertytypes">referencedPropertyTypes<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-reference_referencedpropertytypes" title="@EntityRelationship.TemporalReference.referencedPropertyTypes"></a></div>|<div className="interface-property-type">Array&lt;[Referenced Property Type](#referenced-property-type)&gt;</div>|<div className="interface-property-description">List of non-temporal properties the composite temporal ID consists of.</div>|
|<div className="interface-property-name anchor" id="temporal-reference_category">category<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-reference_category" title="@EntityRelationship.TemporalReference.category"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Category of the temporal reference.<hr/>**Allowed Values**: <ul><li><p>`"TEMPORAL_DATE"`</p></li></ul><br/>**Example Values**: <ul className="examples"><li>`"TEMPORAL_DATE"`</li></ul></div>|
|<div className="interface-property-name anchor" id="temporal-reference_selectiondateproperty">selectionDateProperty<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#temporal-reference_selectiondateproperty" title="@EntityRelationship.TemporalReference.selectionDateProperty"></a></div>|<div className="interface-property-type">[Local Property Name](#local-property-name)</div>|<div className="interface-property-description">Property in the local entity that is used to select the right date interval.</div>|


### Reference with Constant ID

Defines single a reference to another Entity Type based on a composite ID.

**Type**: Object(<a href="#reference-with-constant-id_name">name</a>, <a href="#reference-with-constant-id_description">description</a>, <a href="#reference-with-constant-id_referencedentitytype">referencedEntityType</a>, <a href="#reference-with-constant-id_referencedpropertytypes">referencedPropertyTypes</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="reference-with-constant-id_name">name<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#reference-with-constant-id_name" title="@EntityRelationship.ReferenceTargetWithConstantId.name"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional name to describe the semantics of the reference.</div>|
|<div className="interface-property-name anchor" id="reference-with-constant-id_description">description<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#reference-with-constant-id_description" title="@EntityRelationship.ReferenceTargetWithConstantId.description"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">Optional description to describe the semantics of the reference.</div>|
|<div className="interface-property-name anchor" id="reference-with-constant-id_referencedentitytype">referencedEntityType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#reference-with-constant-id_referencedentitytype" title="@EntityRelationship.ReferenceTargetWithConstantId.referencedEntityType"></a></div>|<div className="interface-property-type">[Entity Type ID](#entity-type-id)</div>|<div className="interface-property-description">ID of the [Entity Type](#entity-type).</div>|
|<div className="interface-property-name anchor" id="reference-with-constant-id_referencedpropertytypes">referencedPropertyTypes<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#reference-with-constant-id_referencedpropertytypes" title="@EntityRelationship.ReferenceTargetWithConstantId.referencedPropertyTypes"></a></div>|<div className="interface-property-type">Array&lt;[Referenced Property Type with Constant ID](#referenced-property-type-with-constant-id)&gt;</div>|<div className="interface-property-description">List of properties, the composite ID consists of.</div>|


### Referenced Property Type with Constant ID

Grouping  of the ID in the referenced entity, by its property type ID and either the local name in this entity or a constant value.

**Type**: Object(<a href="#referenced-property-type-with-constant-id_referencedpropertytype">referencedPropertyType</a>, <a href="#referenced-property-type-with-constant-id_localpropertyname">localPropertyName</a>, <a href="#referenced-property-type-with-constant-id_constantvalue">constantValue</a>)

| Property | Type | Description |
| -------- | ---- | ----------- |
|<div className="interface-property-name anchor" id="referenced-property-type-with-constant-id_referencedpropertytype">referencedPropertyType<br/><span className="mandatory">MANDATORY</span><a className="hash-link" href="#referenced-property-type-with-constant-id_referencedpropertytype" title="@EntityRelationship.ReferenceTargetPropertyTypeWithConstantId.referencedPropertyType"></a></div>|<div className="interface-property-type">[Property Type ID](#property-type-id)</div>|<div className="interface-property-description">ID of the [Property Type](#property-type). The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.</div>|
|<div className="interface-property-name anchor" id="referenced-property-type-with-constant-id_localpropertyname">localPropertyName<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#referenced-property-type-with-constant-id_localpropertyname" title="@EntityRelationship.ReferenceTargetPropertyTypeWithConstantId.localPropertyName"></a></div>|<div className="interface-property-type">[Local Property Name](#local-property-name)</div>|<div className="interface-property-description">Name of the property in the local Entity Type</div>|
|<div className="interface-property-name anchor" id="referenced-property-type-with-constant-id_constantvalue">constantValue<br/><span className="optional">OPTIONAL</span><a className="hash-link" href="#referenced-property-type-with-constant-id_constantvalue" title="@EntityRelationship.ReferenceTargetPropertyTypeWithConstantId.constantValue"></a></div>|<div className="interface-property-type">string</div>|<div className="interface-property-description">String serialization of the constant value of the property in the referenced entity.</div>|


### Property Type ID

ID of the [Property Type](#property-type). The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.

**Type:** string

###### Example Values:


```js
"sap.vdm.gfn:BillOfMaterialUUID"
```



### Entity Type ID

ID of the [Entity Type](#entity-type).

**Type:** string

###### Example Values:


```js
"sap.vdm.sont:BillOfMaterial"
```



### Local Property Name

Name of the property in the local Entity Type

**Type:** string


## Complete Examples


```js
{
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": {
    "BusinessPartner": {
      "kind": "entity",
      "@EntityRelationship.entityType": "sap.vdm.sont:BusinessPartner",
      "@EntityRelationship.entityIds": [
        {
          "name": "Semantic ID (composite ID)",
          "propertyTypes": [
            "sap.vdm.gfn:BusinessPartnerNumber",
            "sap.vdm.gfn:BusinessPartnerType"
          ]
        },
        {
          "name": "UUID (single property ID)",
          "propertyTypes": [
            "sap.vdm.gfn:BusinessPartnerUUID"
          ]
        }
      ],
      "elements": {
        "number": {
          "@EntityRelationship.propertyType": "sap.vdm.gfn:BusinessPartnerNumber",
          "key": true,
          "type": "cds.Integer"
        },
        "type": {
          "@EntityRelationship.propertyType": "sap.vdm.gfn:BusinessPartnerType",
          "key": true,
          "type": "cds.String"
        },
        "uuid": {
          "@EntityRelationship.propertyType": "sap.vdm.gfn:BusinessPartnerUUID",
          "type": "cds.UUID"
        }
      }
    }
  }
}
```


```js
{
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": {
    "PurchaseOrder": {
      "kind": "entity",
      "@EntityRelationship.compositeReferences": [
        {
          "name": "Main Supplier",
          "referencedPropertyTypes": [
            {
              "referencedPropertyType": "sap.vdm.gfn:BusinessPartnerNumber",
              "localPropertyName": "mainSupplierNumber"
            },
            {
              "referencedPropertyType": "sap.vdm.gfn:BusinessPartnerType",
              "localPropertyName": "mainSupplierType"
            }
          ]
        }
      ],
      "elements": {
        "mainSupplierNumber": {
          "type": "cds.Integer"
        },
        "mainSupplierType": {
          "@EntityRelationship.propertyType": "sap.vdm.gfn:BusinessPartnerType",
          "type": "cds.String"
        },
        "alternativeSupplierUUID": {
          "@EntityRelationship.reference": [
            {
              "referencedEntityType": "sap.vdm.sont:BusinessPartner",
              "referencedPropertyType": "sap.vdm.gfn:BusinessPartnerUUID"
            }
          ],
          "type": "cds.UUID"
        }
      }
    }
  }
}
```

## Concept Explanation

The purpose of `@EntityRelationship` annotations is to document the Entity Relationship model that goes beyond CSN native associations.
With the annotations its possible to describe "dangling references" and associations to entities outside of the current API / data model context including those provided by different products and technology stacks.

### Problem Statement

While CSN can express associations and references with the same CSN document, we also need to describe:

- References across documents / APIs
- References across different API versions and Protocols
- References across different tenants
- References across different types of applications / services
- "Weak" References, where the target may or may not yet be available for joining data

As a consequence, the Entity Relationship annotation concept is built on the following design decisions:

- Reference pointers must not rely on physical API model structure, e.g. property names or document structure.
- Instead we introduce the more abstract and decoupled [Entity Types](#entity-type) and [Property Types](#property-type).
- IDs for Entity Types and Property Types are namespaced, so they are globally unique and conflict free for references across boundaries

### Out of Scope

- The annotations only express references that target unique IDs.
  - This concept is not meant to replace a more complex query model how data can be joined together in various (often more complex) conditions. E.g., some properties can act as a selector for filter conditions / query conditions that return multiple values.
    They could be seen as a special case of association and are always "to many" associations. We don't cover them in this concept here, because they don't contain actual unique IDs to instance data. Instead they describe filter values that may even require more complex query conditions in advanced use cases. This also includes `SELECT *` cases, where the reference value is actually a wildcard / select all. Such references without uniques are not in scope of this concept.
- The annotations just express the local/application specific ER model.
  - They are no substitute for globally aligned annotations like ODM or semantic vocabularies, which can be added as complementary on top.

### Glossary

- **Entity Type**: An entity type represents a conceptual entity on type-level / class-level. It's conceptual, because the same entity type can have multiple different physical models / representations.
- **Property Type**: A Property Type is a logical ID for a property, so we can reference it without relying on property names or structure of the API data model. Property Types may be used as unique IDs in itself or be part of a composite ID, which can be used to identify instance data of an entity type.
- **Composite ID**: An ID consisting of several properties that only together form a unique ID. Aka Compound ID.
- **Reference**: A reference is an association from one entity type to another. A reference consists of one or multiple properties that follow the Property Types of the target entity type.

### ID Concepts

#### Entity Type

Entity Types represent "conceptual models" that underlie the often very denormalized, concrete API Models.
For a full description, see [ORD Entity Type](https://sap.github.io/open-resource-discovery/details/articles/grouping-and-bundling#entity-type).

The ID scheme for an Entity Type ID is as following:

```xml
<entityTypeId> := <namespace>:<entityTypeLocalId>[:v<majorVersion>]
```

For the mandatory namespaces we use the [Namespace Concept](https://sap.github.io/open-resource-discovery/spec-v1/#namespaces) of ORD.
In many cases Entity Types are not versioned. To ease handling and avoiding ambiguity, we forbid adding `v1` and therefore made `v1` the default.
If for the case of having a `v2` or higher of an Entity Type, the version must be added.

Ideally the application specific Entity Types are described as ORD Entity Types, so we have at least a globally unique ORD ID and the title for it available.
Then it’s clear what Entity Type ID others should use for cross application references.
With the outlined pattern, we can convert an Entity Type ID to a globally unique [ORD ID](https://sap.github.io/open-resource-discovery/spec-v1/#ord-id) and vice versa:

```xml
<ordId> := <namespace>:entityType:<entityTypeLocalId>:v<majorVersion>
```

#### Property Type

An Entity Type and its API models may have multiple IDs that can be used to create references to it.
Usually there is a primary ID (which may be also the primary key in the database) and optionally multiple alternative IDs / keys.
Primary or alternative IDs may be a composite ID and consist of multiple property values that only together form a unique ID.

To point out, which properties are used to hold an ID, we introduce Property Types.
A Property Type is independent from the actual API / data structure, e.g. the property names.
The same property type can therefore be reused in multiple entity types in different APIs, even with different property names and structural differences.

A [Property Type ID](#property-type-id) follows the same format and considerations as the Entity Type ID explained above:

```xml
<PropertyTypeId> := <namespace>:<propertyTypeLocalId>[:v<majorVersion>]
```

The same Property Type MUST NOT be defined more than once in the same Entity Type.
However, the same Property Type MAY be part of multiple references within the same Entity Type.

For describing references, it is sufficient to only annotate `@EntityRelationship.propertyType` on properties that are used as IDs (by itself, or by being part of a composite ID).

> 🙋 Why do we not just use the property name where we'll find the ID?
> The reason is that ID properties can get renamed, ID schemes get changed or the structure of an API changes.
> All of that are incompatible API changes, but the goal of this reference concept is to work agnostic of API versions and even different API protocols.
> With the Property Type concept, we define the references purely on a conceptual level and are not coupled to the actual API / JSON structure and stable property names.

> 🔭 We _may_ consider describing the IDs of Entity Types (and their property-types) on ORD level as well, attached to an ORD Entity Type.
> This would be optional and for the ID / Reference concept to work it is only important that the Entity Type and Property Type IDs are used consistently and conflict-free within their namespace.

### Standard Use Cases

#### Declaring Single Property IDs

The following example shows a single ID in '@EntityRelationship.entityIds' that can be used to identify the Entity Type. It consists of a single property (`ObjectID`), identified through its [Property Type ID](#property-type) `sap.vdm.gfn:BillOfMaterialObjectID`.

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:BillOfMaterial'
@EntityRelationship.entityIds : [{
  name: 'optional name for ID'
  propertyTypes: ['sap.vdm.gfn:BillOfMaterialObjectID']
}]
entity BillOfMaterial {
  @EntityRelationship.propertyType : 'sap.vdm.gfn:BillOfMaterialObjectID'
  key ObjectID : String;
}
```

#### Declaring Composite IDs

In case of composite IDs, the same concept is used, with the difference that `propertyTypes` has more than one value.

In the following example, the annotation is used to indicate which Property Types (`sap.vdm.gfn:BusinessPartnerNumber` and `sap.vdm.gfn:BusinessPartnerType`) of the Entity Type (`sap.vdm.sont:BusinessPartner`) form a composite ID together:

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:BusinessPartner'
@EntityRelationship.entityIds : [{
  name: 'Semantic ID'
  propertyTypes: ['sap.vdm.gfn:BusinessPartnerNumber', 'sap.vdm.gfn:BusinessPartnerType']
},{
  name: 'UUID'
  propertyTypes: ['sap.vdm.gfn:BusinessPartnerUUID']
}]
entity BusinessPartner {
  @EntityRelationship.propertyType : 'sap.vdm.gfn:BusinessPartnerNumber'
  key number : Integer;
  @EntityRelationship.propertyType : 'sap.vdm.gfn:BusinessPartnerType'
  key type : String;
  @EntityRelationship.propertyType : 'sap.vdm.gfn:BusinessPartnerUUID'
  uuid : UUID;
}
```

It is also possible that the same Property Type is part of multiple (composite) IDs.
For example, a person can be identified by either `country` and `driversLicenseNumber` or `country` and `socialSecurityNumber`.
There is no guarantee that drivers license numbers or social security numbers are unique across countries.

#### Referencing single IDs

For **simple references to single property IDs** we need to state the target Entity Type and the Property Type of the target property that is used as the unique ID.

The `referencedEntityType` and `referencedPropertyType` together ensure that the reference:

- States what Entity Type is the target of the reference / association.
- Which Property Type of the target Entity Type is used as an ID value in the reference.

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:BillOfMaterial'
@EntityRelationship.entityIds : [{
  //...
}]
entity BillOfMaterial {
  //...
  @EntityRelationship.reference[{
    referencedEntityType: 'sap.vdm.sont:Plant',
    referencedPropertyType: 'sap.vdm.gfn:PlantObjectID'
  }]
  Plant : String
}
```

With the given information, we can look for a `sap.vdm.sont:Plant` Entity Type (e.g. in different APIs) and see if it has the Property Type `sap.vdm.gfn:PlantObjectID` in its list of IDs (`@EntityRelationship.entityIds`).
If this is given, we can merge / join / lookup the information with the reference value (ID) given in the property.

The annotation is an array because there could be multiple Entity Types that are valid targets for the reference.
If an array is given, all of the reference targets MUST be valid places where the ID can be resolved, at least in a certain implementation or version of the target entity.
This also allows for references to polymorphic targets that share the same Property Type as an ID (e.g. a reference to either Cat or Dog, sharing the same Pet ID).

> 🚧 Consideration: Provide optional attribute to state that a reference has a "composition" quality, in case that the API Model itself doesn't imply that already.
> This would help to know which entity type instances should be deleted if their parent is deleted and is usually also an indicator for transactional integrity.

#### Referencing Composite IDs

When we have references that use a composite ID that consists of several Property Types, we also need to indicate their grouping.
We do this by introducing a new annotation `@EntityRelationship.compositeReferences`.
Each entry indicates that there is a reference to another entity, using a composite ID.

The grouping into a composite reference is based on the semantics of the referring model, as there can be multiple references to the same composite ID.

When pointing to the Property Types of the target Entity Type (`referencedPropertyType`), we need to define how it maps to the local properties (`localPropertyName`).

The following example shows how the Entity Type `PurchaseOrder` has a composite ID reference (consisting of `mainSupplierNumber` and `mainSupplierType`) to a `BusinessPartner` Entity Type.

The composite ID indicates the semantics / grouping of the reference from the _referrals_ perspective, not the reference targets perspective (!).
There can be multiple references that use the same Composite ID but with different semantics.
The [`compositeReferences`](#composite-reference) in the example states that the first two composite ID references point to the `mainSupplier`.
The next composite ID reference points to the same Entity Type and Property Type, but is part of a different composite reference, "Alternative Supplier".

A property can be potentially part of several composite references.

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:PurchaseOrder'
@EntityRelationship.compositeReferences : [{
  //one composite reference
  name: 'Main Supplier',
  referencedEntityType: 'sap.vdm.sont:BusinessPartner'
  referencedPropertyTypes: [{
    referencedPropertyType: 'sap.vdm.gfn:BusinessPartnerNumber',
    localPropertyName: 'mainSupplierNumber'
  },{
    referencedPropertyType: 'sap.vdm.gfn:BusinessPartnerType',
    localPropertyName: 'mainSupplierType'
  }]
},{
  // This demonstrates why the composite reference is necessary
  // and is defined with the semantics from the referencing side.
  name: 'Alternative Supplier',
  referencedEntityType: 'sap.vdm.sont:BusinessPartner'
  referencedPropertyTypes: [{
    referencedPropertyType: 'sap.vdm.gfn:BusinessPartnerNumber',
    localPropertyName: 'alternativeSupplierNumber'
  },{
    referencedPropertyType: 'sap.vdm.gfn:BusinessPartnerType',
    localPropertyName: 'alternativeSupplierType'
  }]
}]
entity PurchaseOrder {
  //...
  Plant : String;
  mainSupplierNumber : Integer;
  mainSupplierType : String;
  alternativeSupplierNumber : Integer;
  alternativeSupplierType : String;
}
```

### Advanced Cases

All the annotations in this section are **optional** for providers and consumers to implement or understand.

As a consequence:

- All advanced functionality MUST be purely "opt-in" and must not break consumers that do not support it
- If references or IDs need special understanding, we cannot use the standard annotations but need to move to specialized annotations.
- If a consumer does not understand special-case IDs or References, they may therefore treat them as arbitrary properties.
- We may also propose alternative approaches, so special handling attributes can be avoided.

> ⚠ In general, we recommend to not rely on advanced features if avoidable. If possible, we give guidance how to avoid special handling.

#### Time Dependent References

There can be references which include a time / date component, where the targeted entity type may return different values / state, depending on time.
As a consequence it's important for references to indicate which state in time they refer to.

This situation can be handled with the existing concepts as composite IDs.

In the example below, we have a Cost Center, where its instance data defines a validity range for the values through `ValidityStartDate` and `ValidityEndDate`.
For the Composite ID, we however need the `sap.vdm.gfn:ControllingArea` and `sap.vdm.gfn:CostCenter` Property Types plus a "virtual" property `KeyDate` that only exists on the API Model.
Those three together can be used to create a unique reference that also states the point in time.

> 🔗 There is also an [OData Extension for Temporal Data](https://docs.oasis-open.org/odata/odata-temporal-ext/v4.0/cs01/odata-temporal-ext-v4.0-cs01.html).

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:CostCenter'
@EntityRelationship.entityIds : [{
  name: 'ID for Point in Time'
  propertyTypes: ["sap.vdm.gfn:ControllingArea", "sap.vdm.gfn:CostCenter", "sap.vdm.gfn:KeyDate"]
},{
  name: 'Time-independent ID (not unique)'
  propertyTypes: ["sap.vdm.gfn:ControllingArea", "sap.vdm.gfn:CostCenter"]
}]
entity CostCenter {
  @EntityRelationship.propertyType : 'sap.vdm.gfn:ControllingArea'
  ControllingArea: String; // ControllingArea is also a reference to entity ControllingArea, but this is not shown here
  @EntityRelationship.propertyType : 'sap.vdm.gfn:CostCenter'
  CostCenter : String;
  @EntityRelationship.propertyType : 'sap.vdm.gfn:KeyDate'
  KeyDate : Date;  // This is a virtual property, only there in an API model to indicate the point in time for the reference.

  ValidityStartDate: Date; // Not an ID, but can be set with create / update
  ValidityEndDate: Date;
  //...
}
```

Example how this is used in a time dependent reference from `SalesOrder`:

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:SalesOrder'
@EntityRelationship.compositeReferences : [{
  name: 'Time Dependent Reference to CostCenter',
  referencedEntityType: 'sap.vdm.sont:CostCenter'
  referencedPropertyTypes: [{
    referencedPropertyType: 'sap.vdm.gfn:ControllingArea',
    localPropertyName: 'ControllingArea'
  },{
    referencedPropertyType: 'sap.vdm.gfn:CostCenter',
    localPropertyName: 'CostCenter'
  },{
    referencedPropertyType: 'sap.vdm.gfn:KeyDate',
    localPropertyName: 'SalesOrderDate'
  }]
}]
entity SalesOrder {
  //...
  ControllingArea : String;
  CostCenter : String;
  SalesOrderDate : Date;
}
```

#### Special Support for more involved Temporal References

For more complex scenarios, we need to understand the nature of temporal data along with the references.
In the example below, the `ValidityStartDate` and `ValidityEndDate` need to be understood, as the client has to do a more complex query with filter conditions to get the data at a specific time.
That's because there is no convenience "key date" or "$at" property in the data / API model that can be used for a more simple composite ID reference lookup.

Temporal IDs can be explicitly described via `@EntityRelationship.temporalIds`:

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:CostCenter'
@EntityRelationship.temporalIds : [{ // all temporal IDs at a central place
  name: 'temporalId' // optional
  propertyTypes: ["sap.vdm.gfn:ControllingArea", "sap.vdm.gfn:CostCenter"] // non-temporal
  temporalIntervalType: "CLOSED_CLOSED",  // interval which includes the boundaries
  temporalType:  "DATE", // date or date-time interval
  temporalIntervalStartProperty: "ValidityStartDate",   // not needed by reference, therefore no property-type necessary
  temporalIntervalEndProperty: "ValidityEndDate"
}]
entity CostCenter {
  @EntityRelationship.propertyType : 'sap.vdm.gfn:ControllingArea'
  ControllingArea: String; // ControllingArea is also a reference to entity ControllingArea, but this is not shown here
  @EntityRelationship.propertyType : 'sap.vdm.gfn:CostCenter'
  CostCenter : String;

  ValidityStartDate: Date;
  ValidityEndDate: Date; // ValidityEndDate is not suited for references from foreign entities, do not expose the internal primary key

  //...
}
```

A temporal ID can be referenced via `@EntityRelationship.temporalReferences`:

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:SalesOrder'
@EntityRelationship.temporalReferences : [{
  name: 'Temporal Reference to CostCenter',
  referencedEntityType: 'sap.vdm.sont:CostCenter'
  referencedPropertyTypes: [{ // reference-specific assignment to property-types, could include constants
    referencedPropertyType: 'sap.vdm.gfn:ControllingArea',
    localPropertyName: 'ControllingArea'
  },{
    referencedPropertyType: 'sap.vdm.gfn:CostCenter',
    localPropertyName: 'CostCenter'
  }],
  category: "temporal-date",               // reference is to a temporal ID of category date
  selectionDateProperty: "SalesOrderDate"  // property used to select the right date interval
}]
entity SalesOrder {
  //...
  ControllingArea : String;
  CostCenter : String;
  SalesOrderDate : Date;
}
// a join or select condition derived from the temporal reference would use an additional condition:
//      AND CostCenter.ValidityStartDate <= SalesOrder.SalesOrderDate
//      AND CostCenter.ValidityEndDate   >= SalesOrder.SalesOrderDate
```

#### References with Constant ID Values

In this special case we have references where some additional IDs need to be set to a constant value to get to a unique ID reference.
It could also be understood as a composite ID where some of the required IDs (that may act as filters) are not available as reference properties, but we know from the metadata that we need to set them to a static value at the target Entity Type.

##### Solution A: Add constant ID values as explicit properties

One approach to address this situation is to just introduce the missing constant ID values as new properties in the entity type that holds the reference.
We can define such a value in CSN as [value](https://cap.cloud.sap/docs/cds/csn#properties-1)
The advantage is that we have then a regular composite ID reference, which we can handle without creating a new edge-case that needs special support.
The disadvantage is that we have to add new properties and instance data to our APIs.

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:CostingSheet '
@EntityRelationship.compositeReferences : [{
  referencedEntityType: 'sap.vdm.sont:CostingSheetProcedure'
  referencedPropertyTypes: [{
    referencedPropertyType: 'sap.vdm.gfn:CostingSheetProcedure',
    localPropertyName: 'costingSheetProcedure'
  },{
    referencedPropertyType: 'sap.vdm.gfn:ConditionUsage',
    localPropertyName: 'costingSheetProcedureConditionUsage'
  },{
    referencedPropertyType: 'sap.vdm.gfn:ConditionApplication',
    localPropertyName: 'costingSheetProcedureConditionApplication'
  }]
}]
entity CostingSheet  {
  //...
  costingSheetProcedure : String;
  costingSheetProcedureConditionUsage : String = 'K';
  costingSheetProcedureConditionApplication : String = 'KS';
}
```

##### Solution B: State constant ID composite keys explicitly

Since this is a very special edge-case we did not want to introduce additional complexity to our regular cases.
We also don't want consumers who don't understand and support constant ID values to accidentally interpret incomplete composite ID references.

As a consequence, we'll not use the `@EntityRelationship.references` annotation, but introduce a dedicated `@EntityRelationship.referencesWithConstantIds`.
It can describe a reference that includes constant ID values and also may consist of a composite ID of more than one property.

```javascript
@EntityRelationship.entityType : 'sap.vdm.sont:CostingSheet '
@EntityRelationship.referencesWithConstantIds : [{
  description: 'optional description'
  referencedEntityType: 'sap.vdm.sont:CostingSheetProcedure'
  referencedPropertyTypes: [{
    referencedPropertyType: 'sap.vdm.gfn:CostingSheetProcedureId',
    localPropertyName: 'costingSheetProcedure'
  },{
    referencedPropertyType: 'sap.vdm.gfn:ConditionUsage',
    constantValue: 'K'
  },{
    referencedPropertyType: 'sap.vdm.gfn:ConditionApplication',
    constantValue: 'KS'
  }]
}]
entity CostingSheet  {
  //...
  costingSheetProcedure : String;
}
```

In this example the `costingSheetProcedure` property links to a `sap.vdm.gfn:CostingSheetProcedureId` Property Type, but by that alone the ID reference is not complete.
In the target, there are three Property Types that form a unique composite ID together.
The Property Types `sap.vdm.gfn:ConditionUsage` and `sap.vdm.gfn:ConditionApplication` are missing.
Since they always need to be set to a specific static value, we can indicate this on metadata level with `constantValue`.

#### Concatenated IDs or References

Some composite IDs or references are not available as separate properties, but concatenated together into a single string.

We recommend two approaches:

- Treat it as a dedicated (opaque) ID with its own Property Type, which may be used as any other ID without understanding (and parsing) its inner structure.
- Alternatively, split a concatenated ID / Reference into separate properties with their own Property Type. This can then be handled as regular composite IDs and references.