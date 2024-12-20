import * as staticCsnInteropEffectiveSchema from "./spec-v1/csn-interop-effective.schema.json";
import * as staticCsnInteropEffectiveSchemaWithAnnotations from "./spec-v1/csn-interop-effective.annotated.schema.json";

import { JSONSchema7 } from "json-schema";
import { SpecJsonSchemaRoot } from "./spec-toolkit/model/SpecJsonSchema";

export * from "./types";
export * from "./spec-toolkit";

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

  csnInteropEffectiveSchemaWithAnnotations:
    staticCsnInteropEffectiveSchemaWithAnnotations as unknown as SpecJsonSchemaRoot,
};
