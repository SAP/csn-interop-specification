"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[666],{3067:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>c,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"spec-v1/examples/tables_with_primary_key","title":"tables_with_primary_key","description":"Example documents for CSN Interop Effective.","source":"@site/docs/spec-v1/examples/tables_with_primary_key.md","sourceDirName":"spec-v1/examples","slug":"/spec-v1/examples/tables_with_primary_key","permalink":"/csn-interop-specification/spec-v1/examples/tables_with_primary_key","draft":false,"unlisted":false,"editUrl":"https://github.com/SAP/csn-interop-specification/tree/main/docs/spec-v1/examples/tables_with_primary_key.md","tags":[],"version":"current","frontMatter":{"title":"tables_with_primary_key","description":"Example documents for CSN Interop Effective."},"sidebar":"defaultSidebar","previous":{"title":"entities_with_foreign_key_and_text_assocs","permalink":"/csn-interop-specification/spec-v1/examples/entities_with_foreign_key_and_text_assocs"},"next":{"title":"Annotations","permalink":"/csn-interop-specification/annotations/"}}');var r=t(4848),s=t(8453);const c={title:"tables_with_primary_key",description:"Example documents for CSN Interop Effective."},a="Example: tables_with_primary_key",p={},o=[{value:"./examples/tables_with_primary_key.json",id:"examplestables_with_primary_keyjson",level:3}];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"example-tables_with_primary_key",children:"Example: tables_with_primary_key"})}),"\n",(0,r.jsx)(e.h3,{id:"examplestables_with_primary_keyjson",children:"./examples/tables_with_primary_key.json"}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.p,{children:["Source Code: ",(0,r.jsx)(e.a,{href:"https://github.com/SAP/csn-interop-specification/blob/main/examples/tables_with_primary_key.json",children:"./examples/tables_with_primary_key.json"})]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'{\n  "csnInteropEffective": "1.0",\n  "$version": "2.0",\n  "meta": {\n    "document": {\n      "version": "1.2.3"\n    },\n    "features": {\n      "complete": true\n    }\n  },\n  "definitions": {\n    "Airline": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "Name": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "AirlinePicURL": {\n          "type": "cds.String",\n          "length": 1000\n        }\n      }\n    },\n    "Airport": {\n      "kind": "entity",\n      "elements": {\n        "AirportID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "Name": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "City": {\n          "type": "cds.String",\n          "length": 40\n        },\n        "CountryCode_code": {\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Countries": {\n      "kind": "entity",\n      "elements": {\n        "code": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Countries_texts": {\n      "kind": "entity",\n      "elements": {\n        "code": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "locale": {\n          "key": true,\n          "type": "cds.String",\n          "length": 14\n        },\n        "name": {\n          "type": "cds.String",\n          "length": 255\n        },\n        "descr": {\n          "type": "cds.String",\n          "length": 1000\n        }\n      }\n    },\n    "FlightConnection": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "ConnectionID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 4\n        },\n        "DepartureAirport_AirportID": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "DestinationAirport_AirportID": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "DepartureTime": {\n          "type": "cds.Time"\n        },\n        "ArrivalTime": {\n          "type": "cds.Time"\n        },\n        "Distance": {\n          "type": "cds.Integer"\n        },\n        "DistanceUnit": {\n          "type": "cds.String",\n          "length": 3\n        }\n      }\n    },\n    "Flight": {\n      "kind": "entity",\n      "elements": {\n        "AirlineID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 3\n        },\n        "FlightDate": {\n          "key": true,\n          "type": "cds.Date"\n        },\n        "ConnectionID": {\n          "key": true,\n          "type": "cds.String",\n          "length": 4\n        },\n        "Price": {\n          "type": "cds.Decimal",\n          "precision": 16,\n          "scale": 3\n        },\n        "CurrencyCode_code": {\n          "type": "cds.String",\n          "length": 3\n        },\n        "PlaneType": {\n          "type": "cds.String",\n          "length": 10\n        },\n        "MaximumSeats": {\n          "type": "cds.Integer"\n        },\n        "OccupiedSeats": {\n          "type": "cds.Integer"\n        }\n      }\n    }\n  }\n}\n\n'})})]})}function d(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>c,x:()=>a});var i=t(6540);const r={},s=i.createContext(r);function c(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);