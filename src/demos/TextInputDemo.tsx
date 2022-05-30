import { useState } from "react";
import { DemoContainer, VerticalDivide } from "../demo.styles";
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
      <Header order={2}>TextInput</Header>
      <Text
        as="p"
        kind="p"
        style={{ marginBottom: "var(--s-03)" }}
      >
        Use "inverted" version when on top of {"`ui-01`"}
      </Text>
      <VerticalDivide
        style={{
          gap: "var(--s-06)",
          background: "var(--c-ui-01)",
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
      </VerticalDivide>
      <hr />
      <TextInput
        placeholder="John Smith"
        label="Text input (not inverted)"
      />
    </DemoContainer>
  );
}
