import * as staticCsnInteropEffectiveSchema from "./spec-v1/csn-interop-effective.schema.json";
import { SpecJsonSchemaRoot } from "../spec-toolkit/src/index";
export * from "./types";

export const schemas = {
  /**
   * CSN Interop Effective interface described in JSON Schema (draft-07)
   *
   * This schema also includes the standardized annotations.
   */
  csnInteropEffectiveSchema: staticCsnInteropEffectiveSchema as unknown as SpecJsonSchemaRoot,
};
