import onlyLetters from "../validators/only-letters";

describe("onlyLetters validator", () => {
  describe("whitout provided error message", () => {
    it("should return default error message for invalid value", async () => {
      const error = undefined;
      const invalidValue = "123";
      const result = await onlyLetters(error)(invalidValue);

      expect(result).toBe("Допустимы только кириллица или латинница");
    });
    it("should return null for valid value", async () => {
      const error = undefined;
      const validValue = "somestringwithallowedsymbolsфываф";
      const result = await onlyLetters(error)(validValue);

      expect(result).toBe(null);
    });
    it("should return null for empty value", async () => {
      const error = undefined;
      const validValue = "";
      const result = await onlyLetters(error)(validValue);

      expect(result).toBe(null);
    });
  });
  describe("with provided error message", () => {
    it("should return provided error message for invalid value", async () => {
      const error = "В это сложно поверить, но произошла ошибка!";
      const invalidValue = "строка с неразрешёнными символами )),./&6599 ";
      const result = await onlyLetters(error)(invalidValue);

      expect(result).toBe(error);
    });
    it("should return null for valid value", async () => {
      const error = "Сегодня не ваш день, вы ошиблись";
      const validValue = "somestringwithallowedsymbolsфываф";
      const result = await onlyLetters(error)(validValue);

      expect(result).toBe(null);
    });
  });
});
