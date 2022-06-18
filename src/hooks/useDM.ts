import { useContext } from "react";
import { DarkmodeContext } from "../components/DarkmodeProvider";

export function useDM() {
  const { isDM, setDM } = useContext(DarkmodeContext);

  return {
    isDM,
    setDM,
  };
}
