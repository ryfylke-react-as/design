import { ElementType, InputHTMLAttributes } from "react";
import styled, { StyledComponent } from "styled-components";
import { applyFontKind } from "../styled-utils";
import { FontKind } from "../types";

type TextKind = Exclude<FontKind, "h1" | "h2" | "h3" | "sub">;

interface TextProps
  extends InputHTMLAttributes<HTMLParagraphElement> {
  kind: TextKind;
  as?: ElementType;
}

export const Paragraph = styled.h1`
  ${applyFontKind("p")}
`;

export const Label = styled.h2`
  ${applyFontKind("label")}
`;

export const Code = styled.h3`
  ${applyFontKind("code")}
`;

export const Button = styled.h4`
  ${applyFontKind("button")}
`;

const KIND_TO_ELEMENT: Record<
  TextKind,
  StyledComponent<any, any>
> = {
  p: Paragraph,
  label: Label,
  code: Code,
  button: Button,
};

export function Text({ kind, ...props }: TextProps) {
  const Element = KIND_TO_ELEMENT[kind];
  return <Element {...props}>{props?.children ?? null}</Element>;
}
