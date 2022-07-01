import { ElementType, InputHTMLAttributes } from "react";
import styled, { StyledComponent } from "styled-components";
import { applyFontKind } from "../styled-utils";
import { FontKind } from "../types";

type TextKind = Exclude<
  FontKind,
  "h1" | "h2" | "h3" | "subtitle"
>;

interface TextProps
  extends InputHTMLAttributes<HTMLParagraphElement> {
  kind?: TextKind;
  as?: ElementType;
}

export const Paragraph = styled.span`
  ${applyFontKind("body")}
`;

export const Label = styled.span`
  ${applyFontKind("label")}
`;

export const Code = styled.span`
  ${applyFontKind("code")}
`;

export const Button = styled.span`
  ${applyFontKind("button")}
`;

export const Small = styled.span`
  ${applyFontKind("small")}
`;

const KIND_TO_ELEMENT: Record<
  TextKind,
  StyledComponent<any, any>
> = {
  body: Paragraph,
  label: Label,
  small: Small,
  code: Code,
  button: Button,
};

export function Text({ kind = "body", ...props }: TextProps) {
  const Element = KIND_TO_ELEMENT[kind];
  return <Element {...props}>{props?.children ?? null}</Element>;
}
