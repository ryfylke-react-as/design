import { CodePreview } from "../components/demo/CodePreview";
import { NavigateButton } from "../components/demo/NavigateButton";
import { Header } from "../components/Header";
import { Switch } from "../components/Switch";
import { Text } from "../components/Text";

type Props = {
  isRound: boolean;
  setRound: (val: boolean) => void;
};

export function IndexPage({ isRound, setRound }: Props) {
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
      <Header order={2}>Installation</Header>
      <CodePreview code={`yarn add @ryfylke-react/ui`} />
      or...
      <CodePreview code={`npm i @ryfylke-react/ui`} />
      <Header order={2}>Variants</Header>
      <Text>
        Sharp will set the variable <code>roundness-01</code> to{" "}
        <code>0px</code>.
      </Text>
      <Switch
        label="Playful"
        checked={isRound}
        onChange={() => setRound(true)}
      />
      <Switch
        label="Sharp"
        checked={!isRound}
        onChange={() => setRound(false)}
      />
      <NavigateButton to="/typography">
        Typography
      </NavigateButton>
    </>
  );
}
