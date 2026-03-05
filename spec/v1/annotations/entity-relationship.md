> <span className="feature-status-beta" >BETA</span> This annotation is in **beta state**. Please give feedback if the annotations are correct and sufficient.

## Introduction

The `@EntityRelationship` vocabulary lets you:

1. **Link data objects to domain concepts**: Annotate your API entities with their corresponding Entity Type and Property Type IDs, so consumers know what business concept the data represents.
2. **Declare IDs**: Specify which properties (single or composite) uniquely identify an entity.
3. **Define cross-boundary references**: Create associations that work across different APIs, products, or systems - without relying on physical property names or API structure.

### Why This Matters

CSN can express associations within a single document, but cannot describe references that span across different APIs, versions, or products. The `@EntityRelationship` annotations solve this by using abstract identifiers (Entity Types, Property Types) instead of physical property names - making references stable across API changes and technology boundaries.

### Quick Start Examples

#### Example 1: Defining an Entity Type with its ID

A `Product` entity is annotated to declare which domain concept it represents and which property can be used as its unique identifier:

```json
{
  "definitions": {
    "Product": {
      "kind": "entity",
      "@EntityRelationship.entityType": "sap.example:Product",
      "@EntityRelationship.entityIds": [{ "propertyTypes": ["sap.example:ProductID"] }],
      "elements": {
        "ID": {
          "key": true,
          "type": "cds.UUID",
          "@EntityRelationship.propertyType": "sap.example:ProductID"
        },
        "name": { "type": "cds.String" }
      }
    }
  }
}
```

- `@EntityRelationship.entityType`: Links this data object to the conceptual `Product` entity type
- `@EntityRelationship.entityIds`: Declares that `ProductID` can be used to uniquely identify this entity
- `@EntityRelationship.propertyType`: Marks the `ID` element as holding the `ProductID` value

#### Example 2: Referencing Another Entity

An `Order` entity references the `Product` entity defined above. The reference works across API boundaries because it uses the abstract Property Type, not the concrete property name:

```json
{
  "definitions": {
    "Order": {
      "kind": "entity",
      "@EntityRelationship.entityType": "sap.example:Order",
      "elements": {
        "orderNumber": { "key": true, "type": "cds.Integer" },
        "productID": {
          "type": "cds.UUID",
          "@EntityRelationship.reference": [
            {
              "referencedEntityType": "sap.example:Product",
              "referencedPropertyType": "sap.example:ProductID"
            }
          ]
        }
      }
    }
  }
}
```

- `@EntityRelationship.reference`: Declares that `productID` holds a reference to a `Product` entity, using its `ProductID` as the lookup key

This reference works even if the `Product` entity is exposed by a different API or product, as long as it uses the same Entity Type and Property Type identifiers.

### Overview Diagram

The following diagram illustrates the abstract concepts and how they map to the concrete data model:

<img src="/img/er-abstract-concepts.drawio.svg" alt="Entity Relationship Abstract Concepts" />

- **Domain Model (Conceptual)**: Describes the business domain with Entity Types, Property Types, and Value Types.
- **Data Model (Physical)**: The actual API/database representation with Data Objects, Data Properties, and Data Values.

The Entity Relationship annotations bridge these two levels by annotating the physical data model with references to the conceptual domain model.

### Concrete Example

The following diagram shows how the abstract concepts are applied to a concrete example:

<img src="/img/er-concrete-example.drawio.svg" alt="Entity Relationship Concrete Example" />

Jump to [Concept Explanation](#concept-explanation) for more detailed explanations.
