import type { GetValidator } from "./index";

// максимальное ограничение выставлено в 10мб
// https://gitlab.tcsbank.ru/tj/opis/-/blob/master/app/settings.py#L65
const DEFAULT_MAX_SIZE_IN_BYTES = 10485760;

const maxFileSize: GetValidator<number, File> = (
  maxSizeInBytes = DEFAULT_MAX_SIZE_IN_BYTES
) => {
  if (maxSizeInBytes <= 0) {
    throw new Error(
      `Валидатор maxFileSize ожидает положительное ограничение размера файла, получил ${maxSizeInBytes}`
    );
  }

  return async (file) =>
    file.size <= maxSizeInBytes
      ? null
      : `Файл должен быть до ${(maxSizeInBytes / 1048576).toFixed(1)} мб`;
};

export { DEFAULT_MAX_SIZE_IN_BYTES };
export default maxFileSize;
