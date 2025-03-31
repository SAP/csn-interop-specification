"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[8487],{9642:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"spec-v1/extensions/analytics-details","title":"@AnalyticsDetails","description":"@AnalyticsDetails for data analytics use cases.","source":"@site/docs/spec-v1/extensions/analytics-details.md","sourceDirName":"spec-v1/extensions","slug":"/spec-v1/extensions/analytics-details","permalink":"/csn-interop-specification/spec-v1/extensions/analytics-details","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/spec-v1/extensions/analytics-details.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"@AnalyticsDetails","sidebar_position":3,"description":"@AnalyticsDetails for data analytics use cases."},"sidebar":"defaultSidebar","previous":{"title":"@Aggregation","permalink":"/csn-interop-specification/spec-v1/extensions/aggregation"},"next":{"title":"@Consumption","permalink":"/csn-interop-specification/spec-v1/extensions/consumption"}}');var t=n(4848),a=n(8453);const l={title:"@AnalyticsDetails",sidebar_position:"3",description:"@AnalyticsDetails for data analytics use cases."},c=void 0,r={},o=[{value:"Introduction",id:"introduction",level:2},{value:"Schema Definitions",id:"schema-definitions",level:2},{value:"Annotations Overview",id:"annotations-overview",level:3},{value:"@AnalyticsDetails.measureType",id:"analyticsdetailsmeasuretype",level:3},{value:"Example Values:",id:"example-values",level:6}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h6:"h6",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)("span",{className:"feature-status-beta",children:"BETA"})," This annotation is beta and should be reviewed for completion and correctness."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(s.p,{children:'Analytical consumption requires additional, specific semantics, which indicate how to map a relational model to the Analytical meta model, using terms like "Facts", "Dimensions", "Measures", "Cubes", "Queries" and "KPIs".'}),"\n",(0,t.jsxs)(s.p,{children:["On entity level these fundamental semantics are mainly captured via the annotations ",(0,t.jsx)(s.code,{children:"@ObjectModel.modelingPattern"})," (design time hints; esp. #ANALYTICAL_FACT, #ANALYTICAL_DIMENSION, #ANALYTICAL_CUBE, #ANALYTICAL_QUERY), and ",(0,t.jsx)(s.code,{children:"@ObjectModel.supportedCapabilities"})," (deployment/runtime hints; esp. #ANALYTICAL_DIMENSION, #ANALYTICAL_PROVIDER, #ANALYTICAL_QUERY)."]}),"\n",(0,t.jsxs)(s.p,{children:["The annotation ",(0,t.jsx)(s.code,{children:"@AnalyticsDetails"})," captures specific analytical semantics on element level.\nWe recommend to consistently use the annotations in combination with the above-mentioned analytical modeling patterns and supported capabilities on entity level."]}),"\n",(0,t.jsx)(s.p,{children:"The most fundamental analytical specialization is to declare which elements represent a measure.\nBecause measures shall be aggregated in Analytical processing, all elements with a default aggregation annotation are candidates to be used as measures in Analytics.\nMeasures are further categorized into base, restricted and calculated measures.\nRestricted and calculated measures shall be specifically treated by an Analytic Engine (esp. by MDS in HANA Cloud), whereas base measures have standard SQL semantics."}),"\n",(0,t.jsx)(s.h2,{id:"schema-definitions",children:"Schema Definitions"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["This is an extension vocabulary for ",(0,t.jsx)(s.a,{href:"../csn-interop-effective",children:"CSN Interop Effective Document"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["The interface is available as JSON Schema: ",(0,t.jsx)(s.a,{href:"https://sap.github.io/csn-interop-specification/spec-v1/analytics-details.schema.json#",children:"analytics-details.schema.json"}),"."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"annotations-overview",children:"Annotations Overview"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Annotation"}),(0,t.jsx)(s.th,{children:"Scope"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.a,{href:"#analyticsdetailsmeasuretype",children:"@AnalyticsDetails.measureType"})}),(0,t.jsx)(s.td,{children:"Type"}),(0,t.jsx)(s.td,{children:"Specifies in which way a measure should treated."})]})})]}),"\n",(0,t.jsx)(s.h3,{id:"analyticsdetailsmeasuretype",children:"@AnalyticsDetails.measureType"}),"\n",(0,t.jsx)(s.p,{children:"Specifies in which way a measure should treated."}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Type"}),": Object(",(0,t.jsx)("a",{href:"#analyticsdetailsmeasuretype_#",children:"#"}),")"]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Property"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsxs)("div",{className:"interface-property-name anchor",id:"analyticsdetailsmeasuretype_#",children:["#",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"mandatory",children:"MANDATORY"}),(0,t.jsx)("a",{className:"hash-link",href:"#analyticsdetailsmeasuretype_#",title:"@AnalyticsDetails.measureType.#"})]})}),(0,t.jsx)(s.td,{children:(0,t.jsx)("div",{className:"interface-property-type",children:"string"})}),(0,t.jsx)(s.td,{children:(0,t.jsxs)("div",{className:"interface-property-description",children:["Provide the value in ",(0,t.jsx)(s.code,{children:'{ "#": "<value>" }'})," enum notation.",(0,t.jsx)("hr",{}),(0,t.jsx)(s.strong,{children:"Allowed Values"}),": ",(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:(0,t.jsxs)("p",{children:[(0,t.jsx)(s.code,{children:'"BASE"'}),": Measure from the provider."]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("p",{children:[(0,t.jsx)(s.code,{children:'"RESTRICTION"'}),": Restricted measure."]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("p",{children:[(0,t.jsx)(s.code,{children:'"CALCULATION"'}),": Calculated measure (formula)."]})})]})]})})]})})]}),"\n",(0,t.jsx)(s.h6,{id:"example-values",children:"Example Values:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-js",children:'{\n  "#": "BASE"\n}\n'})})]})}function h(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>c});var i=n(6540);const t={},a=i.createContext(t);function l(e){const s=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(a.Provider,{value:s},e.children)}}}]);