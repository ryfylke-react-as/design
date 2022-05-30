import { Header } from "../components/Header";
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
  return (
    <DemoContainer>
      <Header order={2}>Colors</Header>
      <ColorGrid>
        {Object.keys(tokens.colors[isDm ? "dm" : "lm"]).map(
          (name: string) => (
            <div
              style={{
                background:
                  tokens.colors[isDm ? "dm" : "lm"][
                    name as ColorToken
                  ],
                color: pickTextColor(
                  tokens.colors[isDm ? "dm" : "lm"][
                    name as ColorToken
                  ]
                ),
              }}
            >
              <span>{name}</span>
              <span>
                {
                  tokens.colors[isDm ? "dm" : "lm"][
                    name as ColorToken
                  ]
                }
              </span>
            </div>
          )
        )}
      </ColorGrid>
    </DemoContainer>
  );
}
