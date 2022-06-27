import { useState } from "react";

export function useControlledState<T>(
  initialValue: T,
  value?: T,
  onChange?: (val: T) => void
): [T, (val: T) => void] {
  const [stateValue, stateOnChange] = useState<T>(initialValue);

  if (value && onChange) {
    return [value, onChange];
  }

  return [stateValue as T, stateOnChange];
}
