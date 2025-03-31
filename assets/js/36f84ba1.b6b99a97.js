"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[6322],{5307:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>f,contentTitle:()=>o,default:()=>p,frontMatter:()=>c,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"spec-v1/extensions/enduser-text","title":"@EndUserText","description":"@EndUserText annotations for end user UIs.","source":"@site/docs/spec-v1/extensions/enduser-text.md","sourceDirName":"spec-v1/extensions","slug":"/spec-v1/extensions/enduser-text","permalink":"/csn-interop-specification/spec-v1/extensions/enduser-text","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/spec-v1/extensions/enduser-text.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"@EndUserText","sidebar_position":5,"description":"@EndUserText annotations for end user UIs."},"sidebar":"defaultSidebar","previous":{"title":"@Consumption","permalink":"/csn-interop-specification/spec-v1/extensions/consumption"},"next":{"title":"@EntityRelationship","permalink":"/csn-interop-specification/spec-v1/extensions/entity-relationship"}}');var r=i(4848),s=i(8453);const c={title:"@EndUserText",sidebar_position:"5",description:"@EndUserText annotations for end user UIs."},o=void 0,f={},a=[{value:"Introduction",id:"introduction",level:2},{value:"Reference i18n keys",id:"reference-i18n-keys",level:3},{value:"Schema Definitions",id:"schema-definitions",level:2},{value:"Annotations Overview",id:"annotations-overview",level:3},{value:"@EndUserText.label",id:"endusertextlabel",level:3},{value:"Example Values:",id:"example-values",level:6},{value:"@EndUserText.heading",id:"endusertextheading",level:3},{value:"@EndUserText.quickInfo",id:"endusertextquickinfo",level:3},{value:"Example Values:",id:"example-values-1",level:6},{value:"Complete Examples",id:"complete-examples",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h6:"h6",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)("span",{className:"feature-status-beta",children:"BETA"})," This annotation is beta and should be reviewed for completion and correctness."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsx)(n.p,{children:"To allow an intuitive consumption of the data model in (End User) UIs, further metadata needs to be defined which helps the end user to understand the semantics of the underlying data model artifacts. Depending on the concrete context different types of UI texts are required. The UI text is displayed on the screen in the logon language of the user (if the text was translated into this language)."}),"\n",(0,r.jsx)(n.h3,{id:"reference-i18n-keys",children:"Reference i18n keys"}),"\n",(0,r.jsxs)(n.p,{children:["In the ",(0,r.jsx)(n.code,{children:"@EndUserText"})," annotations it is also possible to reference ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#i18n",children:"i18n"})," entries that are embedded into the CSN document.\nIn this case, the string has to include ",(0,r.jsx)(n.code,{children:"{i18n>"})," as a prefix, then the key and end with ",(0,r.jsx)(n.code,{children:"}"})]}),"\n",(0,r.jsxs)(n.p,{children:["Example: ",(0,r.jsx)(n.code,{children:"{i18n>AD01PROFNR@ENDUSERTEXT.HEADING}"})]}),"\n",(0,r.jsx)(n.h2,{id:"schema-definitions",children:"Schema Definitions"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["This is an extension vocabulary for ",(0,r.jsx)(n.a,{href:"../csn-interop-effective",children:"CSN Interop Effective Document"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["The interface is available as JSON Schema: ",(0,r.jsx)(n.a,{href:"https://sap.github.io/csn-interop-specification/spec-v1/enduser-text.schema.json#",children:"enduser-text.schema.json"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"annotations-overview",children:"Annotations Overview"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Annotation"}),(0,r.jsx)(n.th,{children:"Scope"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"#endusertextlabel",children:"@EndUserText.label"})}),(0,r.jsx)(n.td,{children:"Entity, Type, Service, Context, EnumDictionaryEntry"}),(0,r.jsxs)(n.td,{children:["The property contains a human-readable text to be displayed on UIs (besides or instead of the technical name).",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"Corresponds to CAP CDS ",(0,r.jsx)(n.code,{children:"@title"})," annotation."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"#endusertextheading",children:"@EndUserText.heading"})}),(0,r.jsx)(n.td,{children:"Type"}),(0,r.jsx)(n.td,{children:"Defines a human-readable text that is displayed as column headers."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"#endusertextquickinfo",children:"@EndUserText.quickInfo"})}),(0,r.jsx)(n.td,{children:"Entity, Type, Service, Context, EnumDictionaryEntry"}),(0,r.jsxs)(n.td,{children:["Defines a human-readable text that provides additional information compared to the label text.",(0,r.jsx)("br",{}),'The quickInfo is used for accessibility hints or the "Mouse over" function.',(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"Corresponds to CAP CDS ",(0,r.jsx)(n.code,{children:"@description"})," annotation."]})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"endusertextlabel",children:"@EndUserText.label"}),"\n",(0,r.jsx)(n.p,{children:"The property contains a human-readable text to be displayed on UIs (besides or instead of the technical name)."}),"\n",(0,r.jsxs)(n.p,{children:["Corresponds to CAP CDS ",(0,r.jsx)(n.code,{children:"@title"})," annotation."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Type:"})," string",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Scope:"})," Entity, Type, Service, Context, EnumDictionaryEntry",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Extending:"})," ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#entity-definition",children:"EntityDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type",children:"StringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type",children:"DateType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type",children:"TimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#type-definition",children:"TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type-definition",children:"BooleanTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type-definition",children:"StringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type-definition",children:"LargeStringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type-definition",children:"IntegerTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type-definition",children:"Integer64TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type-definition",children:"DecimalTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type-definition",children:"DoubleTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type-definition",children:"DateTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type-definition",children:"TimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type-definition",children:"DateTimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type-definition",children:"TimestampTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type-definition",children:"UUIDTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type-definition",children:"AssociationTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type-definition",children:"CompositionTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#service-definition",children:"ServiceDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#context-definition",children:"ContextDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#enum-dictionary-entry",children:"EnumDictionaryEntry"})]}),"\n",(0,r.jsx)(n.h6,{id:"example-values",children:"Example Values:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'"Sales Order Header"\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'"{i18n>AD01PROFNR@ENDUSERTEXT.LABEL}"\n'})}),"\n",(0,r.jsx)(n.h3,{id:"endusertextheading",children:"@EndUserText.heading"}),"\n",(0,r.jsx)(n.p,{children:"Defines a human-readable text that is displayed as column headers."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Type:"})," string",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Scope:"})," Type",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Extending:"})," ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type",children:"StringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type",children:"DateType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type",children:"TimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#type-definition",children:"TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type-definition",children:"BooleanTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type-definition",children:"StringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type-definition",children:"LargeStringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type-definition",children:"IntegerTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type-definition",children:"Integer64TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type-definition",children:"DecimalTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type-definition",children:"DoubleTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type-definition",children:"DateTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type-definition",children:"TimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type-definition",children:"DateTimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type-definition",children:"TimestampTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type-definition",children:"UUIDTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type-definition",children:"AssociationTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type-definition",children:"CompositionTypeDefinition"})]}),"\n",(0,r.jsx)(n.h3,{id:"endusertextquickinfo",children:"@EndUserText.quickInfo"}),"\n",(0,r.jsx)(n.p,{children:'Defines a human-readable text that provides additional information compared to the label text.\nThe quickInfo is used for accessibility hints or the "Mouse over" function.'}),"\n",(0,r.jsxs)(n.p,{children:["Corresponds to CAP CDS ",(0,r.jsx)(n.code,{children:"@description"})," annotation."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Type:"})," string",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Scope:"})," Entity, Type, Service, Context, EnumDictionaryEntry",(0,r.jsx)("br",{}),"\n",(0,r.jsx)(n.strong,{children:"Extending:"})," ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#entity-definition",children:"EntityDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type",children:"StringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type",children:"DateType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type",children:"TimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#type-definition",children:"TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#boolean-type-definition",children:"BooleanTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#string-type-definition",children:"StringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#largestring-type-definition",children:"LargeStringTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer-type-definition",children:"IntegerTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#integer64-type-definition",children:"Integer64TypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#decimal-type-definition",children:"DecimalTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#double-type-definition",children:"DoubleTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#date-type-definition",children:"DateTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#time-type-definition",children:"TimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#datetime-type-definition",children:"DateTimeTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#timestamp-type-definition",children:"TimestampTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#uuid-type-definition",children:"UUIDTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#association-type-definition",children:"AssociationTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#composition-type-definition",children:"CompositionTypeDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#service-definition",children:"ServiceDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#context-definition",children:"ContextDefinition"}),", ",(0,r.jsx)(n.a,{href:"../csn-interop-effective#enum-dictionary-entry",children:"EnumDictionaryEntry"})]}),"\n",(0,r.jsx)(n.h6,{id:"example-values-1",children:"Example Values:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'"Sales Order Header that contains data relevant for all items"\n'})}),"\n",(0,r.jsx)(n.h2,{id:"complete-examples",children:"Complete Examples"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'{\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "definitions": {\n    "SalesOrderHeader": {\n      "kind": "type",\n      "type": "cds.String",\n      "@EndUserText.label": "Sales Order Header",\n      "@EndUserText.quickInfo": "Sales Order Header that contains data relevant for all items"\n    }\n  }\n}\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'{\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "definitions": {\n    "AD01PROFNR": {\n      "kind": "type",\n      "type": "cds.String",\n      "length": 8,\n      "@EndUserText.heading": "{i18n>AD01PROFNR@ENDUSERTEXT.HEADING}",\n      "@EndUserText.label": "{i18n>AD01PROFNR@ENDUSERTEXT.LABEL}",\n      "@EndUserText.quickInfo": "{i18n>AD01PROFNR@ENDUSERTEXT.QUICKINFO}"\n    }\n  }\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>o});var t=i(6540);const r={},s=t.createContext(r);function c(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);