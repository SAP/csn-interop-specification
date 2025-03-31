"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[2983],{1817:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});const s=JSON.parse('{"id":"spec-v1/consumption","title":"Consumption","description":"1. NPM package","source":"@site/docs/spec-v1/consumption.md","sourceDirName":"spec-v1","slug":"/spec-v1/consumption","permalink":"/csn-interop-specification/spec-v1/consumption","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/spec-v1/consumption.md","tags":[],"version":"current","sidebarPosition":20,"frontMatter":{"sidebar_position":20,"title":"Consumption","hide_title":false},"sidebar":"defaultSidebar","previous":{"title":"@Semantics","permalink":"/csn-interop-specification/spec-v1/extensions/semantics"},"next":{"title":"Mappings","permalink":"/csn-interop-specification/mappings/"}}');var t=i(4848),c=i(8453);const o={sidebar_position:20,title:"Consumption",hide_title:!1},r=void 0,a={},p=[{value:"1. NPM package",id:"1-npm-package",level:2},{value:"Prerequisite",id:"prerequisite",level:3},{value:"NPM Installation",id:"npm-installation",level:3},{value:"2. Direct schema reference in a <code>.json</code> file via <code>$</code> property",id:"2-direct-schema-reference-in-a-json-file-via--property",level:2}];function l(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"1-npm-package",children:"1. NPM package"}),"\n",(0,t.jsx)(n.h3,{id:"prerequisite",children:"Prerequisite"}),"\n",(0,t.jsx)(n.p,{children:"Project should be using Node v20 or higher. Optional have TypeScript enabled."}),"\n",(0,t.jsx)(n.h3,{id:"npm-installation",children:"NPM Installation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Install the package:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install @sap/csn-interop-specification\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Import the JSON schema and use it in code:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'import { schemas } from "@sap/csn-interop-specification";\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"(Optional) When using TypeScript import and use the types:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'import { CSNInteropRoot } from "@sap/csn-interop-specification";\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.h2,{id:"2-direct-schema-reference-in-a-json-file-via--property",children:["2. Direct schema reference in a ",(0,t.jsx)(n.code,{children:".json"})," file via ",(0,t.jsx)(n.code,{children:"$"})," property"]}),"\n",(0,t.jsx)(n.p,{children:"This enables json property name validation and code intellisense while editing CSN Interop files in an IDE."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json5",children:'{\n   // highlight-next-line\n  "$schema": "https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json",\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "definitions": {\n    "Airline": {\n      "kind": "entity",\n      "elements": {\n        "Name": {\n          "type": "cds.String",\n        }\n      }\n    }\n  }\n}\n'})})]})}function d(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>r});var s=i(6540);const t={},c=s.createContext(t);function o(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);