import type { GetValidator } from "./index";
import getImageDimensions from "../utils/get-image-dimensions";

const DEFAULT_MAX_RESOLUTION_IN_PIXELS = 25000000; // 25 mega pixels

const MYMETYPE_WHITELIST = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/svg+xml",
];

const imageMaxResolution: GetValidator<number, File> = (
  maxResolutionInPixels = DEFAULT_MAX_RESOLUTION_IN_PIXELS,
  mimeTypesToCheck = MYMETYPE_WHITELIST
) => {
  if (maxResolutionInPixels <= 0) {
    throw new Error(
      `Валидатор imageMaxResolution ожидает положительное ограничение разрешения изображения, получил ${maxResolutionInPixels}`
    );
  }

  return async (file) => {
    // выполняем валидацию только для поддерживаемых типов изображений
    if (!mimeTypesToCheck.includes(file.type)) {
      return null;
    }

    let resolution = Infinity; // делаем невалидное значение по умолчанию
    let errorMessage = null;

    try {
      const dimensions = await getImageDimensions(file);
      if (dimensions) {
        resolution = dimensions.width * dimensions.height;
      }
    } catch (error) {
      errorMessage = "Невалидный файл изображения, см. консоль";
      /* tslint:disable: no-console */
      console.error(
        `Невозможно определить размер изображения. Детали: ${error}`
      );
    }

    return resolution <= maxResolutionInPixels
      ? null
      : errorMessage ?? `Изображение должно быть до ${resolution / 1000000} мп`;
  };
};

export { DEFAULT_MAX_RESOLUTION_IN_PIXELS };
export default imageMaxResolution;
