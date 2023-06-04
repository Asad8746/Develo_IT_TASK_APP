import { useState, useEffect } from "react";

export const useFormValidation = (initialValue, errorMessage = "") => {
  const [value, setState] = useState(initialValue);
  const [blur, setBlur] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const onChange = (value) => {
    setState(value);
  };
  const onBlur = () => {
    setBlur(true);
  };
  const reset = () => {
    setState(initialValue);
    setBlur(false);
    setIsValid(false);
    setError("");
  };
  useEffect(() => {
    if (value.length <= 0) {
      setError(errorMessage);
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }, [blur, value]);
  return {
    value,
    blur,
    error,
    isValid,
    onChange,
    onBlur,
    reset,
  };
};
