import { useCallback, useState } from "react";

import type { Validator, ValidationResult } from "../validators";
import validateValue from "../validators";
import type { DefaultField } from "./types";

type RadioField = DefaultField & {
  handleChange: (value: string) => void;
};

function useRadioFormField(
  id: string,
  validators: Validator<string>[],
  init = ""
): RadioField {
  const [value, setValue] = useState(init);
  const [error, setError] = useState<ValidationResult>(null);

  const handleChange = useCallback(
    async (val: string) => {
      setValue(val);
      setError(await validateValue(val, validators));
    },
    [validators]
  );

  const hasError = useCallback(async () => {
    const err = await validateValue(value, validators);
    setError(err);

    return !!err;
  }, [value, validators]);

  return {
    id,
    value,
    error,
    hasError,
    handleChange,
  };
}

export { RadioField };
export default useRadioFormField;
