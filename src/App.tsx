import styled, { keyframes } from "styled-components";
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
import { Route, Routes, useLocation } from "react-router-dom";
import { IndexPage } from "./pages";
import { TypographyPage } from "./pages/typography";
import { SpacingPage } from "./pages/spacing";
import { ColorPage } from "./pages/color";
import { LayoutPage } from "./pages/layout";
import { WbSunny, NightsStay } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function App() {
  const { isDM, setDM } = useDM();
  const isTooSmall = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [expandedMenuItems, setExpandedMenuItems] = useState<
    string[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("components") &&
      !expandedMenuItems.includes("components")
    ) {
      setExpandedMenuItems([...expandedMenuItems, "components"]);
      if (!sideMenuOpen) {
        setSideMenuOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (isTooSmall && sideMenuOpen) {
      setSideMenuOpen(false);
    }
    if (!isTooSmall && !sideMenuOpen) {
      setSideMenuOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTooSmall]);

  return (
    <Shell
      defaultOpen
      sideMenuOpen={sideMenuOpen}
      onSideMenuOpenChange={setSideMenuOpen}
      onExpandedMenuItemsChange={setExpandedMenuItems}
      expandedMenuItems={expandedMenuItems}
      sideMenu={{
        floating: isTooSmall,
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
        title: <a href="/">Ryfrea Components</a>,
        actions: [
          <Switch
            checked={isDM}
            onChange={setDM}
            label="Darkmode"
            checkedIcon={<NightsStay />}
            uncheckedIcon={<WbSunny />}
          />,
        ],
      }}
    >
      <Container key={location.pathname}>
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

const containerAnim = keyframes`
  from {
    opacity:0;
    transform:translateX(-5px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: ${containerAnim} 0.2s var(--ease-01);
  padding: var(--s-05);
  gap: var(--s-01);
  max-width: 1100px;
  color: var(--c-text-02);
  margin: 0 auto;
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
