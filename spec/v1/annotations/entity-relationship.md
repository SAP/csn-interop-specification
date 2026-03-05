> <span className="feature-status-beta" >BETA</span> This annotation is in **beta state**. Please give feedback if the annotations are correct and sufficient.

## Introduction

Modern business application suites handle thousands of different types of business data and consist of many applications or services.
Business data is heavily interconnected and dynamically evolves over time.

### The Problem

In enterprise landscapes, we typically deal with two distinct levels of models:

- **Domain Models (Conceptual)**: Abstract representations of business concepts like "Customer", "Product", or "Order". These are conceptual entities that exist independently of how they are technically exposed.
- **Data Models (Physical)**: Concrete API or database representations that expose domain concepts. The same domain model concept can have multiple data model representations across different APIs, versions, protocols, or even products.

Data models are usually exposed through APIs and data products. While CSN can express associations within the same document, we need additional capabilities to describe relationships that span across different APIs, products, tenants, and technology stacks.

### What EntityRelationship Addresses

The `@EntityRelationship` vocabulary addresses two key concerns:

**1. Associating Data Models with Domain Models**

By annotating data objects with their corresponding [Entity Types](#entity-type) and [Property Types](#property-type), we establish a link between the physical API/data model and the underlying conceptual domain model. This provides:

- Semantic context and meaning to API structures
- Understanding that multiple data models can expose the same domain concept
- A stable reference point independent of API structure changes

**2. Defining IDs and Cross-Boundary References**

Building on the domain model association, we can define:

- **IDs for data objects**: Which can be simple (single property) or composite (multiple properties together)
- **References across boundaries**: Associations that work across different data models, APIs, and even products - by stating how references tie to their target entities and IDs

This enables "dangling references" - associations to entities outside the current API context, including those provided by different products and technology stacks.

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
