import { Checkbox } from "../components/Checkbox";
import { Header } from "../components/Header";
import { DemoContainer, ComponentBox } from "../demo.styles";

export function CheckboxDemo() {
  return (
    <DemoContainer>
      <Header order={2}>Checkbox</Header>
      <ComponentBox
        style={{
          background: "var(--c-ui-bg)",
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <Checkbox label="Checkbox label" />
      </ComponentBox>
    </DemoContainer>
  );
}
