---
sidebar_position: 20
title: "Consumption"
hide_title: false
---

## 1. NPM package

### Prerequisite

Project should be using Node v20 or higher. Optional have TypeScript enabled.

### NPM Installation

- Install the package:

   ```bash
   npm install @sap/csn-interop-specification
   ```

- Import the JSON schema and use it in code:

   ```js
   import { schemas } from "@sap/csn-interop-specification";
   ```

- (Optional) When using TypeScript import and use the types:

   ```js
   import { CSNInteropRoot } from "@sap/csn-interop-specification";
   ```

## 2. Direct schema reference in a `.json` file via `$` property

This enables json property name validation and code intellisense while editing CSN Interop files in an IDE.

```json5
{
   // highlight-next-line
  "$schema": "https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json",
  "csnInteropEffective": "1.0",
  "$version": "2.0",
  "definitions": {
    "Airline": {
      "kind": "entity",
      "elements": {
        "Name": {
          "type": "cds.String",
        }
      }
    }
  }
}
```
