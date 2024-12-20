/* global jest expect */

jest.retryTimes(3);

expect.extend({
  toContainValidationMessage(validationResults, message, count = 1) {
    if (!Array.isArray(validationResults)) {
      return {
        message: () => `expected ${JSON.stringify(validationResults)} to be a valid ValidationResult array`,
        pass: false,
      };
    }

    let internalCounter = 0;
    for (const result of validationResults) {
      if (result.message.includes(message)) {
        internalCounter++;
      }
    }
    if (count !== internalCounter) {
      return {
        message: () =>
          `expected to find ${count} validation messages, containing "${message}", instead got ${internalCounter}`,
        pass: false,
      };
    } else {
      return {
        message: () => `found ${count} validation messages, containing "${message}"`,
        pass: true,
      };
    }
  },
});
