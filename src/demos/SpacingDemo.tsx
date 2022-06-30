import { CodePreview } from "../components/demo/CodePreview";
import { Text } from "../components/Text";
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "var(--s-04)",
              flexDirection: "column",
              height: 408.5,
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
                  <strong>
                    {String(level).padStart(2, "0")}
                  </strong>{" "}
                  ({tokens.spacing[+level]}):
                </div>
                <div
                  style={{
                    height: tokens.spacing[+level],
                    background: "var(--c-ui-03)",
                    width: "100%",
                    alignSelf: "center",
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
              gap: "var(--s-02)",
              height: 408.5,
            }}
          >
            {Object.keys(tokens.spacing).map((level) => (
              <div
                style={{
                  width: tokens.spacing[+level],
                  background: "var(--c-ui-03)",
                  height: 408.5,
                }}
              ></div>
            ))}
          </div>
        </div>
      </ComponentBox>
      <Text>Base font size (1rem) = 16px.</Text>
      <CodePreview
        code={Object.keys(tokens.spacing)
          .map(
            (level) =>
              `--s-${String(level).padStart(2, "0")}: ${
                tokens.spacing[+level]
              }; \n`
          )
          .join("")}
      />
    </DemoContainer>
  );
}
