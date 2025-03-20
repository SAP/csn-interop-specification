import * as fg from "fast-glob";
import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import { Draft07, JsonError, JsonSchema } from "json-schema-library";

const effectiveCsnSchema = yaml.load(
  fs.readFileSync(`./spec/v1/CSN-Interop-Effective.schema.yaml`).toString(),
) as JsonSchema;

const effectiveCsnSchemaExtended = fs.readJSONSync(
  "./src/generated/spec-v1/schemas/csn-interop-effective.schema.json",
) as JsonSchema;

const effectiveCsnSchemaValidator = new Draft07(effectiveCsnSchema);
const effectiveCsnSchemaExtendedValidator = new Draft07(effectiveCsnSchemaExtended);

const documentFilePaths = fg.sync("./spec/v1/examples/*.json", {});

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
