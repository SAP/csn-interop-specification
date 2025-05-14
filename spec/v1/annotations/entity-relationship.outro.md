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

Entity Types represent "conceptual models" that underlie the (often denormalized) concrete API Models.
For a full description, see [ORD Entity Type](https://open-resource-discovery.github.io/specification/spec-v1/concepts/grouping-and-bundling#entity-type).

The ID scheme for an Entity Type ID is as following:

```xml
<entityTypeId> := <namespace>:<entityTypeLocalId>[:v<majorVersion>]
```

- Complete <entityTypeId> MUST match the regexp `^([a-z0-9-]+(?:[.][a-z0-9-]+)*):([a-zA-Z0-9._\-]+)(:(v0|v[1-9][0-9]*|))?$`

- The `<namespace>` MUST be a valid [ORD namespace](https://open-resource-discovery.github.io/specification/spec-v1/#namespaces).

- The `<entityTypeLocalId>` follows the ORD ID `<resourceName>` constraints:

  - MUST only contain ASCII letters (`a-z`, `A-Z`), digits (`0-9`) and the special characters `-`, `_` and `.`.
  - MUST be unique within the `<namespace>`.
  - SHOULD be a (somewhat) human readable and SEO/URL friendly string (avoid UUIDs).

- The `<majorVersion>` is optional. If provided MUST be a positive integer (prefixed with `v`)

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

- MUST match the regexp `^([a-z0-9-]+(?:[.][a-z0-9-]+)*):([a-zA-Z0-9._\-]+)(:(v0|v[1-9][0-9]*|))?$`
- The `<namespace>` MUST be a valid [ORD namespace](https://open-resource-discovery.github.io/specification/spec-v1/#namespaces).

- The `<propertyTypeLocalId>` follows the ORD ID `<resourceName>` constraints:

  - MUST only contain ASCII letters (`a-z`, `A-Z`), digits (`0-9`) and the special characters `-`, `_` and `.`.
  - MUST be unique within the `<namespace>`.
  - SHOULD be a (somewhat) human readable and SEO/URL friendly string (avoid UUIDs).

- The `<majorVersion>` is optional. If provided MUST be a positive integer (prefixed with `v`)

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
