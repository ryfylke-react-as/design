import {
  ElementType,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import styled, { StyledComponent } from "styled-components";
import { applyFontKind } from "../styled-utils";

/** 1,2,3,4 H1-H3, Subtitle */
type HeaderOrder = 1 | 2 | 3 | 4;

interface HeaderProps
  extends InputHTMLAttributes<HTMLHeadingElement> {
  order?: HeaderOrder;
  as?: ElementType;
  children?: ReactNode;
}

export const H1 = styled.h1`
  ${applyFontKind("h1")}
`;

export const H2 = styled.h2`
  ${applyFontKind("h2")}
`;

export const H3 = styled.h3`
  ${applyFontKind("h3")}
`;

export const Subtitle = styled.h4`
  ${applyFontKind("subtitle")}
`;

const ORDER_TO_ELEMENT: Record<
  HeaderOrder,
  StyledComponent<any, any>
> = {
  1: H1,
  2: H2,
  3: H3,
  4: Subtitle,
};

export function Header({
  order = 1,
  children,
  ...props
}: HeaderProps) {
  const Element: any = ORDER_TO_ELEMENT[order];
  return <Element {...props}>{children ?? null}</Element>;
}
