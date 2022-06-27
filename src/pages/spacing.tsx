import { Header } from "../components/Header";
import { Text } from "../components/Text";
import { SpacingDemo } from "../demos/SpacingDemo";

export function SpacingPage() {
  return (
    <>
      <Header order={1} as="h2">
        Spacing
      </Header>{" "}
      <div>
        <Text kind="p">
          Used for margins & paddings. You should try to only
          ever use these values when it comes to spacing in your
          application.
        </Text>
      </div>
      <SpacingDemo />
    </>
  );
}
