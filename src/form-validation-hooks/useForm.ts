import { useState } from "react";
import type { FormEventHandler } from "react";
import type { DefaultField } from "./types";

function useForm<Field extends DefaultField, Response>(props: {
  fields: Field[];
  apiCall: () => Promise<Response>;
  onSuccess?: (response: Response) => void;
  onFailure?: (error: string) => void;
}): {
  isSending: boolean;
  sendingError: string;
  hasFieldErrors: boolean;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
} {
  const { fields, apiCall, onSuccess, onFailure } = props;

  const [isSending, setIsSending] = useState(false);
  const [sendingError, setSendingError] = useState("");

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const errors = await Promise.all(fields.map((field) => field.hasError()));
    const isFormValid = errors.every((error) => !error);

    if (isFormValid) {
      setIsSending(true);
      setSendingError("");

      try {
        const response = await apiCall();
        onSuccess?.(response);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Что-то пошло не так, попробуйте ещё раз";

        setSendingError(msg);
        onFailure?.(msg);
      } finally {
        setIsSending(false);
      }
    }
  };

  const hasFieldErrors = fields.some((field) => !!field.error);

  return {
    isSending,
    sendingError,
    hasFieldErrors,
    handleFormSubmit,
  };
}

export default useForm;
