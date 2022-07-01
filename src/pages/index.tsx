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
      <Header order={4}>Variant</Header>
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
