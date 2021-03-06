import { NavigateButton } from "../components/demo/NavigateButton";
import { Header } from "../components/Header";
import { Text } from "../components/Text";
import { LayoutDemo } from "../demos/LayoutDemo";

export function LayoutPage() {
  return (
    <>
      <Header order={1} as="h2">
        Layout
      </Header>
      <div>
        <Text kind="body">
          Use a combination of our spacing tokens and ui-colors
          to achieve hierarchy in nested layouts.
        </Text>
      </div>
      <LayoutDemo />
      <NavigateButton to="/components/button">
        Components
      </NavigateButton>
    </>
  );
}
