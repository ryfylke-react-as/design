import { useState } from "react";
import { ComponentBox, DemoContainer } from "../demo.styles";
import { Text } from "../components/Text";
import { Header } from "../components/Header";
import { TextInput } from "../components/TextInput";

export function TextInputDemo() {
  const [emailVal, setEmailVal] = useState("");
  const emailIsValid =
    emailVal === "" ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailVal);
  return (
    <DemoContainer>
      <Header order={1}>TextInput</Header>
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
        <TextInput
          placeholder="John Smith"
          label="Text input (not inverted)"
        />
      </ComponentBox>
      <ComponentBox
        style={{
          flexDirection: "column",
          gap: "var(--s-06)",
        }}
      >
        <TextInput
          inverted
          placeholder="john-smith@gmail.com"
          label="Email (with validation)"
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          invalid={
            emailIsValid
              ? ""
              : "Please enter a valid email address"
          }
        />
        <TextInput
          inverted
          placeholder="*************"
          label="Password"
          type="password"
        />
      </ComponentBox>
    </DemoContainer>
  );
}
