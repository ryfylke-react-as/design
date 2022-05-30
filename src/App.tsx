import { CSSProperties, useEffect, useState } from "react";
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
  const [roundness, setRoundness] = useState(0);
  const [isDm, setDM] = useState(false);

  useEffect(() => {
    if (isDm) {
      document.body.classList.add("dm");
    } else {
      document.body.classList.remove("dm");
    }
  }, [isDm]);

  return (
    <Container
      style={
        { "--roundness": `${roundness}px` } as CSSProperties
      }
    >
      <GlobalStyles />
      <ToastProvider location="topright" zIndex={500} />
      <div
        style={{
          position: "fixed",
          top: "var(--s-05)",
          right: "var(--s-05)",
        }}
      >
        <LabelGroup label="Roundness">
          <input
            type="range"
            value={roundness}
            min={0}
            max={20}
            onChange={(e) =>
              setRoundness(parseFloat(e.target.value))
            }
          />
        </LabelGroup>

        <LabelGroup label="Darkmode">
          <input
            type="checkbox"
            checked={isDm}
            onChange={(e) => setDM(!isDm)}
          />
        </LabelGroup>
      </div>
      <Header order={1} id="top">
        Ryfyre-Components
      </Header>
      <Text>
        A collection of design-tokens (spacing, colors,
        typography) and React components.
      </Text>
      <hr />
      <List>
        <EquallySpaced>
          <TypographyDemo />
          <ColorsDemo isDm={isDm} />
        </EquallySpaced>
        <SpacingDemo />
        <hr />
        <Header order={1}>Components</Header>
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
  margin: var(--s-10) auto;
  padding: 0 var(--s-05);
  gap: var(--s-01);
  max-width: 1000px;
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
