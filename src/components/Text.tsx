import React, { ElementType, InputHTMLAttributes } from "react";
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

export const ParagraphText = styled.span`
  ${applyFontKind("body")}
`;

export const LabelText = styled.span`
  ${applyFontKind("label")}
`;

export const CodeText = styled.span`
  ${applyFontKind("code")}
`;

export const ButtonText = styled.span`
  ${applyFontKind("button")}
`;

export const SmallText = styled.span`
  ${applyFontKind("small")}
`;

const KIND_TO_ELEMENT: Record<
  TextKind,
  StyledComponent<any, any>
> = {
  body: ParagraphText,
  label: LabelText,
  small: SmallText,
  code: CodeText,
  button: ButtonText,
};

export function Text({ kind = "body", ...props }: TextProps) {
  const Element = KIND_TO_ELEMENT[kind];
  return <Element {...props}>{props?.children ?? null}</Element>;
}
