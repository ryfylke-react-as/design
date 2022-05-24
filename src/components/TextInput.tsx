import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { FormGroup } from "./FormGroup";

type TextInputKind = "regular" | "ghost";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  kind?: TextInputKind;
  label?: string;
}

export function TextInput({
  kind = "regular",
  children,
  label,
  ...rest
}: TextInputProps) {
  return (
    <FormGroup label={label}>
      <StyledInput kind={kind} type="text" {...rest}>
        {children}
      </StyledInput>
    </FormGroup>
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
  width: 200px;
  &:hover {
    outline: 1px solid var(--c-ui-02);
  }
  &::placeholder {
    color: var(--c-ui-03);
  }
  ${applyFocusStyles}
  ${applyFontKind("p")}
`;
