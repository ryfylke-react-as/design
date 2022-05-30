import { Header } from "../components/Header";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { buttonKinds, buttonSizes } from "../demo.constants";
import { DemoContainer, HorizontalDivide } from "../demo.styles";

export function ButtonDemo() {
  return (
    <DemoContainer>
      <Header order={2}>Button</Header>
      <Text as="p" kind="p">
        You can set the roundness of buttons and other components
        using the slider at the top right corner of the page.
      </Text>
      {/* // @ts-ignore */}
      <hr />
      <Header order={4}>Kinds:</Header>
      <HorizontalDivide style={{ background: "var(--c-ui-01)" }}>
        {buttonKinds.map((item) => (
          <Button
            kind={item.kind}
            icon={item?.icon}
            onClick={item.onClick}
          >
            {item.text}
          </Button>
        ))}
      </HorizontalDivide>
      <Header order={4}>Sizes:</Header>
      <HorizontalDivide style={{ background: "var(--c-ui-01)" }}>
        {buttonSizes.map((item) => (
          <Button size={item.size}>{item.text}</Button>
        ))}
      </HorizontalDivide>
      <Text as="p" kind="label">
        <strong>NOTE</strong>: Padding is equal on all sizes, but
        height is different and inner content is always
        vertically centered.
      </Text>
    </DemoContainer>
  );
}
