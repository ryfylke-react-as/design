import { NavigateButton } from "../components/demo/NavigateButton";
import { Header } from "../components/Header";
import { Text } from "../components/Text";

export function IndexPage() {
  return (
    <>
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
      <NavigateButton to="/typography">
        Typography
      </NavigateButton>
    </>
  );
}
