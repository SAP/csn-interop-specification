# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) rules,
but omits the **patch** level in the spec version number.

For a roadmap including expected timeline, please refer to [ROADMAP.md](./ROADMAP.md)

## [unreleased]

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

### Fixed

- Fixed the "scope" of annotations that belong to type, that they also apply to type definitions

### Added

- Added `@ObjectModel.tenantWideUniqueName` annotation

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
