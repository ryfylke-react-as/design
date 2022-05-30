import styled from "styled-components";
import { applyFontKind } from "./styled-utils";

export const HorizontalDivide = styled.div`
  display: flex;
  gap: var(--s-03);
  padding: var(--s-05);
  flex-wrap: wrap;
`;

export const VerticalDivide = styled(HorizontalDivide)`
  flex-direction: column;
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  > div {
    padding: var(--s-04);
    display: grid;
    place-content: center;
    ${applyFontKind("code")}
  }
`;

export const DemoContainer = styled.div``;
