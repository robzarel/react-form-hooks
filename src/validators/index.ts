type ValidationResult = string | null;
type Validator<T> = (params: T) => Promise<ValidationResult>;
type GetValidator<Options, Params> = (options?: Options) => Validator<Params>;

const validate = async <T>(
  value: T,
  validators: Validator<T>[]
): Promise<ValidationResult> => {
  let validationResult: ValidationResult = null;
  let i = 0;

  while (validationResult === null && i < validators.length) {
    const res = await validators[i](value);

    if (res) {
      validationResult = res;
    }

    i++;
  }

  return validationResult;
};

export { default as required } from "./required";
export { default as maxLength } from "./max-length";
export { default as minLength } from "./min-length";
export { default as fileMaxSize } from "./file-max-size";
export { default as imageMaxResolution } from "./image-max-resolution";
export { default as onlyLetters } from "./only-letters";

export type { ValidationResult, Validator, GetValidator };
export default validate;
