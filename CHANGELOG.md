# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) rules,
including the **patch** level in the spec version number.

For a roadmap including expected timeline, please refer to [ROADMAP.md](./ROADMAP.md)

## [unreleased]

### Internal

- Extended the schema-convention unit tests (`src/__tests__/spec-v1/schemaConventions.test.ts`) with two enforcement checks against the generated effective schema (core CSN types and annotation vocabularies alike):
  - every entry definition a consumer references directly — core types and top-level annotations — introduced after the initial 1.0 scope must declare an `x-introduced-in-version` tag (`MAJOR.MINOR.PATCH`). The original 1.0 definitions are grandfathered in an explicit `LEGACY_WITHOUT_INTRODUCED_VERSION` set; new definitions must not be added to it.
  - every `oneOf` + `const` enum value across the schema must carry a `description`. Value sets whose authoritative documentation is still outstanding are listed in `ENUM_CONST_DESCRIPTION_EXCEPTIONS` (`@ObjectModel.modelingPattern`, `@ObjectModel.SupportedCapabilities_EnumValue`, `@EntityRelationship.TemporalType`, `@EntityRelationship.Category`) and warned to the console on every run so the backfill stays visible.

## [1.2.6]

### Added

- Added `@DataIntegration.technical` annotation
- Added `@Consumption.aiHint` annotation for AI consumption hints
  - Provides a free-text hint for AI consumers (e.g., LLMs or AI agents) on how to use or interpret an Entity, Type, or Service — kept separate from human-readable `@EndUserText` descriptions
  - For JSON-based metadata formats, the corresponding property is `x-sap-ai-hint`

### Fixed

- Fixed JSON Schema `minItems: 1` constraint to the mandatory arrays in the `@EntityRelationship` vocabulary, so an empty array no longer passes validation for a required list. Affects `@EntityRelationship.EntityId.propertyTypes`, , `@EntityRelationship.TemporalId.propertyTypes`, `@EntityRelationship.TemporalReference.referencedPropertyTypes`, and `@EntityRelationship.ReferenceTargetWithConstantId.referencedPropertyTypes`. `minItems: 2` constraint to `@EntityRelationship.CompositeReference.referencedPropertyTypes`. This is a correction of the schema to follow the specification, having no items, semantically violates the specification.
- Fixed `@API.element.releaseState` and `@API.entity.releaseState` to set `additionalProperties: false` and `required: ["#"]`, matching the other `{ "#": "VALUE" }` enum annotations. Previously an empty object `{}` or an object with unknown keys passed validation.
- Regenerated the committed TypeScript types so they include `@Consumption.aiHint`; the generated output had drifted from the spec sources (see the new freshness check below).

### Internal

- Added unit tests (`node:test`) that enforce annotation authoring conventions against the generated schema:
  - enumerated values must use the `{ "#": "VALUE" }` wrapper notation (a `type: string` `#` property)
  - enum wrappers must set `additionalProperties: false` and `required: ["#"]`
  - top-level annotations must be flat dot-qualified key-value pairs, not structured nested objects (allowlist: deprecated `@API.element`, cohesive `@Semantics.valueRange`)
  - top-level annotations must have a description and only use known `x-extension-targets`
- Updated all npm dependencies to their latest versions, including TypeScript 7 (migrated `tsconfig.json` `moduleResolution` to `bundler`) and Biome 2.5.9
- Switched the VS Code workspace formatter/linter recommendations from ESLint + Prettier to Biome and removed the obsolete `jest` type shim
- Added an `add-annotation` skill (`.claude/skills/add-annotation/`) documenting the annotation authoring conventions, and a `scripts/validate-annotations.mjs` source/wiring check (`npm run validate:annotations`)
- Changed the `format` script to `biome check --write` so `npm run format` (and the pre-commit hook) also organizes imports and applies safe lint fixes, matching what `npm run ci` checks
- Backfilled the `x-introduced-in-version` annotation on all annotation-vocabulary definitions introduced after `1.0.0`, matching the existing convention already used in the core schema (e.g. `BinaryType`). This is documentation metadata only — it does not appear in the generated TypeScript types and is not a contract change. Covers `@ObjectModel.tenantWideUniqueName` (1.0.3), `@ObjectModel.custom` (1.0.6), the `@Semantics.mimeType` / `@Semantics.largeObject.*` family (1.1.0), `@DataIntegration.dataUnavailable` (1.2.3), the `@API.element*` / `@API.entity*` annotations (1.2.4 / 1.2.5), `@PersonalData.relatedDataCategoryID` and `@Consumption.hidden` (1.2.5), and `@Consumption.aiHint` (1.2.6).
- Migrated the remaining bare-`enum` `{ "#": "VALUE" }` wrappers to the `oneOf` + `const` notation, matching the reference `@Aggregation.default`. The set of accepted values is unchanged for every annotation (verified value-set-equal against the previous schema), so this is not a contract change. Where per-value meanings are documented, each `const` now carries a `description`: `@Consumption.ConsumptionValueHelpDefinition.AdditionalBinding.Usage`, `@EntityRelationship.TemporalIntervalType`, `@ObjectModel.usageType.sizeCategory`. The opaque value sets (`@ObjectModel.modelingPattern`, `@ObjectModel.SupportedCapabilities_EnumValue`, `@EntityRelationship.TemporalType`, `@EntityRelationship.Category`) were converted without inventing per-value descriptions; those await authoritative documentation.
- Added a `generate:check` script (`scripts/check-generated-up-to-date.mjs`) and wired it into CI so the build fails if the committed generated output under `src/generated/` is stale with respect to the spec YAML. This prevents spec changes from being merged without regenerating the derived TypeScript types (as happened with `@Consumption.aiHint`).

## [1.2.5]

### Added

- Added `@PersonalData.relatedDataCategoryID` annotation
- Added `IS_BLOCKED_INDICATOR` as enum value to `@PersonalData.fieldSemantics`
- Added `DATA_CATEGORY_ID` as enum value to `@PersonalData.fieldSemantics`
- Added `@API.element.successor` and `@API.element.decommissioningPlannedForYearMonth` as individual full-path annotations. They mirror the corresponding sub-properties of the existing grouped `@API.element` annotation and are non-breaking additions to enable consumers to migrate to the flattened notation. The grouped `@API.element` form remains supported.
- Added `@API.entity.releaseState`, `@API.entity.successor`, and `@API.entity.decommissioningPlannedForYearMonth` annotations for declaring the release state of an entity (mirroring the element-level `@API.element*` annotations).
- Added `@Consumption.hidden` annotation

### Changed

- Extending the x-extension-targets of `@PersonalData.isPotentialSensitive` by `Entity`

## [1.2.4]

### Added

- Added new `@API` annotation vocabulary for release state definition of APIs parts (e.g. elements or associations)

## [1.2.3]

### Added

- Added new `@DataIntegration` annotation vocabulary for data integration scenarios
  - `@DataIntegration.dataUnavailable`: Specifies that the data of the element or entity is unavailable although it is part of the output structure

## [1.2.2]

### Fixed

- Made `selectionDateProperty` in `@EntityRelationship.TemporalReference` optional; when omitted, the consumer determines the selection date/time based on context (e.g., current date/time, start of a fiscal quarter, or another use-case-specific point in time)

## [1.2.1]

### Fixed

- Fixed `csnInteropEffective` enum to include `"1.1"` and `"1.2"` as valid values (previously only `"1.0"` was allowed)
- Updated all examples and documentation to use `csnInteropEffective: "1.2"`

## [1.2.0]

### Changed

- BREAKING: Changed string enum notation to object notation `{ "#": "value" }` for consistency across all vocabularies
  - `@EntityRelationship.temporalIntervalType` now uses object notation (e.g., `{ "#": "CLOSED_CLOSED" }`)
  - `@EntityRelationship.temporalType` now uses object notation (e.g., `{ "#": "DATE" }`)
  - `@EntityRelationship.category` now uses object notation (e.g., `{ "#": "TEMPORAL_DATE" }`)
  - **Note:** We are not aware of consumers already using these features. These annotations may also rely on another missing feature: supporting range comparisons in join conditions.

- BREAKING: Changed string enum notation to object notation `{ "#": "value" }` for consistency across all vocabularies
  - `@PersonalData.entitySemantics` now uses object notation (e.g., `{ "#": "DATA_SUBJECT" }`)
  - `@PersonalData.fieldSemantics` now uses object notation (e.g., `{ "#": "PURPOSE_ID" }`)
  - enum values in the object notation change from `CapitalCamelCase` to `UPPER_CASE_SNAKE_CASE`.
  - **Note:** We are not aware of consumers already using these features.

- BREAKING: `cds.String` type now has an explicit maximum length constraint of 5000 characters (default: 5000)
  - Previously, the length constraint was not enforced in the schema
  - In practice, `cds.String` was always length-limited, which is why `cds.LargeString` exists for unlimited/large strings
  - `cds.LargeString` and `cds.LargeBinary` remain unlimited (no maximum constraint)
  - This change makes the schema consistent with actual CDS semantics

### Added

- Added new `cds.Int16` type (signed integer with 16 bit)
- Added new `cds.UInt8` type (unsigned integer with 8 bit)
- feat: extended the `on` condition for association and composition types to support operators `>`, `>=`, `<`, and `<=`

## [1.1.0]

### Added

- Added `cds.Binary` and `cds.LargeBinary` types
- Added new `@Semantics` annotations:
  - `@Semantics.mimeType`
  - `@Semantics.largeObject.acceptableMimeTypes`
  - `@Semantics.largeObject.mimeType`
  - `@Semantics.largeObject.fileName`

## [1.0.7]

### Added

- Added `meta.document.name` to give the overall document a machine-readable name
- Added `meta.document.namespace` to give the overall document a globally unique namespace
- Allow `cds.Decimal` to be used as a key, indicated via `key` boolean

## [1.0.6]

### Added

- Added `@ObjectModel.custom` annotation

## [1.0.5]

### Fixed

- typescript type `SpecJsonSchemaRoot` is missing in the packed NpmJS artefact

## [1.0.4]

### Changed

- BREAKING: TypeScript interface `CSNInteropRoot` renamed to `CSNInteropEffectiveDocument`

### Added

- Added missing property `$id` to annotation extension schemas
- Added clarification that `key: true` also implies `notNull: true`
- Added clarification that `precision` and `scale` are RECOMMENDED to be added and MUST be added if own default assumptions diverge from the specified default.
- Added explicit regexp pattern to `@EntityRelationship` Entity Type and Property Type IDs
  - Added the ID constraints from ORD page more explicitly back to CSN Interop page and fixed links
- Added explicit regexp pattern to `@ODM` Entity IDs

### Fixed

- Fixed scope of `@ObjectModel.semanticKey` to be valid on Entity, not Type level.

## [1.0.3]

### Added

- Added `@ObjectModel.tenantWideUniqueName` annotation

### Fixed

- Fixed the "scope" of annotations that belong to type, that they also apply to type definitions

## [1.0.2]

### Added

- Added relevant annotations (extensions) explicitly to enum value object
- Added JSON Schema based constraints for element references used in `on` conditions, element references array must have at least 1 item and most 2 items
- Added JSON Schema based constraints for `on` used in association and and composition, `on` array must have min array items 3

### Changed

- BREAKING: TypeScript interface `ValueObject` renamed to `EnumDictionaryEntry` for more clarity

## [1.0.1]

### Fixed

- Fixed wrong enum notation for `@ObjectModel.usageType.sizeCategory`
  - Correct use: `"@ObjectModel.usageType.sizeCategory": { "#": "XL" }`

## [1.0.0]

### Added

- Added `@Semantics.valueRange` annotation
- Added `UI_PROVIDER_PROJECTION_SOURCE` as enum value to `ObjectModel.supportedCapabilities`
- Added `@ObjectModel.usageType.sizeCategory` annotation

### Changed

- Changed `cardinality` from mandatory to recommended property.
  - All its values have defaults, so if it is missing `{ "min": 0, "max": 1}` is assumed.
- BREAKING: deleted schema `csnInteropEffectiveSchemaWithAnnotations`, for consumers use `csnInteropEffectiveSchema` equivalent instead
- BREAKING: spec-toolkit no longer part of the csn-interop-specification package exports

## [0.4.0]

### Added

- ADDED: Clear statement that `ElementRef` referenced element MUST exist locally in the same entity.
- ADDED: `meta.document.title` to give the overall document a human-readable title

### Changed

- BREAKING: wrong @Semantics.amountCurrencyCode annotation, should be @Semantics.amount.currencyCode
- BREAKING: wrong @Semantics.quantityUnitOfMeasure annotation, should be @Semantics.quantity.unitOfMeasure
- BREAKING: For custom types, we should not set `key` property - as this is decided on entity element level.
- FIXED: JSON Schema export $ref from annotation extensions back to core spec (`ElementReference`) was missing.

## [0.3.0]

- BREAKING: Removing `csnInterop`: `0.1` as we'll only release and support version `1.0` with the GA release.
- BREAKING: JSON Schema / TS Interface renamed from `DerivedType` to `CustomType`

## [0.2.0]

- BREAKING: `$version` is now mandatory, as announced earlier
- Added `doc` to add human-readable documentation (MAY be markdown) to CDS definitions and elements.
- Improve schema validation messages and typescript types for element entry.

## [0.1.17]

- fix(core): spec-toolkit exports

## [0.1.16]

- fix: type of exported schema csnInteropEffectiveSchemaWithAnnotations
- fix(core): explicit typings for x-extension-targets and x-extension-point

## [0.1.15]

- Breaking: Not all properties are allowed for all CDS Types anymore
  - Now all CDS Types have their own interfaces and define which properties (like `scale`) are applicable
  - Providing properties that do not belong to the CDS types will now be a schema violation (e.g. `scale` for `cds.String`)
- Breaking: done multiple renaming in the specification that affect the typescript types and JSON Schema names
  - `Element` to `CdsType`
  - `CustomElement` to `DerivedType`
  - all typescript ".cds" types (from e.g. `BooleanType` to `BooleanCdsType`)
- Added `@ObjectModel.compositionRoot` annotation
- Added `@AnalyticsDetails.measureType` annotation

- Other:
  - typescript added types specific default values

## [0.1.14]

- Added soon to be mandatory `$version` to ensure compatibility with CDS CSN in general
  - Goal: CSN Interop is a valid subset of CSN
  - Allowed values are `2.0`.

## [0.1.13]

- Added `DefinitionEntry` validation schema based on if/then condition on discriminator property `kind: context | entity | service | type`

## [0.1.12]

- Added `meta.features`
  - Added documentation of CSN feature dimensions of the CSN Interop Effective format.
  - Added `complete` feature dimension to be set by the document creator.
- Marked `@PersonalData` extension as stable (has been approved)
- Added `@Consumption.valueHelpDefinition.additionalBinding.usage`
- Added `@Consumption.valueHelpDefinition.distinctValues`
- Added `@Consumption.valueHelpDefinition.association`

## [0.1.11]

- Renamed `cds.Uuid` type to `cds.UUID` (as provided by CAP)
