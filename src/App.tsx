import { useEffect, useState } from "react";
import styled from "styled-components";
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
import { CheckboxDemo } from "./demos/CheckboxDemo";
import { SwitchDemo } from "./demos/SwitchDemo";
import { LayoutDemo } from "./demos/LayoutDemo";
import { Shell } from "./components/Shell";
import { Switch } from "./components/Switch";

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
    <Shell
      sideMenu={{ navigation: [] }}
      topMenu={{
        title: "Ryfrea Components",
        actions: [
          <Switch
            checked={isDm}
            onChange={setDM}
            label="Darkmode"
          />,
        ],
      }}
    >
      <Container>
        <GlobalStyles />
        <ToastProvider location="topright" zIndex={500} />
        <Header order={1} id="top">
          <span style={{ color: "var(--c-focus-01)" }}>
            Ryfrea
          </span>
          Components
        </Header>
        <Text>
          A collection of design-tokens (spacing, colors,
          typography) and React components.
        </Text>
        <hr />
        <List>
          <Header order={1} as="h2">
            Typography
          </Header>
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
              prevent eye straining, and direct focus. Base font
              size is{" "}
              <Text kind="code" as="span">
                16px
              </Text>
            </Text>
          </div>
          <TypographyDemo />
          <hr />
          <Header order={1} as="h2">
            Spacing
          </Header>{" "}
          <div>
            <Text kind="p">
              Used for margins & paddings. You should try to only
              ever use these values when it comes to spacing in
              your application.
            </Text>
          </div>
          <SpacingDemo />
          <hr />
          <Header order={1} as="h2">
            Color
          </Header>
          <div>
            <Text kind="p">Work in progress.</Text>
          </div>
          <ColorsDemo isDm={isDm} />
          <hr />
          <Header order={1} as="h2">
            Layout
          </Header>
          <div>
            <Text kind="p">
              Use a combination of our spacing tokens and
              ui-colors to achieve hierarchy in nested layouts.
            </Text>
          </div>
          <LayoutDemo />
          <hr />
          <Header order={1} as="h2">
            Components
          </Header>
          <div>
            <Text kind="p">
              We offer an accessible component library for React
              - that uses the Ryfrea design language under the
              hood.
            </Text>
          </div>
          <ButtonDemo />
          <TextInputDemo />
          <SelectDemo />
          <CheckboxDemo />
          <SwitchDemo />
        </List>
      </Container>
    </Shell>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  padding: var(--s-08) var(--s-05);
  gap: var(--s-01);
  max-width: 900px;
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

export default App;
