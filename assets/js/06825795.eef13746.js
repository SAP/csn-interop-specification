"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[8709],{4e3:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"annotations/odm","title":"@ODM","description":"@ODM for One Domain Model (ODM) related annotations.","source":"@site/docs/annotations/odm.md","sourceDirName":"annotations","slug":"/annotations/odm","permalink":"/csn-interop-specification/annotations/odm","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/annotations/odm.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"title":"@ODM","sidebar_position":8,"description":"@ODM for One Domain Model (ODM) related annotations."},"sidebar":"defaultSidebar","previous":{"title":"@ObjectModel","permalink":"/csn-interop-specification/annotations/objectmodel"},"next":{"title":"@PersonalData","permalink":"/csn-interop-specification/annotations/personal-data"}}');var s=t(4848),o=t(8453);const r={title:"@ODM",sidebar_position:8,description:"@ODM for One Domain Model (ODM) related annotations."},c=void 0,a={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Schema Definitions",id:"schema-definitions",level:2},{value:"Annotations Overview",id:"annotations-overview",level:3},{value:"@ODM.entityName",id:"odmentityname",level:3},{value:"@ODM.oid",id:"odmoid",level:3},{value:"@ODM.oidReference.entityName",id:"odmoidreferenceentityname",level:3}];function l(e){const n={a:"a",blockquote:"blockquote",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)("span",{className:"feature-status-stable",children:"STABLE"})," This annotation can be used productively."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(n.p,{children:"Annotations of the one domain model allow specifying entities and their elements to make them ODM compliant accordingly to ODM Compliance rules."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:["\ud83d\udd17 For more background, see blog post: ",(0,s.jsx)(n.a,{href:"https://community.sap.com/t5/technology-blogs-by-sap/harnessing-half-a-century-of-knowledge-sap-s-journey-of-enriching-apis-with/ba-p/13578364",children:"Harnessing Half a Century of Knowledge: SAP's Journey of Enriching APIs with Business Metadata"})]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"schema-definitions",children:"Schema Definitions"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["This is an extension vocabulary for ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective",children:"CSN Interop Effective"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"annotations-overview",children:"Annotations Overview"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Annotation"}),(0,s.jsx)(n.th,{children:"Scope"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"#odmentityname",children:"@ODM.entityName"})}),(0,s.jsx)(n.td,{children:"Entity"}),(0,s.jsx)(n.td,{children:"The entity represents an ODM Entity with this official name."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"#odmoid",children:"@ODM.oid"})}),(0,s.jsx)(n.td,{children:"Entity"}),(0,s.jsx)(n.td,{children:"The annotation references the element which contains the oid."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"#odmoidreferenceentityname",children:"@ODM.oidReference.entityName"})}),(0,s.jsx)(n.td,{children:"Type"}),(0,s.jsx)(n.td,{children:"The property contains an OID for the ODM Entity with this official name"})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"odmentityname",children:"@ODM.entityName"}),"\n",(0,s.jsx)(n.p,{children:"The entity represents an ODM Entity with this official name."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Type:"})," string",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Scope:"})," Entity",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Extending:"})," ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#entity-definition",children:"EntityDefinition"})]}),"\n",(0,s.jsx)(n.h3,{id:"odmoid",children:"@ODM.oid"}),"\n",(0,s.jsx)(n.p,{children:"The annotation references the element which contains the oid."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"External Type"}),": ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#element-reference",children:"Element Reference"})," ",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Scope:"})," Entity",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Extending:"})," ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#entity-definition",children:"EntityDefinition"})]}),"\n",(0,s.jsx)(n.h3,{id:"odmoidreferenceentityname",children:"@ODM.oidReference.entityName"}),"\n",(0,s.jsx)(n.p,{children:"The property contains an OID for the ODM Entity with this official name"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Type:"})," string",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Scope:"})," Type",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:"Extending:"})," ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#boolean-type",children:"BooleanType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#string-type",children:"StringType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#largestring-type",children:"LargeStringType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#integer-type",children:"IntegerType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#integer64-type",children:"Integer64Type"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#decimal-type",children:"DecimalType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#double-type",children:"DoubleType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#date-type",children:"DateType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#time-type",children:"TimeType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#datetime-type",children:"DateTimeType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#timestamp-type",children:"TimestampType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#uuid-type",children:"UUIDType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#association-type",children:"AssociationType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#composition-type",children:"CompositionType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#custom-type",children:"CustomType"}),", ",(0,s.jsx)(n.a,{href:"../spec-v1/csn-interop-effective#type-definition",children:"TypeDefinition"})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>c});var i=t(6540);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);