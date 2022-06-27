import { Add, AlarmAddRounded } from "@material-ui/icons";
import { Header } from "../components/Header";
import { Switch } from "../components/Switch";
import { DemoContainer, ComponentBox } from "../demo.styles";

export function SwitchDemo() {
  return (
    <DemoContainer>
      <Header order={1}>Switch</Header>
      <ComponentBox
        style={{
          background: "var(--c-ui-bg)",
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <Switch label="Switch label" />
      </ComponentBox>
      <Header order={4}>With icons</Header>
      <ComponentBox
        style={{
          background: "var(--c-ui-bg)",
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <Switch
          label="Switch label"
          checkedIcon={<Add />}
          uncheckedIcon={<AlarmAddRounded />}
        />
      </ComponentBox>
    </DemoContainer>
  );
}
