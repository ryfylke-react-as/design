import { ColorToken } from "../types";

export const colors: {
  dm: Record<ColorToken, string>;
  lm: Record<ColorToken, string>;
} = {
  dm: {
    "ui-01": "#181b1a",
    "ui-02": "#3a403f",
    "ui-03": "#535757",
    "ui-04": "#3a403f",
    "ui-bg": "#000000",
    "text-01": "#fff",
    "text-02": "#cacad3",
    "text-03": "#000000",
    "text-04": "#ffffff",
    "text-05": "#000000",
    primary: "#1ba886",
    danger: "#a81b3d",
    focus: "#8056ff",
  },
  lm: {
    "ui-01": "#f8f8f8",
    "ui-02": "#e4e4e4",
    "ui-03": "#707574",
    "ui-04": "#3a403f",
    "ui-bg": "#ffffff",
    "text-01": "#000000",
    "text-02": "#707574",
    "text-03": "#ffffff",
    "text-04": "#ffffff",
    "text-05": "#000000",
    primary: "#1ba886",
    danger: "#a81b3d",
    focus: "#6a38ff",
  },
};
