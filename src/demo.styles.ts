import styled from "styled-components";
import { applyFontKind } from "./styled-utils";

export const ComponentBox = styled.div`
  display: flex;
  gap: var(--s-03);
  padding: var(--s-05);
  flex-wrap: wrap;
  background: var(--c-ui-01);
  margin-bottom: var(--s-05);
  border: 1px solid var(--c-ui-02);
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  > div {
    padding: var(--s-04);
    display: grid;
    place-content: center;
    ${applyFontKind("code")}
  }
`;

export const DemoContainer = styled.div`
  h2,
  h3,
  h4 {
    margin: 0 0 var(--s-04);
  }
  margin-bottom: var(--s-05);
`;
