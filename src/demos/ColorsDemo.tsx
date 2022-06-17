import { ColorGrid, DemoContainer } from "../demo.styles";
import tokens from "../tokens";
import { ColorToken } from "../types";
import { pickTextColor } from "../utils";

type ColorsDemoProps = {
  isDm: boolean;
};

export function ColorsDemo({
  isDm,
}: ColorsDemoProps): JSX.Element {
  const colors = Object.keys(tokens.colors[isDm ? "dm" : "lm"]);
  const findColor = (startsWith: string) =>
    colors.filter((val) => val.startsWith(startsWith));
  const uiColors = findColor("ui-");
  const textColors = findColor("text-");
  const primaryColors = findColor("primary");
  const successColors = findColor("success");
  const dangerColors = findColor("danger");
  const focusColors = findColor("focus");
  const colorMapper = (name: string) => (
    <div
      style={{
        background:
          tokens.colors[isDm ? "dm" : "lm"][name as ColorToken],
        color: pickTextColor(
          tokens.colors[isDm ? "dm" : "lm"][name as ColorToken]
        ),
      }}
    >
      <span>{name}</span>
      <span>
        {tokens.colors[isDm ? "dm" : "lm"][name as ColorToken]}
      </span>
    </div>
  );
  return (
    <DemoContainer>
      <ColorGrid>{uiColors.map(colorMapper)}</ColorGrid>
      <ColorGrid>{textColors.map(colorMapper)}</ColorGrid>
      <ColorGrid>{successColors.map(colorMapper)}</ColorGrid>
      <ColorGrid>{dangerColors.map(colorMapper)}</ColorGrid>
      <ColorGrid>{primaryColors.map(colorMapper)}</ColorGrid>
      <ColorGrid>{focusColors.map(colorMapper)}</ColorGrid>
    </DemoContainer>
  );
}
