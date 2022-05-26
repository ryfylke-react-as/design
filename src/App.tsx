import { Save, SaveAlt } from "@material-ui/icons";
import {
  CSSProperties,
  ElementType,
  ReactNode,
  useState,
} from "react";
import styled from "styled-components";
import { Button } from "./components/Button";
import { FormGroup } from "./components/FormGroup";
import { Header } from "./components/Header";
import { Text } from "./components/Text";
import { TextInput } from "./components/TextInput";
import { Typography } from "./components/Typography";
import { ButtonKind, ButtonSize, FontKind } from "./types";

function App() {
  const [roundness, setRoundness] = useState(3);
  const [emailVal, setEmailVal] = useState("");
  const emailIsValid =
    emailVal === "" ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailVal);

  const typography: Array<{
    as: ElementType;
    kind: FontKind;
    text: string;
  }> = [
    { as: "h1", kind: "h1", text: "Header 1" },
    { as: "h2", kind: "h2", text: "Header 2" },
    { as: "h3", kind: "h3", text: "Header 3" },
    { as: "strong", kind: "sub", text: "Subtitle" },
    { as: "p", kind: "p", text: "Paragraph" },
    { as: "p", kind: "label", text: "Label" },
    { as: "p", kind: "code", text: "CODE { }" },
    { as: "p", kind: "button", text: "Button" },
  ];

  const buttonKinds: Array<{
    kind: ButtonKind;
    text: string;
    icon?: ReactNode;
  }> = [
    {
      kind: "primary",
      text: "Primary",
    },
    {
      kind: "danger",
      text: "Danger",
    },
    {
      kind: "regular",
      text: "Regular",
    },
    {
      kind: "ghost",
      text: "Ghost",
    },
    {
      kind: "ghost",
      text: "Ghost (with icon)",
      icon: <Save />,
    },
    {
      kind: "primary",
      text: "",
      icon: <SaveAlt />,
    },
  ];

  const buttonSizes: Array<{
    size: ButtonSize;
    text: string;
  }> = [
    {
      size: "sm",
      text: "Small",
    },
    {
      size: "field",
      text: "Field",
    },
    {
      size: "md",
      text: "Medium",
    },
    {
      size: "lg",
      text: "Large",
    },
  ];

  return (
    <Container
      style={
        { "--roundness": `${roundness}px` } as CSSProperties
      }
    >
      <FormGroup
        label="Roundness"
        style={{
          position: "fixed",
          top: "var(--s-05)",
          right: "var(--s-05)",
        }}
      >
        <input
          type="range"
          value={roundness}
          min={0}
          max={20}
          onChange={(e) =>
            setRoundness(parseFloat(e.target.value))
          }
        />
      </FormGroup>
      <Header order={1} id="top">
        Ryfyre components
      </Header>
      <Header order={2} id="typography">
        Button
      </Header>
      <Text as="div" kind="p">
        <p>
          We use the following font families: "Ubuntu", "Ubuntu
          Mono" (code). Base font size is 16px.
        </p>
        <p>
          Click any of the texts in the following box to edit
          them:
        </p>
      </Text>
      <VerticalDivide
        style={{
          background: "var(--c-ui-01)",
          marginTop: "var(--s-05)",
        }}
      >
        {typography.map((item) => (
          <Typography
            as={item.as}
            kind={item.kind}
            props={{ contentEditable: true }}
          >
            {item.text}
          </Typography>
        ))}
      </VerticalDivide>
      <hr />
      <Header order={2}>Button</Header>
      <Text as="p" kind="p">
        You can set the roundness of buttons and other components
        using the slider at the top right corner of the page.
      </Text>
      {/* // @ts-ignore */}
      <Header order={4}>Kinds:</Header>
      <HorizontalDivide style={{ background: "var(--c-ui-01)" }}>
        {buttonKinds.map((item) => (
          <Button kind={item.kind} icon={item?.icon}>
            {item.text}
          </Button>
        ))}
      </HorizontalDivide>
      <Header order={4}>Sizes:</Header>
      <HorizontalDivide style={{ background: "var(--c-ui-01)" }}>
        {buttonSizes.map((item) => (
          <Button size={item.size}>{item.text}</Button>
        ))}
      </HorizontalDivide>
      <Text as="p" kind="label">
        <strong>NOTE</strong>: Padding is equal on all sizes, but
        height is different and inner content is always
        vertically centered.
      </Text>
      <hr />
      <Header order={2} style={{ margin: "var(--s-05) 0" }}>
        TextInput
      </Header>
      <VerticalDivide style={{ gap: "var(--s-06)" }}>
        <TextInput placeholder="John Smith" label="Text input" />
        <TextInput
          placeholder="john-smith@gmail.com"
          label="Email (with validation)"
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          invalid={
            emailIsValid ? "" : "Please enter valid email"
          }
        />
        <TextInput
          placeholder="*************"
          label="Password"
          type="password"
        />
      </VerticalDivide>
    </Container>
  );
}

const HorizontalDivide = styled.div`
  display: flex;
  gap: var(--s-03);
  padding: var(--s-05);
  flex-wrap: wrap;
`;

const VerticalDivide = styled(HorizontalDivide)`
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: var(--s-10) auto;
  padding: 0 var(--s-05);
  gap: var(--s-01);
  max-width: 1000px;
  > h2 {
    margin: 1rem 0;
  }
  > h3,
  h4 {
    margin: 1rem 0;
  }
  > h2 + h3,
  h2 + h4 {
    margin-top: 0;
  }
  hr {
    height: var(--s-05);
    border: none;
    background: transparent;
    width: 100%;
  }
  p {
    color: #444;
  }
`;

export default App;
