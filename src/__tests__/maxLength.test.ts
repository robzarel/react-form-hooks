import maxLength, { DEFAULT_MAX_CHAR_COUNT } from '../validators/max-length';

describe('maxLength validator', () => {
  describe('no provided char count limit', () => {
    it('should return error message if value length is more than default char count limit', async () => {
      const charCount = undefined;
      const invalidValue = 'r'.repeat(DEFAULT_MAX_CHAR_COUNT + 1);
      const error = `Количество символов не должно превышать ${DEFAULT_MAX_CHAR_COUNT}`;
      const result = await maxLength(charCount)(invalidValue);

      expect(result).toBe(error);
    });

    it('should return "null" if value length is less than default char count limit', async () => {
      const charCount = undefined;
      const validValue = 'r'.repeat(DEFAULT_MAX_CHAR_COUNT - 1);
      const result = await maxLength(charCount)(validValue);

      expect(result).toBe(null);
    });
  });

  describe('unallowed char count limit', () => {
    it('should throw an error if char count limit is less than zero', () => {
      const charCount = -1;
      const message = `Валидатор maxLength ожидает положительное ограничение длины строки, получил ${charCount}`;

      expect(() => {
        maxLength(charCount)('some value string');
      }).toThrow(message);
    });

    it('should throw an error if char count limit is equals to zero', () => {
      const charCount = 0;
      const message = `Валидатор maxLength ожидает положительное ограничение длины строки, получил ${charCount}`;
      expect(() => {
        maxLength(charCount)('some value string');
      }).toThrow(message);
    });
  });

  describe('allowed char count limit', () => {
    it('should return "null" if value length is less than char count limit', async () => {
      const charCount = 10;
      const result = await maxLength(charCount)('short str');

      expect(result).toBe(null);
    });

    it('should return error message if value length is more than char count limit', async () => {
      const charCount = 10;
      const error = `Количество символов не должно превышать ${charCount}`;
      const result = await maxLength(charCount)('long value string');

      expect(result).toBe(error);
    });
  });
});
