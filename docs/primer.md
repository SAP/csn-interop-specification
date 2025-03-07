---
sidebar_position: 2
title: "Primer"
---

# Primer

## Purpose and Target Group

This document shall mainly serve as a reference for development teams who want to produce interoperable data definitions in a development environment w/o native CDS support. (CAP and RAP developers create data models in CDS according to their local development guidelines, and the framework will take care of the interoperability. Datasphere content developers use the modeling tools.)

This document shall also serve as a basic reference for consumers of interoperable data definitions who need to parse, validate and interpret externally provided data documents.

Prominent use cases which require the creation and consumption of interoperable data definitions are:

- Deployment of HDLF Delta Share Tables in the context of real-time exchange of large datasets
- Embedded Analytics on a HANA Cloud side car (plus SAC Integration Service)
- Model- and Data Integration with Datasphere

## Introduction

The [Core Data Services Schema Notation](https://cap.cloud.sap/docs/cds/csn#core-schema-notation-csn) (CSN, pronounced "Season") is a JSON format to exchange metadata about data models, e.g., between the various technology stacks and applications that form the Business Technology Platform (BTP).

Depending on the intended usage we distinguish three CSN flavors:

- **Parsed** for the Modeling Perspective
- **Effective** for the data exchange perspective
- **Persistency** for the persistency flavor

The **Parsed** flavor could e.g. represent a CAP CDS data model 1:1, the **Persistency** flavor could e.g. express HANA SQL tables and views.

This document describes the **Effective** flavor, characterized as being optimized for data exchange purposes. All content that can be standardized (currency keys, language codes, country codes, …) must be presented in standardized form, hence original data definitions must be adapted accordingly if necessary. Technology-specific aspects of the data model shall be left out as far as possible.
This standardization includes the basic data types, and annotation (e.g. labels, …).

The document is structured in a way that it starts from an empty JSON document and introduces concepts and their corresponding syntax patterns with development guidance one by one.
The example JSON snippets mostly follow the [airline example](./spec-v1/examples/airline).
In order to create a valid Effective CSN document it is only necessary to apply the specification within the intended scope, and the mandatory scope is very small.

> **Note**: According to the purpose the document will evolve. While it is not intended to change any already published content in an incompatible way, new content will be added over time. This implies that early versions of the document will not cover the complete scope of Effective CSN.

> **Note**: The document quotes frequently from the [CAP CSN documentation](https://cap.cloud.sap/docs/cds/csn) w/o explicit citations. This is done intentionally to increase the consistency between these two sources of information. In case of differences consider that the purpose of this document is not to explain how CSN is derived from CDL, but how Effective CSN is constructed from scratch.

## Structure

A CSN document starts with the [root-level structure](#root-level-structure) of some header properties (describing which version of CSN Interop is used) and the meta section for metadata that applies to the document as a whole.

The actual model content lives in the [definitions section](#definitions), where entities, (custom) types, services and contexts can be added. [Entities](#entity-definitions) are the most complex concept, as it contains [elements](#elements) that may or may not use [custom types](#custom-type-definitions).

The entities can be assigned to a [service](#service-definitions) to indicate that the entity is exposed as an API (or events). [Contexts](#context-definitions) may optionally be used to assign other concepts to a "namespace", ensuring unique names.

<div style={{"text-align": "center", "max-width": "auto"}}>

<img src="img/high-level-model.drawio.svg" title="High-level CSN structure overview"></img>

</div>

## Root Level Structure

There are three mandatory root level properties that need to be added to get a minimal valid CSN Interop document:

```js
{
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": { }, // MUST have at least one entry
}
```

- `csnInteropEffective` states that this JSON document is a CSN Interop document and the value states the version of the spec that was used.
- `$version` is a mandatory property that defines the version of the general CSN syntax version.
- `definitions` at least one element of a definition modelling artefact
- See [Root Interface documentation](./spec-v1/csn-interop-effective#csn-interop-root) for a complete overview.

Optionally, metadata about the document as a whole can be added in [meta](./spec-v1/csn-interop-effective.md#meta).
It is also recommended to add `$schema` for JSON Schema based validation / code intelligence in IDEs and editors.

```js
{
  "$schema": "https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json",
  "meta": {
    "document": {
      "version": "1.2.3",
      "doc": "This CSN example document shows how the airline example is expressed with a CDS **Service** exposing the entities through an API."
    }
  },
  // ...
}
```

## Definitions

The model is described in the [Definitions](./spec-v1/csn-interop-effective#definitions) section.

```js
{ //..
  "definitions": { }
}
```

Each entry in the definitions dictionary is a definition of a named modeling artefact. The name is the absolute fully qualified name definition, and the value is a record with the definition details.

The **name** of a definition is its key in the enclosing dictionary.

Each top-level definitions entry has a property **kind** – one of `entity`, `type`, `service` or `context`.

```js
{ //..
  "definitions": {
    "<name>": {
      "kind": "<kind>"
    }
  }
}
```

We will now describe the detail patterns per `kind`. The by far most important `kind` is `entity`. But before we proceed we need to introduce Literals and Built-in Types.

## Literals

There are several places where [literals](https://cap.cloud.sap/docs/cds/csn#literals) can show up in models, such as in SQL expressions, calculated fields, or annotations.
Standard literals are represented as in JSON. In addition, CSN specifies special forms for `references`, `expressions` and `enum` symbols:

| Kind                 | Example                  |
| -------------------- | ------------------------ |
| Globals              | `true`, `false`, `null`  |
| Numbers              | `11`, `2.4`              |
| Strings              | `"foo"`                  |
| Dates                | `"2016-11-24"`           |
| Times                | `"16:11Z"`               |
| DateTimes            | `"2016-11-24T16:11Z"`    |
| Records              | `{"foo":\<Literal\>, …}` |
| Arrays               | `[\<Literal\>, …]`       |
| References           | `{"=":"foo.bar"}`        |
| Unparsed Expressions | `{"=":"foo.bar \< 9"}`   |
| Enum Symbols         | `{"#":"asc"}`            |

> Remarks:
>
> Numbers share the same issues as in JSON when decimals are mapped to doubles with potential rounding errors. The same applies to Integer64. Use strings to avoid that, if applicable.
>
> Also, as in JSON, dates, and times are represented just as strings as specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601); consumers are assumed to know the types and handle the values correctly.

## Built-in Types

The CDS [built-in types](https://cap.cloud.sap/docs/cds/types#core-built-in-types) shall be used as basis from which other types (if required) are derived (see [Custom Type Definitions](#custom-type-definitions)).

## Entity Definitions

In this section we introduce [entity definitions](./spec-v1/csn-interop-effective#entity-definition) which would result in a data persistence at deployment, i.e. a table in a SQL database.
Entity definitions always have kind `entity`, and a property `elements`.

The fully qualified name of the entity is defined as the key in the definition JSON object (`<entity name>`).

```js
{ //..
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
      }
    }
  }
}
```

### Elements

Each entry in the [elements object](./spec-v1/csn-interop-effective#elemententry) must have an entity-locally unique name, and a member `type` referring to a built-in type, or a type definition, via its fully qualified name (`<element name>`).

```js
{ //..
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<element name>": {
          "type": "<type name>"
        }
      }
    }
  }
}
```

#### Type-specific Properties

If the built-in [CDS Types](./spec-v1/csn-interop-effective#cds-type) have arguments of type integer (`length`, `precision`, `scale`). These arguments are expressed via additional properties with the (fix) name of the argument. Especially a String has a length, and a Decimal has a precision and a scale. This yields the following specialized patterns:

```js
{ //..
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<string element name>": {
          "type": "cds.String",
          "length": <length>
        },
        "<decimal element name>": {
          "type": "cds.Decimal",
          "precision": <total number of digits>,
          "scale": <number of decimal places>
        }
      }
    }
  }
}
```

These additional properties are usually optional.
However, we strongly recommend to always specify them, because otherwise consumer MAY assume different defaults.

Note that there are several built-in types for numbers. We recommend to stick to Integer, if there is no specific reason to use a specialized type. And we strongly recommend to use Decimal (not Double) for data exchange.

Note that it's also possible to create shared, reusable types with [Custom Types](#custom-type-definitions)). With this feature, a new reusable, custom type can be defined in the [Definitions](#definitions) section ("kind": "type"). Instead of using a native [CDS Types](./spec-v1/csn-interop-effective#cds-type), the `type` points to the fully qualified name of the derived type. The custom type itself MUST use a native CDS Type however.

#### Primary Key

In case the entity has a primary key, it is mandatory to specify it. (It is especially required for data integration with Datasphere.)
This is done by adding the member `key` with boolean value `true` to each element of the primary key:

```js
{ //..
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<key element name>": {
          "type": "<type name>",
          "key": true
        },
        "<non-key element name>": {
          "type": "<type name>"
        }
      }
    }
  }
}
```

#### Optional Properties

In addition an element has the optional properties `notNull`, and `default` (both with SQL semantics). This results in the pattern:

```js
{ //..
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<element name>": {
          "type": "<type name>",
          "key": <true/false>,
          "notNull": <true/false>,
          "default": <default value as literal matching type>
        }
      }
    }
  }
}
```

Note: As a general convention we recommend to omit optional boolean properties, if the value is `false`.

## Annotations

Annotations are represented as properties, prefixed with **@**. This format applies to type/entity-level annotations as well as to element-level ones.

Annotations are used to add custom information to definitions, the prefixed **@** acts as a protection against conflicts with built-in/standard properties. They are flat lists of key-value pairs, with keys being fully qualified property names and values being represented as introduced in section Literals.

This yields the following pattern for top-level and for element annotations:

```js
{
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "@<entity annotation name>": <annotation value>,
      "elements": {
        "<element name>": {
          "type": "<type name>",
          "@<element annotation name>": <annotation value>,
        }
      }
    }
  }
}
```

The CSN Interop spec also defines a set of [aligned, interoperable annotations](./annotations).

### Standard Annotations

Formally any annotation following the syntax pattern prefixed with **@** is allowed. However, annotations can only be interpreted safely by consumers if they follow a common specification. For SAP-internal interoperability, a standard process is in place on how to contribute standard annotations. It is especially applied by S/4HANA and also by Datasphere. Producers are encouraged to reuse existing standard [annotations](./annotations) and publish their specialized semantics also in this way.

### Literals for Enum and ElementRef values

An annotation value of type Enum shall be given as an enum symbol:

```js
"<definition name>": {
  "<annotation key of type Enum>": { "#": "<enum value>" }
}
```

An annotation value of type ElementRef can be given in two formats: as a reference (preferred)

```js
"<definition name>": {
  "<annotation key of type ElementRef>": { "=": "<element name>" }
}
```

or as a string

```js
"<definition name>": {
  "<annotation term of type ElementRef>": "<element name>"
}
```

(In CDL notation this is the difference between
\<annotation term\>: \<element name\> (CAP style)
and
\<annotation term\>: ‘\<element name\>’ (RAP style)
)

### Language-dependent annotation values

Some annotations have language-dependent values, e.g. [`@EnduserText`](./annotations/enduser-text).
If in such cases a plain string is provided, the language is unspecified. Consumers will typically default English in this case, e.g.

```js
"FlightDate": {
  "@EndUserText.label": "Flight Date"
}
```

Therefore providers shall either provide values in English or, if more languages are available, apply the following localization notation:
concatenate `{i18n>labelID}`,
where `<label ID\>` uniquely refers to an i18n entry, e.g.

```js
"FlightDate": {
  "@EndUserText.label": "{i18n>FlightDate}"
}
```

i18n entries (key/value pairs) can be provided as part of the CSN document, as described in section Localization (i18n).

## Associations

An Association expresses a relation between two entities. An association is directed from the source to the target and always defined at the source.

> Note:
> Bidirectional relations can be defined via associations at both related entities. This is often not necessary, however, because the consumer can derive the inverse relation from a single association.

Associations are element definitions with `type` being `cds.Association` or `cds.Composition` plus additional properties specifying the association `target`, the `cardinality`, and an `on` condition.

Property `cardinality` is an object \{`src`?, `min`?, `max`\} with...

- `src` set to 1 give a hint to database optimizers, that the relationship is "one to" instead of "many to" (default).
- `min` specifying the target's minimum cardinality (0, 1, \*) – default: 0
- `max` specifying the target's maximum cardinality (1, \*) – default: 1
- In summary, the default cardinality is 0..1, which means "to-one". However, we recommend to always specify the cardinality, in order to avoid uncertainties on the consumer side.

The semantics follows from the pattern \<src\>:[\<min\>..\<max\>]. Most typical are the following:

| Cardinality | CDL                | CSN                                                 |
| ----------- | ------------------ | --------------------------------------------------- |
| To-one      | [0..1], short: [1] | \{ "min": 0, "max": 1 \}, short: \{ "max": 1 \}     |
| To-many     | [0.._], short: [_] | \{ "min": 0, "max": "_" \}, short: \{ "max": "_" \} |

The (mandatory) `on` property maps elements of the local entity to elements of the target entity. Its syntax and grammar follows the Core Query Notation (CQN), which at its core is a JSON representation for SQL queries. The subset of CQN required to construct on-conditions of associations is explained in the next sub section. So far we have:

```js
{
  "definitions": {
    "<source entity name>": {
      "kind": "entity",
      "elements": {
        "<association name>": {
          "type": "cds.Association", // or cds.Composition
          "target": "<target entity name>",
          "cardinality": {
            "src": <source cardinality>,     // 1 - optional
            "min": <target min cardinality>, // 0, 1
            "max": <target max cardinality>  // 1, "*"
          },
          "on": [
            <predicate expression>
          ]
        }
      }
    }
  }
}
```

### On Condition

The `on` condition is a predicate expression in [CXN](https://cap.cloud.sap/docs/cds/cxn#expressions) format, which binds elements of the target entity.
In CSN Interop effective we limit the scope to bindings via the `=` operator, and logical operators between single target element bindings to `and`.
An operand can either refer to an element, or can be given as a constant value (a literal).
Constant values are notated as a property `val` containing a literal.

Element references are notated as a property `ref` containing a path to the element in question, given as an array of element names.
The last entry in the array is the unqualified element name.
For local references, the array will only have one item, the local element name.

A reference to an element in the target entity is uniquely referred to by a an array with two entries:
First, the association name, and second, the name of the element in the target entity (short: target element).

So within this scope of expressiveness the pattern of an association’s on condition looks like this:

```js
//...
        "on": [
          {
            "ref": [
              "<association name>",
              "<target element name in target entity>"
            ]
          },
          "=",
          {
            "ref": [                          // or "val": <value>
              "<element name in source entity>"
            ]
          },
          "and",
          {
            "ref": [
              "<association name>",
              "<another element name in target entity>"
            ]
          },
          "=",
          {
            "val": "<value>"        // or "ref": [ <source element name> ]
          },
          // "and" ...
        ]
```

Note that that commutation rules of logical expressions apply, i.e. the sequence of expressions combined with and "=" or with an "and" is not significant and can thus be arbitrarily chosen (as we want to bind target elements it is natural to start with those on the left side of the equation).
Further note that the usual operator precedencies apply, especially "=" operators are applied first and only then "and" operators.

### Foreign Key Associations

The most relevant class of associations for data integration are foreign key associations, which point to the list of values ("check table") for a local element. Foreign key associations are of cardinality to-one and typically bind exactly all key elements of the target entity.
As the association is itself an element, the information for which element it is the foreign key association is expressed via a standard annotation.
For a single target key element, the pattern looks like:

```js
{
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<local element name>": {
          "type": "<type name>",
          "@ObjectModel.foreignKey.association": {
            "=": "<foreign key association name>"
          }
        },
        "<foreign key association name>": {
          "type": "cds.Association",
          "target": "<other entity name>",
          "cardinality": {
            "min": 0,
            "max": 1
          },
          "on": [
            {
              "ref": [
                "<foreign key association name>",
                "<key element name>"
              ]
            },
            "=",
            {
              "ref": [
                "<local element name>"
              ]
            }
          ]
        }
      }
    },
    "<other entity name>": {
      "kind": "entity",
      "elements": {
        "<key element name>": {
          "type": "<type name>",
          "key": true
        }
      }
    }
  }
};
```

We recommend to add foreign associations wherever this relation applies.

### Text Associations

Another important class of associations are text associations, which point to language-dependent texts (a "text table") for an ID. Text associations are formally of cardinality to-many, but they bind exactly all key elements of the target entity, except the language key. (So in a runtime context, when the language is fixed, the effective cardinality is to-one.)
The definition pattern in CSN is very similar to foreign key associations:

```js
{
  "definitions": {
    "<entity name>": {
      "kind": "entity",
      "elements": {
        "<local id element name>": {
          "type": "<type name>",
          "key": true
          "@ObjectModel.text.association": {
            "=": "<text association name>"
          }
        },
        "<text association name>": {
          "type": "cds.Association",
          "target": "<text entity name>",
          "cardinality": {
            "min": 0,
            "max": "*"
          },
          "on": [
            {
              "ref": [
                "<text association name>",
                "<id element name>"
              ]
            },
            "=",
            {
              "ref": [
                "<local id element name>"
              ]
            }
          ]
        }
      }
    },
    "<text entity name>": {
      "kind": "entity",
      "@ObjectModel.modelingPattern": {
        "#": "LANGUAGE_DEPENDENT_TEXT"
      },
      "elements": {
        "<id element name>": {
          "type": "<type name>",
          "key": true
        },
        "<language element name>": {
          "type": "cds.String",
          "length": <length>,
          "key": true,
          "@Semantics.language": true
        },
        "<text element name>": {
          "type": "cds.String",
          "length": <length>,
          "@Semantics.text": true
        }
        // optional: more elements (text, or non-text)
      }
    }
  }
}
```

We recommend to add text associations wherever this relation applies.

## Context Definitions

All definitions names must be unique within the CSN document. However, sometimes the data models to be defined do not share the same namespace on the provider side. A typical example in the context of deployment is that a single CSN document may contain table definitions for several schemas. In this case the table names are unique within the schema. Another example is that a CSN document spans across several, separate application areas. In this case the names may only be unique per application area.
In order to arrive at unique entity names in CSN, a [context](./spec-v1/csn-interop-effective#context-definition) is defined. And all data definitions with an original name locally unique to this context are prefixed with the context name, separated by a ".". The basic pattern is thus:

```js
{
  "definitions": {
    "<context name>": {
      "kind": "context"
    },
    "<context name>.<locally unique name>": {
      "kind": "<kind>"
    }
  }
}
```

Sometimes contexts have specific semantics which shall be expressed (e.g. by a label). Also, contexts can be logically nested and may have different semantics, depending on the nesting level. In these cases the contexts could carry additional metadata in terms of annotations. The resulting pattern is a compatible extension of the basic context pattern (here given for entity definitions):

```js
{
  "definitions": {
    "<context name level 1>": {
      "kind": "context",
      "@<annotation name>": <annotation value>
    };
    "<context name level 1>.<context name level 2>": {
      "kind": "context",
      "@<annotation name>": <annotation value>
    };
    "<context name level 1>.<context name level 2>.<local entity name>": {
      "kind": "entity",
      "elements": { … }
    };
  }
}
```

Note that logically nested contexts are not formally nested in CSN, but flattened in a way that the more specific context uses the higher-level context as part of its name, just according to the basic pattern above.
Further note that element names are not affected by context definitions, because element names are anyway local to the entity name.

### Aggregation of Data Definitions

Contexts can also be used to aggregate local data definitions into a single CSN document. E.g. assume that there are several original data models, each of which where local to a schema. And each of these data models is already described in terms of data definitions in CSN format.
Now simply merging these data definitions into one is typically not possible because in the resulting CSN document the definition names must again be unique. But the data definitions can be rewritten by introducing higher-level contexts (e.g. one context per schema), and replacing all local names by their fully qualified equivalents.
Note that it is not sufficient to replace the top-level data definition names, but that also the association targets and annotation values of type `EntityRef` have to be adapted.

## Custom Type Definitions

Sometimes built-in types are not sufficient. In general, CDS supports scalar, structured and arrayed types. The CSN Interop Effective spec decided to not support arrayed types, as due to lack of support in relational databases (therefore not sufficient interoperability).

This section explains how they are handled in Effective CSN.
Note that all used types, which are not built-in types, must be explicitly defined (based on built-in types or other defined types).

```js
{
  "definitions": {
    "<type name>": {
      "kind": "type"
    }
  }
}
```

### Scalar Types

Scalar types are type definitions, with a mandatory property type.

```js
{
  "definitions": {
    "type name": {
      "kind": "type",
      "type": "<built-in type or custom type name>"
    }
  }
}
```

For some built-in types additional properties are required.
In Effective CSN type definitions shall be introduced only for a good reason. Consider that consumers will either use a standard type system (like CDS or HANA), or will have their local type system, and may not be able to consume external types 1:1, but need to resolve them anyway.
There are however known scenarios, where a systematic usage of own type definitions may be considered (it is still a trade-off decision),

#### Local Built-in Types

If the provider stack has an own built-in type system, it may be more efficient and also safer (from a quality perspective) to define the data models in terms of the local built-in types and add a mapping to the CDS built-in types.
For example, RAP uses the ABAP built-in types, where e.g. the date is represented as an 8-digit string following the pattern ‘YYYYMMDD’. There are three alternative ways to deal with this situation in Effective CSN:

1)Replace all date type usages by cds.Date (challenge: This effects the data exchange format.)
2)Replace all date type usages by cds.String(8) (challenge: loss of semantics)
3)Define a type abap.dats based on cds.String and keep using the ABAP type (challenge: shall consumers understand/leverage this type system? Or will they resolve to 2) anyway?)

Example for 3):

```js
    "abap.dats": {
      "kind": "type",
      "type": "cds.String",
      "length": 8,
      "@Semantics.date": true   // optional
    }
```

#### Semantic Types

If the provider already locally declared semantic types which are reused in several data models, then it may be desirable to capture this semantics for consumers who can also support semantic types.
E.g. the ABAP Dictionary has "Data Elements" which are scalar public types, with a description (and other properties). Typical usages are business-semantics (e.g. "Controlling Area") and public semantics (e.g. "Fiscal Year").
In case of master data the preferred technique to express the reuse in Effective CSN is to add a foreign key association to each element which represents the master data ID. All these foreign key associations will have the same target entity, which thus fully compensates for a dedicated semantic type.
In case of public semantic types the default pattern in CSN is to annotate the semantics at each element (e.g. @Semantics.fiscal.year: true).
We recommend to apply these default techniques always, even in the case where explicit semantic types are defined. (Which in turn reduces the additional value of exposing semantic type definitions.)
Example for a semantic type definition:

```js
    "r3.FISCYEAR": {
      "kind": "type",
      "type": "cds.String",
      "length": 4,
      "@EndUserText.label": "Fiscal Year"
      "@Semantics.fiscal.year": true
    }
```

Note that a namespace is typically required to separate it from other type systems and from entity definitions.
In this example we would recommend to resolve the semantics at each usage (i.e. replace it by the built-in type and add the annotations.)

### Structured Types

CDS CDL (and thus CSN) supports the definition of structured types, which then can be used in the type properties of entity elements, or in other type definitions. While this kind of nesting can be elegant at design time, it is problematic for interoperability as it requires advanced consumers to resolve it. And even if the consumer can resolve it, the exact mapping to the persistency layer (in terms of table column names) is not determined and may depend on local conventions.
Therefore, in Effective CSN we expect structured types to be resolved before using them at entity elements. Effective CSN supports two resolution patterns:

#### Inlining

Inlining means that a structured type is (recursively, if nested itself) dereferenced into an elements section at each place it is used. In entities this leads to a nested elements property (example: "Price": \{ elements: \{ "Currency", "Amount" \} ).
Note: This version of the doc does not provide a reference for inline structured types.

#### Flattening

If the structured type does not serve any particular purpose at deployment or for consumers, structured types can also be flattened in a way that the nested elements section after inlining are replaced by concatenated element names (e.g. separated by `_`; example: "Price_Currency", "Price_Amount").

<!--
## View Definitions

Note: This version of the doc does not provide a reference for view definitions. This section shall only provide an outlook on how views can be defined enhancing the entity definitions for tables.
From a CDS perspective both tables and views are entities. Only that views have no data persistence, but a definition of how to select the data from other entities (tables or views).
In CSN this is reflected in the way that views have a mandatory property `query`.

### Declared Signature

In Effective CSN views shall have a declared signature, i.e. a definition of the result structure. This declaration is done via an `elements` property, exactly like for table definitions.
So a view definition in Effective CSN is a table definition plus a `query` property describing how the source data is mapped to the signature.

```js
{
  "definitions": {
    "<view name>": {
      "kind": "entity",
      "elements": {
      },
      "query": {
      }
    }
  }
}
```

For data exchange and deployment this means that a view definition in CSN can be directly used as a table definition on the consumer side, by simply ignoring the `query` property.

### Query

Property query defines how signature is bound to underlying entities / i.o.w. how the interface is implemented in terms of a SQL query.
-->

## Service Definitions

CDS allows to define service interfaces as collections of exposed entities enclosed in a `service` section, which is essentially a `context`.(Especially the service acts as a name prefix for the exposed entities.)
The exposed entities are typically projections on entities from underlying data models, defined via standard view definitions.

```js
{
  "definitions": {
    "<service name>": {
      "kind": "service",
      "@<context annotation name>": <annotation value>
    },
    "<service name>.<exposed entity name>": {
      "kind": "entity",
      "elements": {
      }
    },
    ...
  }
}
```

<!-- ### Actions

Out of scope.
Outlook: Signatures for consumers, logic opaque

### Functions

Out of scope.
Outlook: Signatures for consumers, logic opaque -->

## Localization (i18n)

A CSN document may optionally contain a top-level i18n property, which can contain translated texts. The expected structure is as follows:

```js
{
  "i18n": {
    "<language key": {
      "<text key>": "<text>"
    }
  }
}
```

In the context of Effective CSN it is especially relevant to expose language-dependent annotation values in several languages. Example:

```js
{
  "definitions": {
    "FlightConnection": {
      "kind": "entity",
      "@EndUserText.label": "{i18n>FlightConnection}",
      "elements": {
        "ConnectionID": {
          "@EndUserText.label": "{i18n>ConnectionID}",        }
      }
    }
  },
  "i18n": {
    "en": {
      "FlightConnection": "Flight Connection",
      "ConnectionID": "Flight Number"
    },
    "de": {
      "FlightConnection": "Flugverbindung",
      "ConnectionID": "Flugnummer"
    }
  }
} 
```

## Examples

The [airline example](./spec-v1/examples/airline) of the Primer and other examples can be found here: [Examples](./spec-v1/examples/index.mdx).
