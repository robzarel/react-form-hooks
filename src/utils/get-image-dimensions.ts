/**
 * Возвращает ширину и высоту изображения, на основе переданного файла изображения.
 * Применяется при валидации размеров загруженных изображений.
 * @param file Файл изображения
 */
const getImageDimensions = async (
  file: File
): Promise<{ width: number; height: number } | null> => {
  const img = new Image();
  const url = window.URL.createObjectURL(file);
  img.src = url;

  let res = null;

  try {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode
    await img.decode();
    res = { width: img.naturalWidth, height: img.naturalHeight };
  } catch (encodingError) {
    /* tslint:disable: no-console */
    console.error(
      encodingError instanceof Error
        ? encodingError.message
        : "getImageDimensions: something went wrong during file encoding."
    );
  } finally {
    window.URL.revokeObjectURL(url);
  }

  return res;
};

export default getImageDimensions;
