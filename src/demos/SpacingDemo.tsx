import { Header } from "../components/Header";
import { DemoContainer, VerticalDivide } from "../demo.styles";
import tokens from "../tokens";

export function SpacingDemo(): JSX.Element {
  return (
    <DemoContainer>
      <Header order={2}>Spacing</Header>
      <VerticalDivide
        style={{
          background: "var(--c-ui-01)",
          marginTop: "var(--s-05)",
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
      </VerticalDivide>
    </DemoContainer>
  );
}
