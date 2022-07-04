import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DARKMODE_LOCALSTORAGE_TOKEN } from "../constants";

type DarkmodeProviderProps = {
  children: ReactNode;
};

const lsDM =
  typeof window !== "undefined"
    ? localStorage.getItem(DARKMODE_LOCALSTORAGE_TOKEN)
    : null;
const parsedLSDM = lsDM ? JSON.parse(lsDM) : null;
const defaultDarkmodeValue =
  typeof parsedLSDM === "boolean"
    ? parsedLSDM
    : typeof window === "undefined"
    ? false
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

export const DarkmodeContext = createContext<{
  isDM: boolean;
  setDM: (value: boolean) => void;
}>({
  isDM: defaultDarkmodeValue,
  setDM: () => {},
});

export function DarkmodeProvider({
  children,
}: DarkmodeProviderProps) {
  const [isDM, setDM] = useState(defaultDarkmodeValue);

  useEffect(() => {
    if (isDM && typeof window !== "undefined") {
      localStorage.setItem(DARKMODE_LOCALSTORAGE_TOKEN, "true");
      document.body.classList.add("dm");
    } else if (typeof window !== "undefined") {
      localStorage.setItem(DARKMODE_LOCALSTORAGE_TOKEN, "false");
      document.body.classList.remove("dm");
    }
  }, [isDM]);

  return (
    <DarkmodeContext.Provider
      value={useMemo(
        () => ({
          isDM,
          setDM,
        }),
        [isDM]
      )}
    >
      {children}
    </DarkmodeContext.Provider>
  );
}
