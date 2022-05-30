import styled from "styled-components";
import { Typography } from "../components/Typography";
import { typographyKinds } from "../demo.constants";
import { ComponentBox, DemoContainer } from "../demo.styles";

export function TypographyDemo() {
  return (
    <DemoContainer>
      <StyledComponentBox>
        {typographyKinds.map((item) => (
          <Typography
            as={item.as}
            kind={item.kind}
            props={{ contentEditable: true }}
          >
            {item.text}
          </Typography>
        ))}
      </StyledComponentBox>
    </DemoContainer>
  );
}

const StyledComponentBox = styled(ComponentBox)`
  flex-direction: column;
  h1,
  h2,
  h3,
  h4 {
    margin: 0 !important;
  }
`;
