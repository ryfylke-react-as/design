import { NavigateButton } from "../components/demo/NavigateButton";
import { Header } from "../components/Header";
import { Text } from "../components/Text";
import { ColorsDemo } from "../demos/ColorsDemo";
import { useDM } from "../hooks/useDM";

export function ColorPage() {
  const { isDM } = useDM();
  return (
    <>
      <Header order={1} as="h2">
        Color
      </Header>
      <div>
        <Text kind="body">Work in progress.</Text>
      </div>
      <ColorsDemo isDm={isDM} />
      <NavigateButton to="/layout">Layout</NavigateButton>
    </>
  );
}
