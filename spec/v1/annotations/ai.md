## Introduction

The `@AI` vocabulary provides annotations targeted specifically for AI consumers, such as large language models (LLMs) processing or reasoning over the data model.

This allows model owners to provide AI-specific context separately from human-readable descriptions (e.g., [`@EndUserText`](./end-user-text)), enabling richer and more accurate AI consumption of the data model without polluting end-user-facing labels or documentation.

## Annotations Overview

| Annotation | Targets               | Description                                                                      |
| ---------- | --------------------- | -------------------------------------------------------------------------------- |
| `@AI.hint` | Entity, Type, Service | Free-text hint for AI consumers on how to use or interpret the annotated element |

## `@AI.hint`

**Targets:** Entity, Type, Service (and their elements/properties, since a Type target implies its elements)

`@AI.hint` is a string annotation that provides guidance for AI consumers (e.g., LLMs or AI agents) on how to use or interpret the annotated element. It is intentionally kept separate from human-readable descriptions (e.g., `@EndUserText`) so that end-user-facing documentation and AI-targeted guidance can evolve independently.

For JSON-based metadata formats, the corresponding property is [`x-sap-ai-hint`](https://github.tools.sap/CPA/sap-json-schema-specification/blob/main/extension-attributes/x-sap-ai-hint.md).

### Usage

```cds
entity SalesOrder : managed {
  @AI.hint: 'Use this entity to retrieve sales order header data. Filter by CustomerID and CreatedAt for typical lookups. For line items, use the SalesOrderItem entity.'
  key ID : UUID;
  CustomerID : String(10);
  @AI.hint: 'ISO 4217 three-letter currency code (e.g. USD, EUR). Never a symbol.'
  TransactionCurrency : String(5);
  @AI.hint: 'Integer status code: 1=Open, 2=InProcess, 3=Completed, 4=Cancelled. Do not infer status from other fields.'
  LifecycleStatus : Integer;
}

service SalesService {
  @AI.hint: 'Exposes sales order read and write operations. Use GET operations for lookups and reporting. Creating or modifying orders requires the SalesOrder.Write scope.'
  entity SalesOrders as projection on SalesOrder;
}
```

### Best practices

Unlike human-readable descriptions, `@AI.hint` can be explicit about data semantics and usage context that would clutter `@EndUserText` annotations. Focus on what an AI agent needs to decide _whether_ and _how_ to use the entity, type, or service.

Some useful things to include, depending on the target:

- **Entity/Type level**
  - **Business context** — what business concept or domain object this entity represents
  - **When to use vs. similar entities** — if multiple entities cover overlapping domains, state which is authoritative and under what conditions
  - **Disambiguation** — when an entity or property name is misleading or overlaps with something similar
  - **Format and value constraints** — coding standards (ISO, internal enums, picklists), what values are valid, how to interpret coded fields
  - **Navigation and relationships** — how to traverse to related entities for common lookup patterns

- **Service level**
  - **Scope and capabilities** — what business activities the service covers and which operations are available
  - **Authorization** — required scopes or roles needed to read vs. write
  - **When NOT to use** — if another service is preferred for a specific use case, state this explicitly to help agents route correctly

Structure `@AI.hint` values using **lightweight, semantically structured Markdown**:

- **Use consistent labels** — e.g., **Format:**, **When NOT to use:** — so AI systems can extract meaning beyond visual formatting.
- **Keep content atomic** — one idea per bullet or line; avoid long prose paragraphs.
- **Lightweight Markdown only** — bullets, bold labels, `inline code` for field names and identifiers. Avoid tables and deep nesting.
