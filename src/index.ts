import * as staticCsnInteropEffectiveSchema from "./spec-v1/csn-interop-effective.schema.json";
import * as staticCsnInteropEffectiveSchemaWithXProperties from "./spec-v1/csn-interop-effective.schema.x.json";
import { JSONSchema7 } from "json-schema";
import { SpecJsonSchemaRoot } from "../spec-toolkit/src/index";

export * from "./types";

export const schemas = {
  /**
   * CSN Interop Effective interface described in JSON Schema (draft-07)
   *
   * This schema also includes the standardized annotations.
   */
  csnInteropEffectiveSchema: staticCsnInteropEffectiveSchema as unknown as JSONSchema7,

  /**
   * CSN Interop Effective interface described in JSON Schema (draft-07)
   *
   * This schema also includes the standardized annotations and custom "x-..." properties.
   */
  csnInteropEffectiveSchemaWithXProperties:
    staticCsnInteropEffectiveSchemaWithXProperties as unknown as SpecJsonSchemaRoot,
};
