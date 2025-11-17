import * as fg from "fast-glob";
import * as fs from "fs-extra";
import { compileSchema, JsonError } from "json-schema-library";
import { CSNInteropEffectiveDocument } from "../../generated/spec/v1/types";

const effectiveCsnSchema = fs.readJSONSync(
  "./src/generated/spec-v1/schemas/csn-interop-effective.schema.json",
) as CSNInteropEffectiveDocument;

const effectiveCsnSchemaExtended = fs.readJSONSync(
  "./src/generated/spec-v1/schemas/csn-interop-effective.schema.json",
) as CSNInteropEffectiveDocument;

const effectiveCsnSchemaValidator = compileSchema(effectiveCsnSchema);
const effectiveCsnSchemaExtendedValidator = compileSchema(effectiveCsnSchemaExtended);

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
          const result = effectiveCsnSchemaValidator.validate(data);
          expect(simplifyValidationErrors(result.errors)).toEqual([]);
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
          const result = effectiveCsnSchemaExtendedValidator.validate(data);
          expect(simplifyValidationErrors(result.errors)).toEqual([]);
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
      code: String(el.code),
      pointer: el.data.pointer,
      message: el.message,
    };
  });
}
