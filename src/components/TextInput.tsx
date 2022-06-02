import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { LabelGroup } from "./LabelGroup";

type TextInputKind = "regular" | "ghost";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  kind?: TextInputKind;
  label?: string;
  invalid?: string;
  type?: "password" | "email" | "search" | "url" | "text";
  inverted?: boolean;
}

export function TextInput({
  kind = "regular",
  type = "text",
  children,
  label,
  invalid,
  style,
  className,
  inverted,
  ...rest
}: TextInputProps) {
  return (
    <LabelGroup
      label={label}
      invalid={invalid}
      style={style}
      className={className}
    >
      <StyledInput
        kind={kind}
        invalid={invalid ? true : false}
        type={type}
        inverted={inverted}
        {...rest}
      >
        {children}
      </StyledInput>
    </LabelGroup>
  );
}

type StyledProps = {
  kind: TextInputKind;
  invalid: boolean;
  inverted?: boolean;
};

const StyledInput = styled.input<StyledProps>`
  border: none;
  padding: var(--s-03);
  background: ${(props) =>
    props.inverted ? "var(--c-ui-bg)" : "var(--c-ui-01)"};
  border-radius: var(--roundness-01);
  outline: 1px solid transparent;
  outline-offset: -1px;
  transition: outline 0.1s var(--ease-01);
  height: 36px;
  width: 200px;
  &:hover {
    outline: 1px solid var(--c-ui-02);
  }
  ${(props) =>
    props.invalid &&
    `
      outline: 1px solid var(--c-danger);
    &:hover {
        outline: 1px solid var(--c-danger);
    }
  `}
  &::placeholder {
    color: var(--c-text-03);
  }
  ${applyFocusStyles}
  ${applyFontKind("p")}
`;
