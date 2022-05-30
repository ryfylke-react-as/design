import { Header } from "../components/Header";
import { Typography } from "../components/Typography";
import { typographyKinds } from "../demo.constants";
import { DemoContainer, VerticalDivide } from "../demo.styles";

export function TypographyDemo() {
  return (
    <DemoContainer>
      <Header order={2} id="typography">
        Typography
      </Header>
      <VerticalDivide
        style={{
          background: "var(--c-ui-01)",
          marginTop: "var(--s-05)",
        }}
      >
        {typographyKinds.map((item) => (
          <Typography
            as={item.as}
            kind={item.kind}
            props={{ contentEditable: true }}
          >
            {item.text}
          </Typography>
        ))}
      </VerticalDivide>
    </DemoContainer>
  );
}
