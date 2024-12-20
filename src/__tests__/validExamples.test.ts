import * as fg from "fast-glob";
import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import { ensureRootLevelSchema } from "../spec-toolkit/util/jsonSchemaConversion";
import { Draft07, JsonError } from "json-schema-library";
import { SpecJsonSchemaRoot } from "../spec-toolkit/model/SpecJsonSchema";

let effectiveCsnSchema = yaml.load(
  fs.readFileSync(`./spec/v1/CSN-Interop-Effective.schema.yaml`).toString(),
) as SpecJsonSchemaRoot;
effectiveCsnSchema = ensureRootLevelSchema(effectiveCsnSchema);
const effectiveCsnSchemaExtended = fs.readJSONSync(
  "./src/spec-v1/csn-interop-effective.schema.json",
) as SpecJsonSchemaRoot;

const effectiveCsnSchemaValidator = new Draft07(effectiveCsnSchema);
const effectiveCsnSchemaExtendedValidator = new Draft07(effectiveCsnSchemaExtended);

const documentFilePaths = fg.sync("./examples/*.json", {});

describe("Valid Example Files", (): void => {
  describe("CSN Interop Effective (core only)", (): void => {
    for (const filePath of documentFilePaths) {
      const fileContent = fs.readFileSync(filePath).toString();
      describe(filePath, (): void => {
        test("passes simple JSON Schema based validation", (): void => {
          const data = JSON.parse(fileContent);
          expect(fileContent).toBeDefined();
          expect(data).toBeDefined();
          const errors: JsonError[] = effectiveCsnSchemaValidator.validate(data);
          expect(simplifyValidationErrors(errors)).toEqual([]);
        });
      });
    }
  });

  describe("CSN Interop Effective (incl. annotations)", (): void => {
    for (const filePath of documentFilePaths) {
      const fileContent = fs.readFileSync(filePath).toString();
      describe(filePath, (): void => {
        test("passes simple JSON Schema based validation", (): void => {
          const data = JSON.parse(fileContent);
          expect(fileContent).toBeDefined();
          expect(data).toBeDefined();
          const errors: JsonError[] = effectiveCsnSchemaExtendedValidator.validate(data);
          expect(simplifyValidationErrors(errors)).toEqual([]);
        });
      });
    }
  });
});

export type JsonSchemaValidationError = {
  code: string;
  pointer: string;
  message: string;
};
export function simplifyValidationErrors(errors: JsonError[]): JsonSchemaValidationError[] {
  return errors.map((el) => {
    return {
      code: el.code,
      pointer: el.data.pointer,
      message: el.message,
    };
  });
}
