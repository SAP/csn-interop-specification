// AUTO-GENERATED definition files. Do not modify directly.

/**
 * Definition of a CDS modeling artifact, put into [Definitions](#definitions).
 *
 * This interface was referenced by `Definitions`'s JSON-Schema definition
 * via the `patternProperty` "^(?![@]|__|\.|::).+$".
 */
export type DefinitionEntry = ContextDefinition | EntityDefinition | ServiceDefinition | TypeDefinition;
/**
 * The property contains a human-readable text to be displayed on UIs (besides or instead of the technical name).
 *
 * Corresponds to CAP CDS `@title` annotation.
 */
export type EndUserTextLabel = string;
/**
 * Defines a human-readable text that provides additional information compared to the label text.
 * The quickInfo is used for accessibility hints or the "Mouse over" function.
 *
 * Corresponds to CAP CDS `@description` annotation.
 */
export type EndUserTextQuickInfo = string;
/**
 * Definition of an Element, as put into [Element Definitions](#element-definitions).
 *
 * An element can be either of a standard [CDS Types](#cds-type) or a [Custom Type](#custom-type).
 *
 * This interface was referenced by `ElementDefinitions`'s JSON-Schema definition
 * via the `patternProperty` "^(?![@]|__|\.|::).+$".
 */
export type ElementEntry = CdsType | CustomType;
/**
 * The native CDS Type of an element, which will always start with `cds.`.
 */
export type CdsType =
  | BooleanType
  | StringType
  | LargeStringType
  | IntegerType
  | Integer64Type
  | DecimalType
  | DoubleType
  | DateType
  | TimeType
  | DateTimeType
  | TimestampType
  | UUIDType
  | AssociationType
  | CompositionType;
/**
 * The property defines how value helps for this element shall be constructed.
 *
 * It allows to associate a (set of) View/Entity that provides the "Value Help" for the annotated field or parameter.
 * This is achieved by either referencing the target view/entity of a modelled association or by directly establishing a relationship to view/entity that shall act as a value help provider.
 */
export type Consumption = ConsumptionValueHelpDefinition[];
/**
 * Defines a human-readable text that is displayed as column headers.
 */
export type EndUserTextHeading = string;
/**
 * Defines the logical [Property Type](#property-type) of a property.
 * The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.
 */
export type EntityRelationshipPropertyType = string;
/**
 * ID of the [Entity Type](#entity-type).
 */
export type EntityTypeID = string;
/**
 * ID of the [Property Type](#property-type). The reason is to have an ID to relate to the property, especially to state that it can be used as an ID or is part of a composite ID.
 */
export type PropertyTypeID = string;
/**
 * Defines references to other Entity Types based on a single ID.
 */
export type EntityRelationship = ReferenceTarget[];
/**
 * The property contains element(s) which shall be used to display the key in UIs (instead of the technical key).
 */
export type ObjectModel = unknown[];
/**
 * The element is of type `cds.Association` which points to the list of values.
 *
 * Use only for service internal associations. For cross service associations, use the [@EntityRelationship Vocabulary](./entity-relationship) instead.
 */
export type ElementReference = ElementReferenceString | ElementReferenceObject;
/**
 * Element reference to an element within the current entity, using string notation.
 *
 * The referenced element MUST exist locally in the same entity.
 *
 * ```js
 * "<definition name>": {
 *   "<annotation key of type ElementReference>": "<element name>"
 * ```
 */
export type ElementReferenceString = string;
/**
 * The property contains element(s) containing a text for the annotated (id)element
 */
export type ObjectModelText = unknown[];
/**
 * The element is of type cds.association, which points to an entity containing (language-dependent) texts for the annotated (id) element
 */
export type ElementReference1 = ElementReferenceString | ElementReferenceObject;
/**
 * The property contains an OID for the ODM Entity with this official name
 */
export type ODMOidReferenceEntityName = string;
export type PersonalDataFieldSemantics =
  | "DataSubjectID"
  | "DataSubjectIDType"
  | "ConsentID"
  | "PurposeID"
  | "ContractRelatedID"
  | "DataControllerID"
  | "UserID"
  | "EndOfBusinessDate"
  | "BlockingDate"
  | "EndOfRetentionDate";
export type PersonalDataFieldSemantics1 = string;
/**
 * Property contains potentially personal data. Properties annotated with `@PersonalData.fieldSemantics` need not be additionally annotated with this annotation. Personal data describes any information which is related to an identified or identifiable natural person (data subject). An identifiable person is one who can be identified, directly or indirectly, in particular by a reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.
 */
export type PersonalDataIsPotentiallyPersonal = boolean;
/**
 * Property contains potentially sensitive personal data. Sensitive personal data is a category of personal data that needs special handling. The determination which personal data is sensitive may differ for different legal areas or industries.
 * Examples of sensitive personal data:
 * -	Special categories of personal data, such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, data concerning health or sex life or sexual orientation.
 * -	Personal data subject to professional secrecy
 * -	Personal data relating to criminal or administrative offenses
 * -	Personal data concerning insurances and bank or credit card accounts
 */
export type PersonalDataIsPotentiallySensitive = boolean;
/**
 * The property contains a currency code.
 */
export type SemanticsCurrencyCode = true;
/**
 * The element contains an amount. The annotation points to an element containing the currency code.
 */
export type ElementReference2 = ElementReferenceString | ElementReferenceObject;
/**
 * The property contains a unit of measure.
 */
export type SemanticsUnitOfMeasure = true;
/**
 * The element contains a quantity.
 * The annotation points to an element containing the unit of measure.
 */
export type ElementReference3 = ElementReferenceString | ElementReferenceObject;
export type SemanticsCalendarDayOfMonth = true;
export type SemanticsCalendarDayOfYear = true;
export type SemanticsCalendarWeek = true;
export type SemanticsCalendarMonth = true;
export type SemanticsCalendarQuarter = true;
export type SemanticsCalendarHalfyear = true;
export type SemanticsCalendarYear = true;
export type SemanticsCalendarYearWeek = true;
export type SemanticsCalendarYearMonth = true;
export type SemanticsCalendarYearQuarter = true;
export type SemanticsCalendarYearHalfyear = true;
export type SemanticsFiscalYearVariant = true;
export type SemanticsFiscalPeriod = true;
export type SemanticsFiscalYear = true;
export type SemanticsFiscalYearPeriod = true;
export type SemanticsFiscalQuarter = true;
export type SemanticsFiscalYearQuarter = true;
export type SemanticsFiscalWeek = true;
export type SemanticsFiscalYearWeek = true;
export type SemanticsFiscalDayOfYear = true;
/**
 * The property contains a language code.
 */
export type SemanticsLanguage = true;
/**
 * This annotation is used to indicate a date semantic for the NVARCHAR-based ABAP type TIMS.
 */
export type SemanticsTime = true;
/**
 * The property contains a human-readable text.
 */
export type SemanticsText = true;
/**
 * Tags a field containing a GUID in RAW16 or CHAR32 format.
 */
export type SemanticsUuid = true;
/**
 * The property contains a date which is the lower boundary of a (validity) interval (for time dependent master data).
 */
export type SemanticsBusinessDateFrom = true;
/**
 * The property contains a date which is the upper boundary of a (validity) interval (for time dependent master data).
 */
export type SemanticsBusinessDateTo = true;
/**
 * Total number of digits that are present after the decimal point in a number.
 * The scale can hold from zero up to the total numeric precision
 */
export type DecimalScaleNumber = number;
/**
 * The `cds.Decimal` type can also set `scale` to a fixed type.
 *
 * The semantics of the choices follows the [OData v4 Scale](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_Scale) specification.
 */
export type DecimalScaleType = DecimalScaleType1 & DecimalScaleType2;
export type DecimalScaleType1 = "floating";
export type DecimalScaleType2 = string;
/**
 * The operator "="
 */
export type EqualsOperator = "=";
/**
 * The operator "and"
 */
export type ANDOperator = "and";
/**
 * Defines which [Entity Type](#entity-type) the current data object represents.
 *
 * There could be several data objects that are assigned to the same Entity Type.
 * One data object can only have one Entity Type assigned, which corresponds to the applications own Entity Type definition.
 */
export type EntityRelationshipEntityType = string;
/**
 * Defines a list of IDs, which are available to look up the Entity Type or create a reference to it.
 * An Entity Type can have multiple IDs:
 * * There can be **alternative IDs** that can also be used to create a reference to the Entity Type
 * * Some ID properties form a **composite ID** together and need to be combined to function as a unique ID for references
 * * This is indicated by a [`propertyTypes`](#property-type) array with more than one Property Type ID entry.
 */
export type EntityRelationship1 = EntityID[];
/**
 * Name of the property in the local Entity Type
 */
export type LocalPropertyName = string;
/**
 * Defines one or many references to other Entity Types based on a composite IDs.
 */
export type EntityRelationship2 = CompositeReference[];
/**
 * Defines a list of temporal IDs
 */
export type EntityRelationship3 = TemporalID[];
/**
 * Defines a list of temporal references
 */
export type EntityRelationship4 = TemporalReference[];
/**
 * Defines one or many references to other Entity Types based on a composite IDs where some properties of the references are constant values.
 */
export type EntityRelationship5 = ReferenceWithConstantID[];
/**
 * Entity is the root of a compositional hierarchy.
 */
export type ObjectModelCompositionRoot = boolean;
/**
 * In case of multiple key elements: key element which represents the entity (in the sense that the entity itself is the list of values for this key element)
 */
export type ElementReference4 = ElementReferenceString | ElementReferenceObject;
/**
 * The property declares the supported usage type for this entity in the context of consuming data models.
 */
export type ObjectModel2 = SupportedCapabilitiesEnumValue[];
/**
 * The entity represents an ODM Entity with this official name.
 */
export type ODMEntityName = string;
/**
 * The annotation references the element which contains the oid.
 */
export type ElementReference5 = ElementReferenceString | ElementReferenceObject;
export type PersonalDataEntitySemantics = "DataSubject" | "DataSubjectDetails" | "Other";
export type PersonalDataEntitySemantics1 = string;
/**
 * Role of the data subjects in this set (e.g. employee, customer). Values are application-specific.
 */
export type PersonalDataDataSubjectRole = string;
/**
 * Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific.
 */
export type PersonalDataDataSubjectRoleDescription = string;
/**
 * In CSN it is possible to define [Custom Types](#custom-type).
 * They can be referred to in [Element](#elemententry) `type`, making them "reusable" / "shared" types.
 *
 * In CSN Interop Effective, the "effective" quality brings additional requirements:
 *
 * - The derived types MUST always have a `cds.*` type and MUST NOT point to other derived types.
 *   This ensures that consumers do not have to support recursive type lookups.
 *
 * - Attributes and annotations MUST be also copied and merged with those defined in the [element](#elemententry) using this derived type.
 *   This ensures that consumers only have to lookup the CDS type and don't have to merge attributes and annotations.
 */
export type TypeDefinition =
  | BooleanTypeDefinition
  | StringTypeDefinition
  | LargeStringTypeDefinition
  | IntegerTypeDefinition
  | Integer64TypeDefinition
  | DecimalTypeDefinition
  | DoubleTypeDefinition
  | DateTypeDefinition
  | TimeTypeDefinition
  | DateTimeTypeDefinition
  | TimestampTypeDefinition
  | UUIDTypeDefinition
  | AssociationTypeDefinition
  | CompositionTypeDefinition;

/**
 * Root of the CSN Interop Effective JSON document.
 *
 * See [Primer: Root Level Structure](../primer.md#root-level-structure).
 */
export interface CSNInteropRoot {
  /**
   * Link to JSON Schema for this CSN Interop Effective document.
   * Adding this helps with automatic validation and code intelligence in some editors / IDEs.
   *
   * See https://tour.json-schema.org/content/06-Combining-Subschemas/02-id-and-schema
   *
   */
  $schema?: ("https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json" | string) &
    string;
  /**
   * Optional URI for this document, that can acts as an ID or as location to retrieve the document.
   *
   * See https://tour.json-schema.org/content/06-Combining-Subschemas/02-id-and-schema
   *
   */
  $id?: string;
  /**
   * Existence of this property indicated that the file is a CSN Interop Effective document.
   * The value states the specification version it has been created against.
   */
  csnInteropEffective: "1.0";
  /**
   * The version of the CDS CSN. For this version of CSN Interop it is fixed to `2.0`.
   *
   * This MUST be provided to ensure that CSN Interop is a valid subset of CDS CSN in general.
   */
  $version: "2.0";
  meta?: Meta;
  definitions: Definitions;
  i18n?: I18N;
  /**
   * Private properties, starting with `__`.
   *
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   *
   */
  [k: PrivatePropertyKey]: unknown;
}
/**
 * Meta information that apply to the CSN document as a whole.
 */
export interface Meta {
  /**
   * Informal description of the creator of this CSN Document.
   */
  creator?: string;
  /**
   * Informal hint which CSN flavor is used. The values are currently NOT standardized.
   *
   * A CSN flavor can be understood as an alias to particular [feature set](#) of CSN overall.
   * In CSN Interop we leave some features open and to be defined in the document itself, this is why we don't have a fixed flavor.
   */
  flavor?: string;
  document?: DocumentMetadata;
  features?: FeaturesMetadata;
  /**
   * Private properties, starting with `__`.
   *
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   *
   */
  [k: PrivatePropertyKey]: unknown;
}
/**
 * Metadata that describes the document (and what it represents) itself.
 */
export interface DocumentMetadata {
  /**
   * The version of the CSN document / the described model itself (not the specification).
   *
   * We RECOMMEND to use the [SemVer](https://semver.org/) standard.
   */
  version?: string;
  /**
   * Human readable title for the CSN document (plain-text).
   *
   * MUST NOT contain linebreaks.
   */
  title?: string;
  /**
   * Human readable documentation that describes the overall CSN document.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   */
  doc?: string;
}
/**
 * CSN feature-dimensions this document fulfills.
 *
 * It is RECOMMENDED to explicitly state all feature dimensions of the document.
 * Otherwise the consumer cannot rely on the information and may have to figure this out on his own.
 */
export interface FeaturesMetadata {
  /**
   * Whether this document is complete and self-contained.
   *
   * It is RECOMMENDED to have complete CSN documents and set this to `true`.
   *
   * If true references to other CDS elements (e.g. `cds.Association`) MUST be resolvable within the same document.
   */
  complete?: boolean;
}
/**
 * Dictionary of CSN modeling artifacts.
 *
 */
export interface Definitions {
  [k: string]: DefinitionEntry;
}
/**
 * A context corresponds to a CAP CSN Namespace. It is used to create a bounded context that bundles elements of different kinds together.
 * The context will become part of the entity / element name.
 *
 * The context is also useful to avoid local or global name collisions.
 *
 * See [Primer: Context](../primer.md#context-definitions).
 */
export interface ContextDefinition {
  /**
   * The modeling artefact is a context.
   */
  kind: ContextKind;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * Entity definition refers to the structured description of an object or concept.
 *
 * If it is exposed through a [Service](#service-definition), it describes a data model.
 * To expose it through a Service, the service name MUST be prefixed to the Entity name, separated by a `.` (dot).
 * The actual data serialization format is defined by the Service protocol and chosen data format [mapping](../mappings).
 *
 * If the entity is not exposed via a service, it only describes a conceptual domain object.
 */
export interface EntityDefinition {
  /**
   * The modeling artefact is an entity.
   */
  kind: EntityKind;
  elements: ElementDefinitions;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  /**
   * Proper syntax element in ABAP CDS producing Abstract CDS Entities
   */
  abstract?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * Proper syntax element in ABAP CDS producing Custom CDS Entities
   */
  customEntity?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * Proper syntax element in ABAP CDS producing CDS Table Functions.
   */
  tableFunction?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * Proper syntax element in ABAP CDS producing CDS  External Entities
   */
  externalEntity?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * ABAP CDS Projection have the additional information of a provider contract
   */
  providerContract?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * ABAP CDS Root View Entities define a RAP Business Object.
   */
  rootEntity?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * Special kind of analytical ABAP CDS Projection view.
   */
  transient?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * In the selection element list of a CDS view.
   */
  literal?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * When redirecting associations in ABAP CDS Projections with the additional keywords "to composition child", this indicates a Parent-Child-Composition an requires the redirection target to have a matching "to parent" association redefinition.
   */
  toCompositionChild?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * When redirecting associations in ABAP CDS Projections with the additional keywords "to composition child", this indicates a Parent-Child-Composition an requires the redirection target to have a matching "to parent" association redefinition.
   */
  toParent?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  /**
   * Contains the SQL on condition as string
   */
  hana_on_asString?:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown | undefined;
      };
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.entityType"?: EntityRelationshipEntityType;
  "@EntityRelationship.entityIds"?: EntityRelationship1;
  "@EntityRelationship.compositeReferences"?: EntityRelationship2;
  "@EntityRelationship.temporalIds"?: EntityRelationship3;
  "@EntityRelationship.temporalReferences"?: EntityRelationship4;
  "@EntityRelationship.referencesWithConstantIds"?: EntityRelationship5;
  "@ObjectModel.compositionRoot"?: ObjectModelCompositionRoot;
  "@ObjectModel.representativeKey"?: ElementReference4;
  "@ObjectModel.modelingPattern"?: ObjectModel1;
  "@ObjectModel.supportedCapabilities"?: ObjectModel2;
  "@ODM.entityName"?: ODMEntityName;
  "@ODM.oid"?: ElementReference5;
  /**
   * Primary meaning of the entities in the annotated entity set. Entities annotated with @PersonalData.entitySemantics are synonymous to @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.entitySemantics"?: PersonalDataEntitySemantics & PersonalDataEntitySemantics1;
  "@PersonalData.dataSubjectRole"?: PersonalDataDataSubjectRole;
  "@PersonalData.dataSubjectRoleDescription"?: PersonalDataDataSubjectRoleDescription;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * Dictionary of Element where the key is the name of the element and the value its definition.
 *
 * The value can either be a standard [CDS Type](#cds-type) (`cds.*`) or a [Custom Type](#custom-type).
 *
 * Element names MUST:
 * - Not be an empty string.
 * - Not start with `@`, `__`, `::`.
 * - Not end with `::`.
 * - Not contain the substring `.` or `:::`.
 * - Not contain the substring `::` more than once.
 */
export interface ElementDefinitions {
  [k: string]: ElementEntry;
}
/**
 * An element of type `cds.Boolean`.
 */
export interface BooleanType {
  /**
   * The modeling artefact is a `cds.Boolean` type.
   */
  type: BooleanCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueBoolean;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
export interface DefaultValueBoolean {
  /**
   * Default Value for Boolean Type.
   */
  val: boolean | null;
}
/**
 * The element shall per default be aggregated using the annotated SQL aggregate function.
 *
 * The chosen value defines which aggregation semantics should be applied.
 * The aggregation types SUM, MAX, MIN, NOP are only allowed for elements with numeric type
 *
 * > ℹ️ Note: There is an semantically equivalent annotation `@DefaultAggregation`, which is now obsolete.
 * > As consumers are not expected to interpret `@DefaultAggregation`, providers shall consistently adopt `@Aggregation.default` for interoperability.
 */
export interface Aggregation {
  /**
   * Provide the value in `{ "#": "<value>" }` enum notation.
   */
  "#": "NONE" | "SUM" | "MIN" | "MAX" | "AVG" | "COUNT_DISTINCT" | "NOP" | "FORMULA";
}
/**
 * Specifies in which way a measure should treated.
 */
export interface AnalyticsDetails {
  /**
   * Provide the value in `{ "#": "<value>" }` enum notation.
   */
  "#": "BASE" | "RESTRICTION" | "CALCULATION";
}
export interface ConsumptionValueHelpDefinition {
  entity?: ConsumptionValueHelpDefinition1;
  /**
   * Additional bindings for filtering the value help result list.
   */
  additionalBinding?: AdditionalBinding[];
  /**
   * Reference to the modelled association (in local entity) for which the target view represents the value help providing view or entity for the annotated local field. The on-condition of the association may only contain bindings of the source and target fields that use an equal operator. All these bindings are automatically considered by the value help for both filter and result mappings.
   * Mutually exclusive to the usage of `valueHelpDefinition.entity`.
   */
  association?: {
    [k: string]: unknown | undefined;
  };
  /**
   * Specifies whether the value help result list shall only contain distinct values for the annotated field or parameter.
   * If set to true all mappings will be used for filtering, but only the value for the field/parameter which the value help was requested for will be returned by the value help.
   */
  distinctValues?: boolean;
}
/**
 * Value help defining view or entity.
 */
export interface ConsumptionValueHelpDefinition1 {
  /**
   * Name of the value help providing view or entity
   */
  name?: string;
  /**
   * Name of the field of the value help view or entity, which the annotated local field or parameter is bound to.
   *
   * Mutually exclusive to the usage of `valueHelpDefinition.association`.
   */
  element?: string;
}
/**
 * Allows to define additional bindings (besides the ones defined by `valueHelpDefinition.association` or `valueHelpDefinition.entity`) for filtering the value help result list and/or returning values from the selected value help record.
 */
export interface AdditionalBinding {
  /**
   * Field of the current view/entity; mutually exclusive to the usage of `localParameter`.
   */
  localElement?: string;
  /**
   * Name of the field of the value help view or entity, which the annotated local field or parameter is bound to.
   */
  element?: string;
  usage?: ConsumptionConsumptionValueHelpDefinitionAdditionalBinding;
}
/**
 * The binding may either specify an additional filter-criterion on the value help list (`#FILTER`), or an additional result mapping for the selected value help record (`#RESULT`) or a combination thereof (`#FILTER_AND_RESULT`).
 * If not specified explicitly the usage is `#FILTER_AND_RESULT`.
 * If distinctValues is set to true, additional bindings must specify the usage as `#FILTER`.
 */
export interface ConsumptionConsumptionValueHelpDefinitionAdditionalBinding {
  /**
   * Provide the value in `{ "#": "<value>" }` enum notation.
   */
  "#": "FILTER" | "RESULT" | "FILTER_AND_RESULT";
}
/**
 * Defines a reference to another Entity Type based on a single ID.
 */
export interface ReferenceTarget {
  /**
   * Optional name to describe the semantics of the reference.
   */
  name?: string;
  referencedEntityType: EntityTypeID;
  referencedPropertyType: PropertyTypeID;
  [k: string]: unknown | undefined;
}
/**
 * Element reference to an element within the current entity, using RECOMMENDED object notation.
 *
 * The referenced element MUST exist locally in the same entity.
 *
 * ```js
 * "<definition name>": {
 *   "<annotation key of type ElementReference>": {"=": "<element name>"}
 * ```
 */
export interface ElementReferenceObject {
  /**
   * This is the references elements name.
   */
  "=": string;
}
/**
 * An element of type `cds.String`.
 */
export interface StringType {
  /**
   * The modeling artefact is a `cds.String` type.
   */
  type: StringCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Describes the maximum number of characters of the value.
   * If not provided, **unlimited** length is assumed.
   */
  length?: number;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
export interface DefaultValueString {
  /**
   * Default Value for String Types.
   */
  val: string | null;
}
/**
 * Dictionary of enum member elements with the name being the enum symbol and the value being a CQN literal value expression.
 */
export interface EnumDictionary {
  [k: string]: ValueObject;
}
/**
 * Enum CQN literal value expression.
 *
 * The literal expression optionally specifies a constant val as a literal plus optional annotations.
 *
 * This interface was referenced by `EnumDictionary`'s JSON-Schema definition
 * via the `patternProperty` "^.+$".
 */
export interface ValueObject {
  /**
   * Value of the enum.
   */
  val?: string | number | boolean | null;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.LargeString`.
 */
export interface LargeStringType {
  /**
   * The modeling artefact is a `cds.LargeString` type.
   */
  type: LargeStringCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Describes the maximum number of characters of the value.
   * If not provided, **unlimited** length is assumed.
   */
  length?: number;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * Signed integer with 32 bit.
 */
export interface IntegerType {
  /**
   * The modeling artefact is a `cds.Integer` type.
   */
  type: IntegerCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueInteger;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
export interface DefaultValueInteger {
  /**
   * Default Value for Integer Type.
   */
  val: number | null;
}
/**
 * Signed integer with 64 bit.
 */
export interface Integer64Type {
  /**
   * The modeling artefact is a `cds.Integer64` type.
   */
  type: Integer64CdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueInteger;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.Decimal`.
 */
export interface DecimalType {
  /**
   * The modeling artefact is a `cds.Decimal` type.
   */
  type: DecimalCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueNumber;
  enum?: EnumDictionary;
  /**
   * Total number of digits in a number.
   * This includes both the digits before and after the decimal point.
   *
   * The semantics of the choices follows the [OData v4 Precision](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_Precision) specification.
   */
  precision?: number;
  /**
   * Describes the number of digits to the right of the decimal point in a number.
   */
  scale?: DecimalScaleNumber | DecimalScaleType;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
export interface DefaultValueNumber {
  /**
   * Default Value for DecimalScaleNumber: Type.
   */
  val: number | null;
}
/**
 * An element of type `cds.Double`.
 */
export interface DoubleType {
  /**
   * The modeling artefact is a `cds.Double` type.
   */
  type: DoubleCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueNumber;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.Date`.
 */
export interface DateType {
  /**
   * The modeling artefact is a `cds.Date` type.
   */
  type: DateCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.Time`.
 */
export interface TimeType {
  /**
   * The modeling artefact is a `cds.Time` type.
   */
  type: TimeCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.DateTime`.
 */
export interface DateTimeType {
  /**
   * The modeling artefact is a `cds.DateTime` type.
   */
  type: DateTimeCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.Timestamp`.
 */
export interface TimestampType {
  /**
   * The modeling artefact is a `cds.Timestamp` type.
   */
  type: TimestampCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.UUID`.
 */
export interface UUIDType {
  /**
   * The modeling artefact is a `cds.UUID` type.
   */
  type: UUIDCdsType;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * An element of type `cds.Association`, to express a "reference" relation across Entities.
 * It works the same way as a [`cds.Composition`](#composition-type), with the difference that the latter assumes a composite relationship.
 *
 * See [Primer: Associations](../primer.md#associations).
 */
export interface AssociationType {
  /**
   * The modeling artefact is a `cds.Association` type.
   */
  type: AssociationCdsType;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  /**
   * The (fully qualified) target entity name.
   */
  target: string;
  cardinality: CardinalityObject;
  /**
   * The property `on` holds a sequence of operators and operands to describe the join condition.
   *
   * One building block of the sequence consists of the following in the given order:
   * - Reference to a field of the association or composition target
   * - Equals Operator "="
   * - One of the following:
   *   - Reference to a field of the source entity
   *   - Constant Value
   *
   * This building block states that the value of the first entry of the array using "ref" should equal the value of the third entry of the array.
   * In addition, several building blocks can be lined up using an "and" operator.
   *
   * See also [CAP documentation](https://cap.cloud.sap/docs/cds/csn#assoc-on).
   */
  on: (StructuredElementReference | EqualsOperator | ANDOperator | OnValue)[];
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * The cardinality indicates the number of instances of one entity that can or must be associated with each instance of another entity.
 *
 * SHOULD provide `min` and `max` values explicitly.
 */
export interface CardinalityObject {
  /**
   * Set to `1` to give a hint to database optimizers, that the relationship is "one to".
   *
   * If `src` is not set then it is unknown and "many to" MAY be assumed.
   */
  src?: number;
  /**
   * Specifies the targets minimum cardinality.
   */
  min?: number;
  /**
   * Specifies the targets maximum cardinality.
   *
   * MUST be one of:
   * - positive Integer (1,2,...)
   * - `*` as String
   */
  max?: number | string;
}
/**
 * Describes the target or source of the association.
 */
export interface StructuredElementReference {
  /**
   * Description of the target with *association name* and *target element name* in target entity`
   * Description of the source *source element name*
   *
   * MUST NOT:
   * - use $ as leading character of an element
   * - use session variables
   */
  ref: string[];
}
/**
 * Value for an on condition
 */
export interface OnValue {
  /**
   * Value for the on condition.
   */
  val: string | number;
}
/**
 * An element of type `cds.Composition`, to express a "contains" relation across Entities.
 * It works the same as a [`cds.Association`](#association-type).
 *
 * See [Primer: Associations](../primer.md#associations).
 */
export interface CompositionType {
  /**
   * The modeling artefact is a `cds.Composition` type.
   */
  type: CompositionCdsType;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  /**
   * The (fully qualified) target entity name.
   */
  target: string;
  cardinality: CardinalityObject1;
  /**
   * The property `on` holds a sequence of operators and operands to describe the join condition.
   *
   * One building block of the sequence consists of the following in the given order:
   * - Reference to a field of the association or composition target
   * - Equals Operator "="
   * - One of the following:
   *   - Reference to a field of the source entity
   *   - Constant Value
   *
   * This building block states that the value of the first entry of the array using "ref" should equal the value of the third entry of the array.
   * In addition, several building blocks can be lined up using an "and" operator.
   *
   * See also [CAP documentation](https://cap.cloud.sap/docs/cds/csn#assoc-on).
   */
  on: (StructuredElementReference | EqualsOperator | ANDOperator | OnValue)[];
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * The cardinality indicates the number of instances of one entity that can or must be associated with each instance of another entity.
 *
 * SHOULD provide `min` and `max` values explicitly.
 */
export interface CardinalityObject1 {
  /**
   * Set to `1` to give a hint to database optimizers, that the relationship is "one to".
   *
   * If `src` is not set then it is unknown and "many to" MAY be assumed.
   */
  src?: number;
  /**
   * Specifies the targets minimum cardinality.
   */
  min?: number;
  /**
   * Specifies the targets maximum cardinality.
   *
   * MUST be one of:
   * - positive Integer (1,2,...)
   * - `*` as String
   */
  max?: number | string;
}
/**
 * An Element can be of a Custom Type (aka Derived Type) instead of a standard [CDS type](#cds-type).
 * This allows several Elements to share / reuse the same Custom Type definition.
 * This MAY also imply shared semantics.
 *
 * The Custom Type has a custom `type` value, which is the name of the [Type Definition](#type-definition) describing the shared type.
 * This `type` value MUST NOT start with `cds.`, to avoid conflicts with core CDS data types.
 *
 * The Type Definition that the Custom Type points to MUST be described in the same CSN document in the [definitions](#definitions) section with `"kind": "type"`.
 * The [Element](#elemententry) MUST NOT add properties that are not supported by the Custom Types base CDS type.
 *
 * CSN Interop Effective adds further constraints to make a simple type lookup possible:
 *
 * - A Custom Type MUST NOT point to another Custom Type (no recursion).
 * - The properties and annotations of the Custom Type MUST be merged into the Element it is used, to fulfill the "effective" quality.
 *
 * This will allow a consumer to do a simple dictionary lookup to find the [CDS Type](#cds-type) of a Custom Type.
 * All other properties describing the Custom Type can already be found at the Custom Type itself.
 *
 * > 🚧 TODO: Clarify if Custom Type can also be `cds.Association` or `cds.Composition`.
 * > If yes, add `target`, `on` and `cardinality` here.
 *
 */
export interface CustomType {
  /**
   * Use of a custom type. MUST not start with `cds.`.
   */
  type: CustomTypeValue;
  /**
   * Indicates that this element is used as a primary key.
   * Multiple primary keys MAY be used in case of a composite ID.
   */
  key?: boolean;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueCustomType;
  enum?: EnumDictionary;
  /**
   * Describes the maximum number of characters of the value.
   * If not provided, **unlimited** length is assumed.
   */
  length?: number;
  /**
   * Describes the number of digits to the right of the decimal point in a number.
   */
  scale?: DecimalScaleNumber | DecimalScaleType;
  /**
   * Total number of digits in a number.
   * This includes both the digits before and after the decimal point.
   *
   * The semantics of the choices follows the [OData v4 Precision](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_Precision) specification.
   */
  precision?: number;
  "@Aggregation.default"?: Aggregation;
  "@AnalyticsDetails.measureType"?: AnalyticsDetails;
  "@Consumption.valueHelpDefinition"?: Consumption;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.heading"?: EndUserTextHeading;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@EntityRelationship.propertyType"?: EntityRelationshipPropertyType;
  "@EntityRelationship.reference"?: EntityRelationship;
  "@ObjectModel.semanticKey"?: ObjectModel;
  "@ObjectModel.foreignKey.association"?: ElementReference;
  "@ObjectModel.text.element"?: ObjectModelText;
  "@ObjectModel.text.association"?: ElementReference1;
  "@ODM.oidReference.entityName"?: ODMOidReferenceEntityName;
  /**
   * Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with fieldSemantics need not be additionally annotated with @PersonalData.isPotentiallyPersonal.
   */
  "@PersonalData.fieldSemantics"?: PersonalDataFieldSemantics & PersonalDataFieldSemantics1;
  "@PersonalData.isPotentiallyPersonal"?: PersonalDataIsPotentiallyPersonal;
  "@PersonalData.isPotentiallySensitive"?: PersonalDataIsPotentiallySensitive;
  "@Semantics.currencyCode"?: SemanticsCurrencyCode;
  "@Semantics.amount.currencyCode"?: ElementReference2;
  "@Semantics.unitOfMeasure"?: SemanticsUnitOfMeasure;
  "@Semantics.quantity.unitOfMeasure"?: ElementReference3;
  "@Semantics.calendar.dayOfMonth"?: SemanticsCalendarDayOfMonth;
  "@Semantics.calendar.dayOfYear"?: SemanticsCalendarDayOfYear;
  "@Semantics.calendar.week"?: SemanticsCalendarWeek;
  "@Semantics.calendar.month"?: SemanticsCalendarMonth;
  "@Semantics.calendar.quarter"?: SemanticsCalendarQuarter;
  "@Semantics.calendar.halfyear"?: SemanticsCalendarHalfyear;
  "@Semantics.calendar.year"?: SemanticsCalendarYear;
  "@Semantics.calendar.yearWeek"?: SemanticsCalendarYearWeek;
  "@Semantics.calendar.yearMonth"?: SemanticsCalendarYearMonth;
  "@Semantics.calendar.yearQuarter"?: SemanticsCalendarYearQuarter;
  "@Semantics.calendar.yearHalfyear"?: SemanticsCalendarYearHalfyear;
  "@Semantics.fiscal.yearVariant"?: SemanticsFiscalYearVariant;
  "@Semantics.fiscal.period"?: SemanticsFiscalPeriod;
  "@Semantics.fiscal.year"?: SemanticsFiscalYear;
  "@Semantics.fiscal.yearPeriod"?: SemanticsFiscalYearPeriod;
  "@Semantics.fiscal.quarter"?: SemanticsFiscalQuarter;
  "@Semantics.fiscal.yearQuarter"?: SemanticsFiscalYearQuarter;
  "@Semantics.fiscal.week"?: SemanticsFiscalWeek;
  "@Semantics.fiscal.yearWeek"?: SemanticsFiscalYearWeek;
  "@Semantics.fiscal.dayOfYear"?: SemanticsFiscalDayOfYear;
  "@Semantics.language"?: SemanticsLanguage;
  "@Semantics.time"?: SemanticsTime;
  "@Semantics.text"?: SemanticsText;
  "@Semantics.uuid"?: SemanticsUuid;
  "@Semantics.businessDate.from"?: SemanticsBusinessDateFrom;
  "@Semantics.businessDate.to"?: SemanticsBusinessDateTo;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
export interface DefaultValueCustomType {
  /**
   * Default Value for a [Custom Type](#custom-type).
   *
   * The chosen value type MUST match the [CDS Type](#cds-type) that the custom type chose.
   */
  val:
    | string
    | number
    | boolean
    | {
        [k: string]: unknown | undefined;
      }
    | null;
}
/**
 * Defines an ID that can be used to look up the Entity Type or create a reference to it.
 */
export interface EntityID {
  /**
   * Optional name to describe the semantics of the ID.
   */
  name?: string;
  /**
   * Optional description to describe the semantics of the ID.
   */
  description?: string;
  /**
   * List of [Property Type](#property-type) IDs.
   */
  propertyTypes: PropertyTypeID[];
  [k: string]: unknown | undefined;
}
/**
 * Defines single a reference to another Entity Type based on a composite ID.
 */
export interface CompositeReference {
  /**
   * Optional name to describe the semantics of the reference.
   */
  name?: string;
  referencedEntityType: EntityTypeID;
  /**
   * List of properties, the composite ID consists of.
   */
  referencedPropertyTypes: ReferencedPropertyType[];
  [k: string]: unknown | undefined;
}
/**
 * Grouping of the ID in the referenced entity, by its property type ID and the local name in this entity.
 */
export interface ReferencedPropertyType {
  referencedPropertyType: PropertyTypeID;
  localPropertyName: LocalPropertyName;
  [k: string]: unknown | undefined;
}
/**
 * Defines an ID that includes a temporal interval.
 */
export interface TemporalID {
  /**
   * Optional name to describe the semantics of the ID.
   */
  name?: string;
  /**
   * Optional description to describe the semantics of the ID.
   */
  description?: string;
  /**
   * List of [Property Type](#property-type) IDs that are non-temporal.
   */
  propertyTypes: PropertyTypeID[];
  /**
   * Interval which includes the boundaries.
   */
  temporalIntervalType: "CLOSED_CLOSED" | "OPEN_OPEN" | "OPEN_CLOSED" | "CLOSED_OPEN";
  /**
   * Temporal type.
   */
  temporalType: "DATE" | "DATETIME";
  temporalIntervalStartProperty: LocalPropertyName;
  temporalIntervalEndProperty: LocalPropertyName;
  [k: string]: unknown | undefined;
}
/**
 * Defines single temporal reference to another Entity Type.
 */
export interface TemporalReference {
  /**
   * Optional name to describe the semantics of the reference.
   */
  name?: string;
  referencedEntityType: EntityTypeID;
  /**
   * List of non-temporal properties the composite temporal ID consists of.
   */
  referencedPropertyTypes: ReferencedPropertyType[];
  /**
   * Category of the temporal reference.
   */
  category: "TEMPORAL_DATE";
  selectionDateProperty: LocalPropertyName;
  [k: string]: unknown | undefined;
}
/**
 * Defines single a reference to another Entity Type based on a composite ID.
 */
export interface ReferenceWithConstantID {
  /**
   * Optional name to describe the semantics of the reference.
   */
  name?: string;
  /**
   * Optional description to describe the semantics of the reference.
   */
  description?: string;
  referencedEntityType: EntityTypeID;
  /**
   * List of properties, the composite ID consists of.
   */
  referencedPropertyTypes: ReferencedPropertyTypeWithConstantID[];
  [k: string]: unknown | undefined;
}
/**
 * Grouping  of the ID in the referenced entity, by its property type ID and either the local name in this entity or a constant value.
 */
export interface ReferencedPropertyTypeWithConstantID {
  referencedPropertyType: PropertyTypeID;
  localPropertyName?: LocalPropertyName;
  /**
   * String serialization of the constant value of the property in the referenced entity.
   */
  constantValue?: string;
  [k: string]: unknown | undefined;
}
/**
 * The property declares the modeling pattern applied in this entity definition.
 */
export interface ObjectModel1 {
  /**
   * Provide the value in `{ "#": "<value>" }` enum notation.
   */
  "#":
    | "DATA_STRUCTURE"
    | "LANGUAGE_DEPENDENT_TEXT"
    | "UNIT_CONVERSION_RATE"
    | "VALUE_HELP_PROVIDER"
    | "COLLECTIVE_VALUE_HELP"
    | "DERIVATION_FUNCTION"
    | "PARENT_CHILD_HIERARCHY_NODE_PROVIDER"
    | "ENTERPRISE_SEARCH_PROVIDER"
    | "TRANSACTIONAL_INTERFACE"
    | "TRANSACTIONAL_QUERY"
    | "ANALYTICAL_QUERY"
    | "ANALYTICAL_DOCUMENT_STORE"
    | "ANALYTICAL_CUBE"
    | "ANALYTICAL_DIMENSION"
    | "ANALYTICAL_FACT"
    | "ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"
    | "ANALYTICAL_KPI"
    | "OUTPUT_FORM_DATA_PROVIDER"
    | "OUTPUT_EMAIL_DATA_PROVIDER"
    | "OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"
    | "SITUATION_ANCHOR"
    | "SITUATION_TRIGGER"
    | "SITUATION_DATACONTEXT"
    | "EXTERNAL_DATA_PROVIDER"
    | "NONE";
}
export interface SupportedCapabilitiesEnumValue {
  /**
   * The entry declares one supported usage type.
   */
  "#":
    | "SQL_DATA_SOURCE"
    | "CDS_MODELING_DATA_SOURCE"
    | "CDS_MODELING_ASSOCIATION_TARGET"
    | "DATA_STRUCTURE"
    | "LANGUAGE_DEPENDENT_TEXT"
    | "UNIT_CONVERSION_RATE"
    | "VALUE_HELP_PROVIDER"
    | "COLLECTIVE_VALUE_HELP"
    | "EXTRACTION_DATA_SOURCE"
    | "DERIVATION_FUNCTION"
    | "PARENT_CHILD_HIERARCHY_NODE_PROVIDER"
    | "SEARCHABLE_ENTITY"
    | "ENTERPRISE_SEARCH_PROVIDER"
    | "TRANSACTIONAL_PROVIDER"
    | "ANALYTICAL_QUERY"
    | "ANALYTICAL_DOCUMENT_STORE"
    | "ANALYTICAL_DIMENSION"
    | "ANALYTICAL_PROVIDER"
    | "ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"
    | "ANALYTICAL_KPI"
    | "OUTPUT_FORM_DATA_PROVIDER"
    | "OUTPUT_EMAIL_DATA_PROVIDER"
    | "OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"
    | "SITUATION_ANCHOR"
    | "SITUATION_TRIGGER"
    | "SITUATION_DATACONTEXT"
    | "KEY_USER_COPYING_TEMPLATE"
    | "EXTERNAL_DATA_PROVIDER"
    | "ODM_COMPLIANT_PROVIDER";
}
/**
 * A CDS Service indicates that [Entities](#entity-definition) are exposed to outside consumers via an API.
 *
 * To assign Entities to a Service, the entity name MUST be prefixed with the service name, separated by a `.`.
 * Please be aware that this will also change the `target` values of `cds.Association` and `cds.Composition`.
 * For an example, see [airline-service.json](./examples/airline.md).
 *
 * A consumer MAY decide to shorten the names by only considering the Entities assigned to a particular Service and then removing the Service prefixes again.
 *
 * To indicate which assigned Entities are root in a composition hierarchy, use the [`@ObjectModel.compositionRoot`](../annotations/objectmodel#objectmodelcompositionroot) annotation.
 *
 * See [Primer: Service Definitions](../primer.md#service-definitions).
 */
export interface ServiceDefinition {
  /**
   * The modeling artefact is a service.
   */
  kind: ServiceKind;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  "@EndUserText.label"?: EndUserTextLabel;
  "@EndUserText.quickInfo"?: EndUserTextQuickInfo;
  "@ObjectModel.representativeKey"?: ElementReference4;
  "@ObjectModel.modelingPattern"?: ObjectModel1;
  "@ObjectModel.supportedCapabilities"?: ObjectModel2;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Boolean`.
 */
export interface BooleanTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Boolean` type.
   */
  type: BooleanCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueBoolean;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.String`.
 */
export interface StringTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.String` type.
   */
  type: StringCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Describes the maximum number of characters of the value.
   * If not provided, **unlimited** length is assumed.
   */
  length?: number;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.LargeString`.
 */
export interface LargeStringTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.LargeString` type.
   */
  type: LargeStringCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Describes the maximum number of characters of the value.
   * If not provided, **unlimited** length is assumed.
   */
  length?: number;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Integer`.
 */
export interface IntegerTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Integer` type.
   */
  type: IntegerCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueInteger;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Integer64`.
 */
export interface Integer64TypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Integer64` type.
   */
  type: Integer64CdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueInteger;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Decimal`.
 */
export interface DecimalTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Decimal` type.
   */
  type: DecimalCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueNumber;
  enum?: EnumDictionary;
  /**
   * Total number of digits in a number.
   * This includes both the digits before and after the decimal point.
   *
   * The semantics of the choices follows the [OData v4 Precision](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_Precision) specification.
   */
  precision?: number;
  /**
   * Describes the number of digits to the right of the decimal point in a number.
   */
  scale?: DecimalScaleNumber | DecimalScaleType;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Double`.
 */
export interface DoubleTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Double` type.
   */
  type: DoubleCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueNumber;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Date`.
 */
export interface DateTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Date` type.
   */
  type: DateCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Time`.
 */
export interface TimeTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Time` type.
   */
  type: TimeCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.DateTime`.
 */
export interface DateTimeTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.DateTime` type.
   */
  type: DateTimeCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Timestamp`.
 */
export interface TimestampTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Timestamp` type.
   */
  type: TimestampCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  enum?: EnumDictionary;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.UUID`.
 */
export interface UUIDTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.UUID` type.
   */
  type: UUIDCdsType;
  /**
   * Indicates that this element does not accept NULL values, which means that you cannot insert or update a record without adding a value to this field.
   */
  notNull?: boolean;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  default?: DefaultValueString;
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * A type definition of type `cds.Association`.
 */
export interface AssociationTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Association` type.
   */
  type: AssociationCdsType;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  /**
   * The (fully qualified) target entity name.
   */
  target: string;
  cardinality: CardinalityObject2;
  /**
   * The property `on` holds a sequence of operators and operands to describe the join condition.
   *
   * One building block of the sequence consists of the following in the given order:
   * - Reference to a field of the association or composition target
   * - Equals Operator "="
   * - One of the following:
   *   - Reference to a field of the source entity
   *   - Constant Value
   *
   * This building block states that the value of the first entry of the array using "ref" should equal the value of the third entry of the array.
   * In addition, several building blocks can be lined up using an "and" operator.
   *
   * See also [CAP documentation](https://cap.cloud.sap/docs/cds/csn#assoc-on).
   */
  on: (StructuredElementReference | EqualsOperator | ANDOperator | OnValue)[];
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * The cardinality indicates the number of instances of one entity that can or must be associated with each instance of another entity.
 *
 * SHOULD provide `min` and `max` values explicitly.
 */
export interface CardinalityObject2 {
  /**
   * Set to `1` to give a hint to database optimizers, that the relationship is "one to".
   *
   * If `src` is not set then it is unknown and "many to" MAY be assumed.
   */
  src?: number;
  /**
   * Specifies the targets minimum cardinality.
   */
  min?: number;
  /**
   * Specifies the targets maximum cardinality.
   *
   * MUST be one of:
   * - positive Integer (1,2,...)
   * - `*` as String
   */
  max?: number | string;
}
/**
 * A type definition of type `cds.Composition`.
 */
export interface CompositionTypeDefinition {
  /**
   * The kind property is used when defining derived types. In this case Kind = "type".
   */
  kind: "type";
  /**
   * The modeling artefact is a `cds.Composition` type.
   */
  type: CompositionCdsType;
  /**
   * Human readable documentation, usually for developer documentation.
   *
   * SHOULD be provided and interpreted as [CommonMark](https://spec.commonmark.org/) (Markdown).
   *
   * If a human readable title is needed, use the [@EndUserText.label](../annotations/enduser-text#endusertextlabel) annotation.
   */
  doc?: string;
  /**
   * The (fully qualified) target entity name.
   */
  target: string;
  cardinality: CardinalityObject3;
  /**
   * The property `on` holds a sequence of operators and operands to describe the join condition.
   *
   * One building block of the sequence consists of the following in the given order:
   * - Reference to a field of the association or composition target
   * - Equals Operator "="
   * - One of the following:
   *   - Reference to a field of the source entity
   *   - Constant Value
   *
   * This building block states that the value of the first entry of the array using "ref" should equal the value of the third entry of the array.
   * In addition, several building blocks can be lined up using an "and" operator.
   *
   * See also [CAP documentation](https://cap.cloud.sap/docs/cds/csn#assoc-on).
   */
  on: (StructuredElementReference | EqualsOperator | ANDOperator | OnValue)[];
  /**
   * Annotations or private properties MAY be added.
   *
   * **Annotations** MUST start with `@`.
   *
   * In CSN Interop Effective the annotations MUST follow the "flattened" form:
   * Every record / object in an annotation will be flattened into a `.` (dot).
   * Exception: Once there is an array, the flattening is stopped and the values inside the array are preserved as they are ("structured").
   *
   * Correct annotations examples:
   * - `"@Common.bar": "foo"`
   * - `"@Common.foo.bar": true`
   * - `"@Common.array": [{ "foo": true }]`
   *
   * Or
   *
   * **Private properties**, starting with `__`.
   * MAY be ignored by the consumers, as they have no cross-aligned, standardized semantics.
   */
  [k: PrivatePropertyKey|AnnotationPropertyKey]: unknown;
}
/**
 * The cardinality indicates the number of instances of one entity that can or must be associated with each instance of another entity.
 *
 * SHOULD provide `min` and `max` values explicitly.
 */
export interface CardinalityObject3 {
  /**
   * Set to `1` to give a hint to database optimizers, that the relationship is "one to".
   *
   * If `src` is not set then it is unknown and "many to" MAY be assumed.
   */
  src?: number;
  /**
   * Specifies the targets minimum cardinality.
   */
  min?: number;
  /**
   * Specifies the targets maximum cardinality.
   *
   * MUST be one of:
   * - positive Integer (1,2,...)
   * - `*` as String
   */
  max?: number | string;
}
/**
 * Dictionary of translated texts.
 *
 */
export interface I18N {
  [k: string]: LanguageTexts;
}
/**
 * Language Text contains translations for one specific languages.
 *
 * Key is the i18n key, value is the translation of the term.
 *
 * An i18n pointer is a string that starts with `{i18n>` and ends with `}`. In between is the key.
 *
 * Example: To link to the i18n key `I_COSTCENTER@ENDUSERTEXT.LABEL`, the i18n pointer is `{i18n>I_COSTCENTER@ENDUSERTEXT.LABEL}`.
 *
 * The i18n pointers within the document MUST be fully self contained:
 * - An i18n resolved pointer MUST be used (referred to) within this CSN document at least once.
 * - All i18n pointers in this CSN document MUST have a corresponding i18n dictionary entry.
 *
 * This interface was referenced by `I18N`'s JSON-Schema definition
 * via the `patternProperty` "^[a-zA-Z]{2,8}(-[a-zA-Z0-9]{1,8}){0,2}$".
 */
export interface LanguageTexts {
  /**
   * Translation of the term.
   */
  [k: string]: string;
}

 export type PrivatePropertyKey = `__${string}`;

 export type AnnotationPropertyKey = `@${string}`;

 export type EntityKind = "entity";

 export type ContextKind = "context";

 export type ServiceKind = "service";

 export type TypeKind = "type";

 export type BooleanCdsType = "cds.Boolean";

 export type StringCdsType = "cds.String";

 export type LargeStringCdsType = "cds.LargeString";

 export type IntegerCdsType = "cds.Integer";

 export type Integer64CdsType = "cds.Integer64";

 export type DecimalCdsType = "cds.Decimal";

 export type DoubleCdsType = "cds.Double";

 export type DateCdsType = "cds.Date";

 export type TimeCdsType = "cds.Time";

 export type DateTimeCdsType = "cds.DateTime";

 export type TimestampCdsType = "cds.Timestamp";

 export type UUIDCdsType = "cds.UUID";

 export type AssociationCdsType = "cds.Association";

 export type CompositionCdsType = "cds.Composition";

 export type CustomTypeValue = string // MUST not start with `cds.`;

 export type CdsTypeValue = BooleanCdsType | StringCdsType | LargeStringCdsType | IntegerCdsType | Integer64CdsType | DecimalCdsType | DoubleCdsType | DateCdsType | TimeCdsType | DateTimeCdsType | TimestampCdsType | UUIDCdsType | AssociationCdsType | CompositionCdsType;
