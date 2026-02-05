import * as staticCsnInteropEffectiveSchema from "./generated/spec/v1/schemas/csn-interop-effective.schema.json";
import { SpecJsonSchemaRoot } from "@open-resource-discovery/spec-toolkit";

export * from "./generated/spec/v1/types";

export const schemas = {
  /**
   * CSN Interop Effective interface described in JSON Schema (draft-07)
   *
   * This schema also includes the standardized annotations.
   */
  csnInteropEffectiveSchema: staticCsnInteropEffectiveSchema as unknown as SpecJsonSchemaRoot,
};
