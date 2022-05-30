import { useEffect, useState } from "react";
import styled from "styled-components";
import { LabelGroup } from "./components/LabelGroup";
import { Header } from "./components/Header";
import { Text } from "./components/Text";
import { ToastProvider } from "./components/ToastProvider";
import { GlobalStyles } from "./styled-utils";
import { TypographyDemo } from "./demos/TypographyDemo";
import { ColorsDemo } from "./demos/ColorsDemo";
import { SpacingDemo } from "./demos/SpacingDemo";
import { ButtonDemo } from "./demos/ButtonDemo";
import { TextInputDemo } from "./demos/TextInputDemo";
import { SelectDemo } from "./demos/SelectDemo";
import { DemoContainer } from "./demo.styles";

function App() {
  const [isDm, setDM] = useState(false);

  useEffect(() => {
    if (isDm) {
      document.body.classList.add("dm");
    } else {
      document.body.classList.remove("dm");
    }
  }, [isDm]);

  return (
    <Container>
      <GlobalStyles />
      <ToastProvider location="topright" zIndex={500} />
      <div
        style={{
          position: "fixed",
          top: "var(--s-05)",
          right: "var(--s-05)",
        }}
      >
        <LabelGroup label="Darkmode">
          <input
            type="checkbox"
            checked={isDm}
            onChange={(e) => setDM(!isDm)}
          />
        </LabelGroup>
      </div>
      <Header
        order={1}
        id="top"
        style={{
          fontFamily: `"Ubuntu Mono"`,
          width: "min-content",
          background: "var(--c-ui-01)",
        }}
      >
        <span style={{ color: "var(--c-focus)" }}>Ryfrea</span>
        Components
      </Header>
      <Text>
        A collection of design-tokens (spacing, colors,
        typography) and React components.
      </Text>
      <hr />
      <hr />
      <List>
        <Header order={1} as="h2">
          Guidelines
        </Header>
        <EquallySpaced>
          <TypographyDemo />
          <ColorsDemo isDm={isDm} />
        </EquallySpaced>
        <EquallySpaced>
          <SpacingDemo />
          <div>
            <Text kind="p">
              We use the "Ubuntu" and "Ubuntu Mono" font
              families.{" "}
              <Text kind="code" as="span">
                text-01
              </Text>{" "}
              should be reserved for headers and callouts,{" "}
              <Text kind="code" as="span">
                text-02
              </Text>{" "}
              should be used mostly on body text. This is to
              prevent eye straining, and direct focus.
            </Text>
          </div>
        </EquallySpaced>
        <hr />
        <Header order={1} as="h2">
          Components
        </Header>
        <ButtonDemo />
        <TextInputDemo />
        <SelectDemo />
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  padding: var(--s-08) var(--s-05);
  gap: var(--s-01);
  max-width: 1200px;
  color: var(--c-text-02);
  p {
    color: var(--c-text-02);
  }
  hr {
    border: none;
    background: transparent;
    margin: var(--s-05);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--s-05);
  ${DemoContainer} > h2 {
    margin: var(--s-05) 0;
  }
`;

const EquallySpaced = styled.div`
  display: flex;
  gap: var(--s-05);
  > div {
    width: 100%;
    flex: 1;
  }
`;

export default App;
