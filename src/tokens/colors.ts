import { ColorToken } from "../types";

export const colors: {
  dm: Record<ColorToken, string>;
  lm: Record<ColorToken, string>;
} = {
  dm: {
    "ui-01": "#181b1a",
    "ui-02": "#3a403f",
    "ui-03": "#535757",
    "ui-04": "#717474",
    "ui-05": "#838686",
    "ui-bg": "#0f0f10",
    "text-01": "#fff",
    "text-02": "#cacad3",
    "text-03": "#9e9e9e",
    "text-04": "#ffffff",
    "text-05": "#000000",
    primary: "#1ba886",
    danger: "#a81b3d",
    focus: "#8056ff",
  },
  lm: {
    "ui-01": "#f4f6f6",
    "ui-02": "#e4e4e4",
    "ui-03": "#707574",
    "ui-04": "#3a403f",
    "ui-05": "#272D2C",
    "ui-bg": "#ffffff",
    "text-01": "#000000",
    "text-02": "#2c3735",
    "text-03": "#6e6e6e",
    "text-04": "#ffffff",
    "text-05": "#000000",
    primary: "#1ba886",
    danger: "#a81b3d",
    focus: "#6a38ff",
  },
};
