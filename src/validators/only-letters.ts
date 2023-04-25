import type { GetValidator } from "./index";

const regex = /^$|[а-яА-Яa-zA-Z]+$/i;

const onlyLetters: GetValidator<string, string> = (
  message = "Допустимы только кириллица или латинница"
) => {
  return async (value) => (regex.test(value) ? null : message);
};

export default onlyLetters;
