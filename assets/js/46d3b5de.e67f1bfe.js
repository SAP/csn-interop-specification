"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[4424],{4729:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"annotations/objectmodel","title":"@ObjectModel","description":"@ObjectModel annotations.","source":"@site/docs/annotations/objectmodel.md","sourceDirName":"annotations","slug":"/annotations/objectmodel","permalink":"/csn-interop-specification/annotations/objectmodel","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/annotations/objectmodel.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"title":"@ObjectModel","sidebar_position":7,"description":"@ObjectModel annotations."},"sidebar":"defaultSidebar","previous":{"title":"@EntityRelationship","permalink":"/csn-interop-specification/annotations/entity-relationship"},"next":{"title":"@ODM","permalink":"/csn-interop-specification/annotations/odm"}}');var s=n(4848),c=n(8453);const r={title:"@ObjectModel",sidebar_position:7,description:"@ObjectModel annotations."},l=void 0,o={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Schema Definitions",id:"schema-definitions",level:2},{value:"Annotations Overview",id:"annotations-overview",level:3},{value:"@ObjectModel.compositionRoot",id:"objectmodelcompositionroot",level:3},{value:"@ObjectModel.representativeKey",id:"objectmodelrepresentativekey",level:3},{value:"@ObjectModel.semanticKey",id:"objectmodelsemantickey",level:3},{value:"@ObjectModel.modelingPattern",id:"objectmodelmodelingpattern",level:3},{value:"Example Values",id:"example-values",level:6},{value:"@ObjectModel.supportedCapabilities",id:"objectmodelsupportedcapabilities",level:3},{value:"@ObjectModel.foreignKey.association",id:"objectmodelforeignkeyassociation",level:3},{value:"@ObjectModel.text.element",id:"objectmodeltextelement",level:3},{value:"Example Values",id:"example-values-1",level:6},{value:"@ObjectModel.text.association",id:"objectmodeltextassociation",level:3},{value:"Supported Capabilities Enum Value",id:"supported-capabilities-enum-value",level:3}];function h(e){const i={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h6:"h6",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.blockquote,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)("span",{className:"feature-status-beta",children:"BETA"})," This annotation is beta and should be reviewed for completion and correctness."]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(i.p,{children:"The object model captures definitions of structural as well as transactional related aspects of the business data model."}),"\n",(0,s.jsx)(i.h2,{id:"schema-definitions",children:"Schema Definitions"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["This is an extension vocabulary for ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective",children:"CSN Interop Effective"}),"."]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"annotations-overview",children:"Annotations Overview"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Annotation"}),(0,s.jsx)(i.th,{children:"Scope"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelcompositionroot",children:"@ObjectModel.compositionRoot"})}),(0,s.jsx)(i.td,{children:"Entity"}),(0,s.jsx)(i.td,{children:"Entity is the root of a compositional hierarchy."})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelrepresentativekey",children:"@ObjectModel.representativeKey"})}),(0,s.jsx)(i.td,{children:"Entity, Service"}),(0,s.jsx)(i.td,{children:"In case of multiple key elements: key element which represents the entity (in the sense that the entity itself is the list of values for this key element)"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelsemantickey",children:"@ObjectModel.semanticKey"})}),(0,s.jsx)(i.td,{children:"Type"}),(0,s.jsx)(i.td,{children:"The property contains element(s) which shall be used to display the key in UIs (instead of the technical key)."})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelmodelingpattern",children:"@ObjectModel.modelingPattern"})}),(0,s.jsx)(i.td,{children:"Entity, Service"}),(0,s.jsx)(i.td,{children:"The property declares the modeling pattern applied in this entity definition."})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelsupportedcapabilities",children:"@ObjectModel.supportedCapabilities"})}),(0,s.jsx)(i.td,{children:"Entity, Service"}),(0,s.jsx)(i.td,{children:"The property declares the supported usage type for this entity in the context of consuming data models."})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodelforeignkeyassociation",children:"@ObjectModel.foreignKey.association"})}),(0,s.jsx)(i.td,{children:"Type"}),(0,s.jsxs)(i.td,{children:["The element is of type cds.Association which points to the list of values. Use only for service internal associations. For cross service associations, use the ",(0,s.jsx)(i.a,{href:"./entity-relationship",children:"@EntityRelationship Vocabulary"})," instead."]})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodeltextelement",children:"@ObjectModel.text.element"})}),(0,s.jsx)(i.td,{children:"Type"}),(0,s.jsx)(i.td,{children:"The property contains element(s) containing a text for the annotated (id)element"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(i.a,{href:"#objectmodeltextassociation",children:"@ObjectModel.text.association"})}),(0,s.jsx)(i.td,{children:"Type"}),(0,s.jsx)(i.td,{children:"The element is of type cds.association, which points to an entity containing (language-dependent) texts for the annotated (id) element"})]})]})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelcompositionroot",children:"@ObjectModel.compositionRoot"}),"\n",(0,s.jsx)(i.p,{children:"Entity is the root of a compositional hierarchy."}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Type:"})," boolean",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Default Value"}),": ",(0,s.jsx)(i.code,{children:"true"}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Entity",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#entity-definition",children:"EntityDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelrepresentativekey",children:"@ObjectModel.representativeKey"}),"\n",(0,s.jsx)(i.p,{children:"In case of multiple key elements: key element which represents the entity (in the sense that the entity itself is the list of values for this key element)"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"External Type"}),": ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"})," ",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Entity, Service",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#entity-definition",children:"EntityDefinition"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#service-definition",children:"ServiceDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelsemantickey",children:"@ObjectModel.semanticKey"}),"\n",(0,s.jsx)(i.p,{children:"The property contains element(s) which shall be used to display the key in UIs (instead of the technical key)."}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Type:"})," Array<",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"}),">",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Type",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#string-type",children:"StringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#date-type",children:"DateType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#time-type",children:"TimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#type-definition",children:"TypeDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelmodelingpattern",children:"@ObjectModel.modelingPattern"}),"\n",(0,s.jsx)(i.p,{children:"The property declares the modeling pattern applied in this entity definition."}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Property"}),(0,s.jsx)(i.th,{children:"Type"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsx)(i.tbody,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsxs)("div",{className:"interface-property-name anchor",id:"objectmodelmodelingpattern_#",children:["#",(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"mandatory",children:"MANDATORY"}),(0,s.jsx)("a",{className:"hash-link",href:"#objectmodelmodelingpattern_#",title:"@ObjectModel.modelingPattern.#"})]})}),(0,s.jsx)(i.td,{children:(0,s.jsx)("div",{className:"interface-property-type",children:"string"})}),(0,s.jsx)(i.td,{children:(0,s.jsxs)("div",{className:"interface-property-description",children:["Provide the value in ",(0,s.jsx)(i.code,{children:'{ "#": "<value>" }'})," enum notation.",(0,s.jsx)("br",{}),(0,s.jsx)("hr",{}),(0,s.jsx)(i.strong,{children:"Allowed Values"}),": ",(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"DATA_STRUCTURE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"LANGUAGE_DEPENDENT_TEXT"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"UNIT_CONVERSION_RATE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"VALUE_HELP_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"COLLECTIVE_VALUE_HELP"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"DERIVATION_FUNCTION"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"PARENT_CHILD_HIERARCHY_NODE_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ENTERPRISE_SEARCH_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"TRANSACTIONAL_INTERFACE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"TRANSACTIONAL_QUERY"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_QUERY"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_DOCUMENT_STORE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_CUBE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_DIMENSION"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_FACT"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_KPI"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_FORM_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_EMAIL_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_ANCHOR"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_TRIGGER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_DATACONTEXT"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"EXTERNAL_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"NONE"'})})]})]})})]})})]}),"\n",(0,s.jsx)(i.h6,{id:"example-values",children:"Example Values"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-js",children:'{\n  "#": "DATA_STRUCTURE"\n}\n'})}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelsupportedcapabilities",children:"@ObjectModel.supportedCapabilities"}),"\n",(0,s.jsx)(i.p,{children:"The property declares the supported usage type for this entity in the context of consuming data models."}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Type:"})," Array<",(0,s.jsx)(i.a,{href:"#supported-capabilities-enum-value",children:"Supported Capabilities Enum Value"}),">",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Entity, Service",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#entity-definition",children:"EntityDefinition"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#service-definition",children:"ServiceDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodelforeignkeyassociation",children:"@ObjectModel.foreignKey.association"}),"\n",(0,s.jsxs)(i.p,{children:["The element is of type cds.Association which points to the list of values. Use only for service internal associations. For cross service associations, use the ",(0,s.jsx)(i.a,{href:"./entity-relationship",children:"@EntityRelationship Vocabulary"})," instead."]}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"External Type"}),": ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"})," ",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Type",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#string-type",children:"StringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#date-type",children:"DateType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#time-type",children:"TimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#type-definition",children:"TypeDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"objectmodeltextelement",children:"@ObjectModel.text.element"}),"\n",(0,s.jsx)(i.p,{children:"The property contains element(s) containing a text for the annotated (id)element"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Type:"})," Array<",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"}),">",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Type",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#string-type",children:"StringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#date-type",children:"DateType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#time-type",children:"TimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#type-definition",children:"TypeDefinition"})]}),"\n",(0,s.jsx)(i.h6,{id:"example-values-1",children:"Example Values"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-js",children:'[\n  "BillingDocumentTypeName"\n]\n'})}),"\n",(0,s.jsx)(i.h3,{id:"objectmodeltextassociation",children:"@ObjectModel.text.association"}),"\n",(0,s.jsx)(i.p,{children:"The element is of type cds.association, which points to an entity containing (language-dependent) texts for the annotated (id) element"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"External Type"}),": ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"})," ",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Scope:"})," Type",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(i.strong,{children:"Extending:"})," ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#string-type",children:"StringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#date-type",children:"DateType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#time-type",children:"TimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,s.jsx)(i.a,{href:"../spec-v1/csn-interop-effective#type-definition",children:"TypeDefinition"})]}),"\n",(0,s.jsx)(i.h3,{id:"supported-capabilities-enum-value",children:"Supported Capabilities Enum Value"}),"\n",(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:"Property"}),(0,s.jsx)(i.th,{children:"Type"}),(0,s.jsx)(i.th,{children:"Description"})]})}),(0,s.jsx)(i.tbody,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsxs)("div",{className:"interface-property-name anchor",id:"supported-capabilities-enum-value_#",children:["#",(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"mandatory",children:"MANDATORY"}),(0,s.jsx)("a",{className:"hash-link",href:"#supported-capabilities-enum-value_#",title:"@ObjectModel.SupportedCapabilities_EnumValue.#"})]})}),(0,s.jsx)(i.td,{children:(0,s.jsx)("div",{className:"interface-property-type",children:"string"})}),(0,s.jsx)(i.td,{children:(0,s.jsxs)("div",{className:"interface-property-description",children:["The entry declares one supported usage type.",(0,s.jsx)("br",{}),(0,s.jsx)("hr",{}),(0,s.jsx)(i.strong,{children:"Allowed Values"}),": ",(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SQL_DATA_SOURCE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"CDS_MODELING_DATA_SOURCE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"CDS_MODELING_ASSOCIATION_TARGET"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"DATA_STRUCTURE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"LANGUAGE_DEPENDENT_TEXT"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"UNIT_CONVERSION_RATE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"VALUE_HELP_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"COLLECTIVE_VALUE_HELP"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"EXTRACTION_DATA_SOURCE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"DERIVATION_FUNCTION"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"PARENT_CHILD_HIERARCHY_NODE_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SEARCHABLE_ENTITY"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ENTERPRISE_SEARCH_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"TRANSACTIONAL_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_QUERY"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_DOCUMENT_STORE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_DIMENSION"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_PARENT_CHILD_HIERARCHY_NODE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ANALYTICAL_KPI"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_FORM_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_EMAIL_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"OUTPUT_PARAMETER_DETERMINATION_DATA_SOURCE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_ANCHOR"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_TRIGGER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"SITUATION_DATACONTEXT"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"KEY_USER_COPYING_TEMPLATE"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"EXTERNAL_DATA_PROVIDER"'})}),(0,s.jsx)("li",{children:(0,s.jsx)(i.code,{children:'"ODM_COMPLIANT_PROVIDER"'})})]})]})})]})})]})]})}function p(e={}){const{wrapper:i}={...(0,c.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>l});var t=n(6540);const s={},c=t.createContext(s);function r(e){const i=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(c.Provider,{value:i},e.children)}}}]);