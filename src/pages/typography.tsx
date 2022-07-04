import React from "react";
import { NavigateButton } from "../components/demo/NavigateButton";
import { Header } from "../components/Header";
import { Text } from "../components/Text";
import { TypographyDemo } from "../demos/TypographyDemo";

export function TypographyPage() {
  return (
    <>
      <Header order={1} as="h2">
        Typography
      </Header>
      <div>
        <Text kind="body">
          We use the "Ubuntu" and "Ubuntu Mono" font families.{" "}
          <Text kind="code" as="span">
            text-01
          </Text>{" "}
          should be reserved for headers and callouts,{" "}
          <Text kind="code" as="span">
            text-02
          </Text>{" "}
          should be used mostly on body text. This is to prevent
          eye straining, and direct focus. Base font size is{" "}
          <Text kind="code" as="span">
            16px
          </Text>
        </Text>
      </div>
      <TypographyDemo />
      <NavigateButton to="/spacing">Spacing</NavigateButton>
    </>
  );
}
