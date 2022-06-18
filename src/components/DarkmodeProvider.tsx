import {
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

const lsDM = localStorage.getItem(DARKMODE_LOCALSTORAGE_TOKEN);
const parsedLSDM = lsDM ? JSON.parse(lsDM) : null;
const defaultDarkmodeValue =
  parsedLSDM && typeof parsedLSDM === "boolean"
    ? parsedLSDM
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

export const DarkmodeContext = createContext({
  isDM: defaultDarkmodeValue,
  setDM: (val: boolean) => {},
});

export function DarkmodeProvider({
  children,
}: DarkmodeProviderProps) {
  const [isDM, setDM] = useState(defaultDarkmodeValue);

  useEffect(() => {
    if (isDM) {
      localStorage.setItem(DARKMODE_LOCALSTORAGE_TOKEN, "true");
      document.body.classList.add("dm");
    } else {
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
