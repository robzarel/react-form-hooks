import type { GetValidator } from "./index";

const required: GetValidator<string, string> = (
  message = "Обязательное поле"
) => {
  return async (value) => (value ? null : message);
};

export default required;
