import { useCallback, useState } from "react";

import type { Validator, ValidationResult } from "../validators";
import validateValue from "../validators";
import type { DefaultField } from "./types";

type FilesField = Omit<DefaultField, "value" | "error"> & {
  value: File[];
  error: ValidationResult[];
  handleChange: (files: File[]) => void;
  clear: () => void;
};

function useFilesFormField(
  id: string,
  validators: Validator<File>[],
  init: File[] = []
): FilesField {
  const [value, setValue] = useState<File[]>(init);
  const [error, setError] = useState<ValidationResult[]>([]);

  const handleChange = useCallback(
    async (files: File[]) => {
      const err = await Promise.all(
        files.map((file) => validateValue<File>(file, validators))
      );

      setValue(files);
      setError(err);
    },
    [validators]
  );

  const hasError = useCallback(async () => {
    const err = await Promise.all<ValidationResult>(
      (value as File[]).map((file) => validateValue<File>(file, validators))
    );

    setError(err);

    return err.some((item) => !!item);
  }, [value, validators]);

  const clear = useCallback(() => {
    setValue([]);
    setError([]);
  }, []);

  const reset = () => {
    setValue(init);
  };

  return {
    id,
    value,
    error,
    reset,
    hasError,
    handleChange,
    clear,
  };
}

export type { FilesField };
export default useFilesFormField;
