"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[666],{1949:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>c,metadata:()=>i,toc:()=>p});const i=JSON.parse('{"id":"spec-v1/examples/tables_with_primary_key","title":"Tables with Primary Key","description":"Description","source":"@site/docs/spec-v1/examples/tables_with_primary_key.md","sourceDirName":"spec-v1/examples","slug":"/spec-v1/examples/tables_with_primary_key","permalink":"/csn-interop-specification/spec-v1/examples/tables_with_primary_key","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/spec-v1/examples/tables_with_primary_key.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Tables with Primary Key","sidebar_position":1},"sidebar":"defaultSidebar","previous":{"title":"Entities with Associations","permalink":"/csn-interop-specification/spec-v1/examples/entities_with_foreign_key_and_text_assocs"},"next":{"title":"Annotations","permalink":"/csn-interop-specification/annotations/"}}');var s=t(4848),r=t(8453);const c={title:"Tables with Primary Key",sidebar_position:1},o=void 0,a={},p=[{value:"Description",id:"description",level:2},{value:"Example File",id:"example-file",level:2}];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"description",children:"Description"}),"\n",(0,s.jsx)(e.p,{children:"This example shows how a CSN model can describe a data model for relational database tables with primary keys."}),"\n",(0,s.jsx)(e.h2,{id:"example-file",children:"Example File"}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsxs)(e.p,{children:["Source Code: ",(0,s.jsx)(e.a,{href:"https://github.com/SAP/csn-interop-specification/blob/main/examples/tables_with_primary_key.json",children:"./examples/tables_with_primary_key.json"})]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:'{\n  "$schema": "https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json",\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "meta": {\n    "document": {\n      "version": "1.2.3"\n    },\n    "features": {\n      "complete": true\n    }\n  },\n  "definitions": {\n    "Airline": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "Name": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "AirlinePicURL": {\n          "type": "cds.String",\n          "length": 1000\n        }\n      }\n    },\n    "Airport": {\n      "kind": "entity",\n      "elements": {\n        "AirportID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "Name": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "City": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "CountryCode_code": {\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Countries": {\n      "kind": "entity",\n      "elements": {\n        "code": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Countries_texts": {\n      "kind": "entity",\n      "elements": {\n        "code": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "locale": {\n          "key": true,\n          "type": "cds.String",\n          "length": 14\n        },\n        "name": {\n          "type": "cds.String",\n          "length": 255\n        },\n        "descr": {\n          "type": "cds.String",\n          "length": 1000\n        }\n      }\n    },\n    "FlightConnection": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "ConnectionID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 4\n        },\n        "DepartureAirport_AirportID": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "DestinationAirport_AirportID": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "DepartureTime": {\n          "type": "cds.Time"\n        },\n        "ArrivalTime": {\n          "type": "cds.Time"\n        },\n        "Distance": {\n          "type": "cds.Integer"\n        },\n        "DistanceUnit": {\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Flight": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "FlightDate": {\n          "key": true,\n          "type": "cds.Date"\n        },\n        "ConnectionID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 4\n        },\n        "Price": {\n          "type": "cds.Decimal",\n          "precision": 16,\n          "scale": 3\n        },\n        "CurrencyCode_code": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "PlaneType": {\n          "type": "cds.String",\n          "length": 10\n        },\n        "MaximumSeats": {\n          "type": "cds.Integer"\n        },\n        "OccupiedSeats": {\n          "type": "cds.Integer"\n        }\n      }\n    }\n  }\n}\n\n'})})]})}function d(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>c,x:()=>o});var i=t(6540);const s={},r=i.createContext(s);function c(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);