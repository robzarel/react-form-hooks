type DefaultField = {
  id: string;
  value: string;
  error: null | string;
  hasError: () => Promise<boolean>;
  reset: () => void;
};

export { FilesField } from "./useFilesFormField";
export { RadioField } from "./useRadioFormField";
export { TextField } from "./useTextFormField";
export { CustomSelectField } from "./useCustomSelectFormField";
export { DefaultField };
