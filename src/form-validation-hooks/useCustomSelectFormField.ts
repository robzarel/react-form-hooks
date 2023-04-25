import { useCallback, useState } from 'react';

import type { Validator, ValidationResult } from '../validators';
import validateValue from '../validators';
import type { DefaultField } from './types';

type CustomSelectField = DefaultField & {
  handleChange: (value: string) => void;
  handleClose: () => void;
};

function useCustomSelect(
  id: string,
  validators: Validator<string>[],
  init = ''
): CustomSelectField {
  const [value, setValue] = useState(init);
  const [error, setError] = useState<ValidationResult>(null);

  const handleChange = useCallback(
    async (val: string) => {
      setValue(val);
      setError(await validateValue(val, validators));
    },
    [validators]
  );

  const handleClose = useCallback(async () => {
    setError(await validateValue(value, validators));
  }, [value, validators]);

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
    handleClose,
  };
}

export { CustomSelectField };
export default useCustomSelect;
