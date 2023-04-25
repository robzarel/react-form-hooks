import type { GetValidator } from "./index";

const DEFAULT_MIN_CHAR_COUNT = 1;

const minLength: GetValidator<number, string> = (
  minCharCount = DEFAULT_MIN_CHAR_COUNT
) => {
  if (minCharCount <= 0) {
    throw new Error(
      `Валидатор minLength ожидает положительное минимальное значение длины строки, получил ${minCharCount}`
    );
  }

  return async (value) =>
    value.length >= minCharCount
      ? null
      : `Количество символов не должно быть меньше ${minCharCount}`;
};

export { DEFAULT_MIN_CHAR_COUNT };
export default minLength;
