import styled from "styled-components";
import { GlobalStyles } from "./styled-utils";
import { ButtonDemo } from "./demos/ButtonDemo";
import { TextInputDemo } from "./demos/TextInputDemo";
import { SelectDemo } from "./demos/SelectDemo";
import { DemoContainer } from "./demo.styles";
import { CheckboxDemo } from "./demos/CheckboxDemo";
import { SwitchDemo } from "./demos/SwitchDemo";
import { Shell } from "./components/Shell";
import { Switch } from "./components/Switch";
import { useDM } from "./hooks/useDM";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { TypographyPage } from "./pages/typography";
import { SpacingPage } from "./pages/spacing";
import { ColorPage } from "./pages/color";
import { LayoutPage } from "./pages/layout";

function App() {
  const { isDM, setDM } = useDM();

  return (
    <Shell
      defaultOpen
      sideMenu={{
        navigation: [
          {
            text: "Introduction",
            to: "/",
            id: "home",
          },
          {
            text: "Guidelines",
            children: [
              {
                text: "Typography",
                to: "/typography",
                id: "typography",
              },
              {
                text: "Spacing",
                to: "/spacing",
                id: "spacing",
              },
              {
                text: "Color",
                to: "/color",
                id: "color",
              },
              {
                text: "Layout",
                to: "/layout",
                id: "layout",
              },
            ],
            to: "#",
            id: "guidelines",
          },
          {
            text: "Components",
            children: [
              {
                text: "Button",
                to: "/components/button",
                id: "button",
              },
              {
                text: "Text Input",
                to: "/components/textinput",
                id: "textinput",
              },
              {
                text: "Select",
                to: "/components/select",
                id: "select",
              },
              {
                text: "Checkbox",
                to: "/components/checkbox",
                id: "checkbox",
              },
              {
                text: "Switch",
                to: "/components/switch",
                id: "switch",
              },
            ],
            to: "#",
            id: "components",
          },
        ],
      }}
      topMenu={{
        title: "Ryfrea Components",
        actions: [
          <Switch
            checked={isDM}
            onChange={setDM}
            label="Darkmode"
          />,
        ],
      }}
    >
      <Container>
        <List>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route
              path="/typography"
              element={<TypographyPage />}
            />
            <Route path="/spacing" element={<SpacingPage />} />
            <Route path="/color" element={<ColorPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route
              path="/components/button"
              element={<ButtonDemo />}
            />
            <Route
              path="/components/textinput"
              element={<TextInputDemo />}
            />
            <Route
              path="/components/select"
              element={<SelectDemo />}
            />
            <Route
              path="/components/checkbox"
              element={<CheckboxDemo />}
            />
            <Route
              path="/components/switch"
              element={<SwitchDemo />}
            />
          </Routes>
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
  h1 {
    margin-bottom: var(--s-05);
  }
`;

export default App;
