import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";

type ButtonKind = "regular" | "primary" | "danger" | "ghost";

type ButtonSize = "sm" | "md" | "lg" | "field";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
}

export function Button({
  kind = "regular",
  size = "md",
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton kind={kind} size={size} {...rest}>
      {children}
    </StyledButton>
  );
}

type StyledProps = {
  kind: ButtonKind;
  size: ButtonSize;
};

const KIND_TO_BG: Record<ButtonKind, string> = {
  regular: "#f4f4f4",
  danger: "#A81B3D",
  ghost: "transparent",
  primary: "#1BA886",
};

const KIND_TO_CONTRAST: Record<ButtonKind, string> = {
  regular: "#000",
  danger: "#fff",
  ghost: "#000",
  primary: "#fff",
};

const SIZE_TO_HEIGHT: Record<ButtonSize, string> = {
  md: "auto",
  lg: "2rem",
  field: "36px",
  sm: "1rem",
};

const StyledButton = styled.button<StyledProps>`
  border: none;
  margin: 0;
  padding: var(--s-03) var(--s-05);
  border-radius: var(--roundness);
  background: ${(props) => KIND_TO_BG[props.kind]};
  color: ${(props) => KIND_TO_CONTRAST[props.kind]};
  display: flex;
  align-items: center;
  height: ${(props) => SIZE_TO_HEIGHT[props.size]};
  &:hover {
    transition: background 0.1s ease-in-out;
    background: var(--c-ui-04);
    color: var(--c-ui-01);
  }
  cursor: pointer;
  ${applyFocusStyles}
  ${applyFontKind("button")}
`;
