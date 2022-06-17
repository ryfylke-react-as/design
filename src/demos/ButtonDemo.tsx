import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { buttonKinds, buttonSizes } from "../demo.constants";
import { DemoContainer, ComponentBox } from "../demo.styles";

export function ButtonDemo() {
  return (
    <DemoContainer>
      <Header order={2}>Button</Header>
      <Header order={4}>Kinds:</Header>
      <ComponentBox style={{}}>
        {buttonKinds.map((item) => (
          <Button
            kind={item.kind}
            icon={item?.icon}
            onClick={item.onClick}
            ripple={item?.ripple}
          >
            {item.text}
          </Button>
        ))}
      </ComponentBox>
      <Header order={4}>Sizes:</Header>
      <ComponentBox style={{ background: "var(--c-ui-01)" }}>
        {buttonSizes.map((item) => (
          <Button size={item.size}>{item.text}</Button>
        ))}
      </ComponentBox>
    </DemoContainer>
  );
}
