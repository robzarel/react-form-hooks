import minLength, { DEFAULT_MIN_CHAR_COUNT } from '../validators/min-length';

describe('minLength validator', () => {
  describe('no provided minimal char count value', () => {
    it('should return error message if value length is less than default minimal char count', async () => {
      const charCount = undefined;
      const invalidValue = 'r'.repeat(DEFAULT_MIN_CHAR_COUNT - 1);
      const error = `Количество символов не должно быть меньше ${DEFAULT_MIN_CHAR_COUNT}`;
      const result = await minLength(charCount)(invalidValue);

      expect(result).toBe(error);
    });

    it('should return "null" if value length is more than default minimal char count', async () => {
      const charCount = undefined;
      const validValue = 'r'.repeat(DEFAULT_MIN_CHAR_COUNT + 1);
      const result = await minLength(charCount)(validValue);

      expect(result).toBe(null);
    });
  });

  describe('unallowed minimal char count value', () => {
    it('should throw an error if char count limit is less than zero', () => {
      const charCount = -1;
      const message = `Валидатор minLength ожидает положительное минимальное значение длины строки, получил ${charCount}`;

      expect(() => {
        minLength(charCount)('some value string');
      }).toThrow(message);
    });

    it('should throw an error if char count limit is equals to zero', () => {
      const charCount = 0;
      const message = `Валидатор minLength ожидает положительное минимальное значение длины строки, получил ${charCount}`;

      expect(() => {
        minLength(charCount)('some value string');
      }).toThrow(message);
    });
  });

  describe('allowed minimal char count value', () => {
    it('should return "null" if value length is more than minimal char count', async () => {
      const charCount = 10;
      const result = await minLength(charCount)('long value string');

      expect(result).toBe(null);
    });

    it('should return error message if value length is less than minimal char count', async () => {
      const charCount = 10;
      const error = `Количество символов не должно быть меньше ${charCount}`;
      const result = await minLength(charCount)('short str');

      expect(result).toBe(error);
    });
  });
});
