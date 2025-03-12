"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[3361],{2502:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"index","title":"Overview","description":"VERSION: v1.0","source":"@site/docs/index.md","sourceDirName":".","slug":"/","permalink":"/csn-interop-specification/","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/index.md","tags":[],"version":"current","sidebarPosition":0,"frontMatter":{"slug":"/","sidebar_position":0,"title":"Overview"},"sidebar":"defaultSidebar","next":{"title":"Primer","permalink":"/csn-interop-specification/primer"}}');var s=i(4848),r=i(8453);const a={slug:"/",sidebar_position:0,title:"Overview"},o="Core Schema Notation Interoperability Specification",c={},d=[{value:"Summary",id:"summary",level:2},{value:"What is CSN Interop Effective?",id:"what-is-csn-interop-effective",level:2},{value:"CSN",id:"csn",level:3},{value:"Interoperability",id:"interoperability",level:3},{value:"Effective",id:"effective",level:3},{value:"Intended Audience",id:"intended-audience",level:2},{value:"Contact",id:"contact",level:2}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"core-schema-notation-interoperability-specification",children:"Core Schema Notation Interoperability Specification"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"VERSION"}),": v1.0"]}),"\n",(0,s.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,s.jsx)(n.p,{children:"Core schema notation interoperability (short: CSN Interop) is a powerful and flexible format used to describe entity and service models in the wider SAP and BTP ecosystem. CSN files are JSON-based and provide comprehensive metadata about entities and their structure, relationships, and other aspects of the model."}),"\n",(0,s.jsxs)(n.p,{children:["A CSN Interop file can look like this (extracted from ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/spec-v1/examples/airline",children:"./examples/airline.json"}),"):"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'{\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "meta": {\n    "document": {\n      "version": "1.2.3",\n      "doc": "This is a minimal CSN example document."\n    }\n  },\n  "definitions": {\n    "AirlineService": {\n      "kind": "service",\n      "doc": "This is describing the service that exposes the CDS entities through an API."\n    },\n    "AirlineService.Airline": {\n      "kind": "entity",\n      "doc": "Human readable description of the entity, in **markdown**.",\n      "@EndUserText.label": "Airline",\n      "@ObjectModel.modelingPattern": {\n        "#": "ANALYTICAL_DIMENSION"\n      },\n      "elements": {\n        "AirlineID": {\n          "doc": "Human readable description of the element, in **markdown**.",\n          "key": true,\n          "type": "cds.UUID"\n} } } } }\n'})}),"\n",(0,s.jsxs)(n.p,{children:["To get a first overview, read the ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/primer",children:"informal Primer"}),".\nThe actual specification is described mostly in the ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/spec-v1/csn-interop-effective",children:"formal interface documentation"}),", also described in ",(0,s.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:i(9427).A+"",children:"JSON Schema"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"what-is-csn-interop-effective",children:"What is CSN Interop Effective?"}),"\n",(0,s.jsxs)(n.p,{children:["For now, we describe the ",(0,s.jsx)(n.a,{href:"#csn",children:"CSN"})," ",(0,s.jsx)(n.a,{href:"#interoperability",children:"Interoperability"})," ",(0,s.jsx)(n.a,{href:"#effective",children:"Effective"})," exchange format."]}),"\n",(0,s.jsx)(n.h3,{id:"csn",children:"CSN"}),"\n",(0,s.jsxs)(n.p,{children:['Core Schema Notation (CSN, pronounced as "Season") is a JSON based serialization format for Core Data Services (CDS) models that can be used to describe domain, data and service models (and more) on a ',(0,s.jsx)(n.em,{children:"conceptual"})," level, with rich semantics and annotations."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"https://cap.cloud.sap/docs/cds/",children:"Cloud Application Programming Model (CAP)"})," is one platform to create CDS models and it is the first to productize CSN and provide a good ",(0,s.jsx)(n.a,{href:"https://cap.cloud.sap/docs/cds/csn",children:"documentation"})," on CSN."]}),"\n",(0,s.jsx)(n.h3,{id:"interoperability",children:"Interoperability"}),"\n",(0,s.jsx)(n.p,{children:"CSN is well-suited as data format to exchange information about data models (a.k.a. metadata integration) between different systems or even technology stacks such as CAP and ABAP. Thus, it is a key ingredient to support data integration between such systems and technologies."}),"\n",(0,s.jsxs)(n.p,{children:["As a consequence, there is a variety of syntax in CSN that can be specific to the source technology that might be incompatible with some consuming technology stacks. To mitigate such incompatibilities, a certain set of well-defined manipulations of the CSN syntax (so-called feature dimensions) can be used to create a more compatible ",(0,s.jsx)(n.em,{children:"flavor"}),", i.e. a more ",(0,s.jsx)(n.em,{children:"interoperable"})," description of CDS models."]}),"\n",(0,s.jsxs)(n.p,{children:["This specification aims to specify an ",(0,s.jsx)(n.em,{children:"interoperable"})," flavor of CSN with the following goals in mind:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Overall ecosystem agreement on supported features and annotations."}),"\n",(0,s.jsx)(n.li,{children:"Importing / exporting data and API model metadata across different tech stacks and products."}),"\n",(0,s.jsxs)(n.li,{children:["Simplify the format for the consumers, so it is explicit and easy to parse / understand (see ",(0,s.jsx)(n.a,{href:"#effective",children:"effective"}),")."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This includes:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/spec-v1/csn-interop-effective",children:"core specification"}),", which is a subset of regular CSN."]}),"\n",(0,s.jsxs)(n.li,{children:["Interoperable ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/annotations/",children:"annotation vocabularies"}),", only describe what is relevant for the wider ecosystem."]}),"\n",(0,s.jsxs)(n.li,{children:["Defined ",(0,s.jsx)(n.a,{href:"/csn-interop-specification/mappings/",children:"mappings"}),", how CSN maps to other data type systems and can be serialized in APIs and data formats."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"effective",children:"Effective"}),"\n",(0,s.jsxs)(n.p,{children:["Right now, this spec describes only the ",(0,s.jsx)(n.a,{href:"./spec-v1/csn-interop-effective",children:"effective"})," feature dimension."]}),"\n",(0,s.jsxs)(n.p,{children:['Effective means that the format is "',(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Denormalization",children:"denormalized"}),'", and optimized towards easy consumption by machines, with the tradeoff of more verbosity and duplicated information.']}),"\n",(0,s.jsx)(n.p,{children:"Information reuse concepts like aspects have already been resolved, applied and cleaned up. What the consumer gets, is a document that does not require further post-processing / logic to be interpreted correctly. This is a tradeoff, prioritizing easy consumption over convenient creation."}),"\n",(0,s.jsx)(n.h2,{id:"intended-audience",children:"Intended Audience"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Developers and Architects that either need to export or import CSN across different technology stacks."}),"\n",(0,s.jsx)(n.li,{children:"End consumers that need to understand CSN Interop as a metadata description format for resources they want to integrate with (e.g. APIs and Events)."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"contact",children:"Contact"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"CONTACT"}),": Create a GitHub PR or ",(0,s.jsx)(n.a,{href:"https://github.com/SAP/csn-interop-specification/issues",children:"issue"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"CONTRIBUTORS"}),": ",(0,s.jsx)(n.a,{href:"mailto:andreas.balzar@sap.com",children:"Andreas Balzar"}),", Michael Belenki, Timo Bergmann, Daniel Buchmann, Timm Falter, Daniel Hutzel, Steffen Weinstock, ",(0,s.jsx)(n.a,{href:"mailto:simon.heimler@sap.com",children:"Simon Heimler"}),", Sandra Bracholdt, Raluca Gruber, ..."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},9427:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/files/csn-interop-effective.schema-f69ad972d3d2a45267c0b1b33d73192a.json"},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>o});var t=i(6540);const s={},r=t.createContext(s);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);