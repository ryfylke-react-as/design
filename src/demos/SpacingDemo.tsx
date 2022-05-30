import { ComponentBox, DemoContainer } from "../demo.styles";
import tokens from "../tokens";

export function SpacingDemo(): JSX.Element {
  return (
    <DemoContainer>
      <ComponentBox
        style={{
          flexDirection: "column",
        }}
      >
        {Object.keys(tokens.spacing).map((level) => (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "100%",
                maxWidth: 150,
              }}
            >
              <strong>{String(level).padStart(2, "0")}</strong> (
              {tokens.spacing[Number(level)]}):
            </div>
            <div
              style={{
                height: tokens.spacing[+level],
                background: "var(--c-ui-03)",
                width: "100%",
              }}
            ></div>
          </div>
        ))}
      </ComponentBox>
    </DemoContainer>
  );
}
