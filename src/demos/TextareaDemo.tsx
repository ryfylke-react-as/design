import { useState } from "react";
import { ComponentBox, DemoContainer } from "../demo.styles";
import { Text } from "../components/Text";
import { Header } from "../components/Header";
import { TextArea } from "../components/TextArea";

export function TextareaDemo() {
  const [value, setValue] = useState("");
  const isValid = value.length === 0 || value.length > 20;
  return (
    <DemoContainer>
      <Header order={1}>Textarea</Header>
      <Text
        as="p"
        kind="p"
        style={{ marginBottom: "var(--s-03)" }}
      >
        Use "inverted" version when on top of {"`ui-01`"}
      </Text>
      <ComponentBox
        style={{
          flexDirection: "column",
          gap: "var(--s-06)",
          background: "var(--c-ui-bg)",
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <TextArea
          label="Label"
          placeholder="Placeholder"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          invalid={!isValid ? "20 characters minimum" : ""}
          style={{
            width: 500,
          }}
        >
          {value}
        </TextArea>
        <TextArea
          label="Label"
          placeholder="Disabled, resizable = false"
          style={{
            width: 500,
          }}
          disabled
          resizable={false}
        />
      </ComponentBox>
      <ComponentBox>
        <TextArea
          label="Label"
          placeholder="Inverted"
          style={{
            width: 500,
          }}
          inverted
        />
      </ComponentBox>
    </DemoContainer>
  );
}
