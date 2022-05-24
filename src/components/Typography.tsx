import { ElementType, ReactNode } from "react";
import styled from "styled-components";
import { applyFontKind } from "../styled-utils";
import { FontKind } from "../types";

type TypographyProps = {
  as?: ElementType;
  kind: FontKind;
  props?: any;
  children?: ReactNode;
};

export function Typography({
  as: Tag = "div",
  kind,
  children,
  props,
}: TypographyProps) {
  const StyledComponent = styled(Tag)`
    ${applyFontKind(kind)}
  `;

  return (
    <StyledComponent {...props}>{children}</StyledComponent>
  );
}
