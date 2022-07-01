import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UseSyncedStateOpts<T> = {
  initial_value?: T;
  localStorage?: {
    transform_set: (value: T | undefined) => string;
    transform_get: (value: string) => T | undefined;
    key: string;
  };
  /** When you want to pass optional state controls from props */
  controls?: {
    value?: T | undefined;
    setValue?: (val: T | undefined) => void;
  };
  /** For when you want the state to be reflected in the url params */
  param_control?: {
    transform_set: (value: T | undefined) => string;
    transform_get: (value: string) => T | undefined;
    key: string;
  };
};

export function useSyncedState<T>(
  opts: UseSyncedStateOpts<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  let initialValue: T | undefined = opts?.initial_value;
  if (opts.localStorage) {
    const localStorageValue = localStorage.getItem(
      opts.localStorage.key
    );
    if (localStorageValue !== null) {
      initialValue = opts.localStorage.transform_get(
        localStorageValue
      );
    }
  }
  const location = useLocation();
  const navigate = useNavigate();
  if (opts.param_control) {
    const param = new URLSearchParams(location.search).get(
      opts.param_control.key
    );
    if (param !== null) {
      initialValue = opts.param_control.transform_get(param);
    }
  }

  const [value, setValue] =
    useState<T | undefined>(initialValue);

  useEffect(() => {
    if (opts.localStorage) {
      localStorage.setItem(
        opts.localStorage.key,
        opts.localStorage.transform_set(value)
      );
    }
    if (opts.controls && opts.controls.value !== value) {
      opts.controls?.setValue?.(value);
    }
    if (opts.param_control) {
      const param = new URLSearchParams(location.search).get(
        opts.param_control.key
      );
      if (
        param === null ||
        opts.param_control.transform_get(param) !== value
      ) {
        const newParams = new URLSearchParams(location.search);
        newParams.set(
          opts.param_control.key,
          opts.param_control.transform_set(value)
        );
        navigate({
          search: newParams.toString(),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, opts.localStorage === undefined]);

  useEffect(() => {
    if (opts.controls && value !== opts.controls.value) {
      setValue(opts.controls?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.controls?.value]);

  useEffect(() => {
    if (opts.param_control) {
      const param = new URLSearchParams(location.search).get(
        opts.param_control.key
      );
      if (param !== null) {
        const newValue = opts.param_control.transform_get(param);
        if (newValue !== value) {
          setValue(newValue);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return [value, setValue];
}
