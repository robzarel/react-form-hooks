import type { GetValidator } from "./index";

const DEFAULT_MAX_CHAR_COUNT = 100;

const maxLength: GetValidator<number, string> = (
  maxCharCount = DEFAULT_MAX_CHAR_COUNT
) => {
  if (maxCharCount <= 0) {
    throw new Error(
      `Валидатор maxLength ожидает положительное ограничение длины строки, получил ${maxCharCount}`
    );
  }

  return async (value) =>
    value.length <= maxCharCount
      ? null
      : `Количество символов не должно превышать ${maxCharCount}`;
};

export { DEFAULT_MAX_CHAR_COUNT };
export default maxLength;
