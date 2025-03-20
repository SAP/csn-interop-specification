// See https://github.com/testing-library/react-testing-library/issues/36#issuecomment-440442300
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
  interface Matchers<R> {
    /**
     * Checks that the ValidationResults contain entries that include a validation message (substring)
     *
     * This uses a JavaScript <String>.includes check
     *
     * @param expectedMessage Validation Message (substring)
     * @param count           How many instances of the rule-id we expect. Defaults to 1
     */
    toContainValidationMessage(expectedMessage: string, count: number = 1): R;
  }
}
