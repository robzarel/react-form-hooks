import required from '../validators/required';

describe('required validator', () => {
  describe('whitout provided error message', () => {
    it('should return default error message for falsy value', async () => {
      const error = undefined;
      const invalidValue = '';
      const result = await required(error)(invalidValue);

      expect(result).toBe('Обязательное поле');
    });
    it('should return null for truthy value', async () => {
      const error = undefined;
      const validValue = 'some value string';
      const result = await required(error)(validValue);

      expect(result).toBe(null);
    });
  });
  describe('with provided error message', () => {
    it('should return provided error message for falsy value', async () => {
      const error = 'Вам пришла ошибочка - получите, распишитесь';
      const invalidValue = '';
      const result = await required(error)(invalidValue);

      expect(result).toBe(error);
    });
    it('should return null for truthy value', async () => {
      const error = 'Сегодня не ваш день, вы ошиблись';
      const validValue = 'some value string';
      const result = await required(error)(validValue);

      expect(result).toBe(null);
    });
  });
});
