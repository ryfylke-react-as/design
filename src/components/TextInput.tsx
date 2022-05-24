import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";

type TextInputKind = "regular" | "ghost";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  kind?: TextInputKind;
}

export function TextInput({
  kind = "regular",
  children,
  ...rest
}: TextInputProps) {
  return (
    <StyledInput kind={kind} type="text" {...rest}>
      {children}
    </StyledInput>
  );
}

type StyledProps = {
  kind: TextInputKind;
};

const StyledInput = styled.input<StyledProps>`
  border: none;
  padding: var(--s-03);
  background: var(--c-ui-01);
  border-radius: var(--roundness);
  outline: 1px solid transparent;
  outline-offset: -1px;
  transition: outline 0.1s ease-in;
  height: 36px;
  &:hover {
    outline: 1px solid var(--c-ui-02);
  }
  ${applyFocusStyles}
  ${applyFontKind("label")}
`;
