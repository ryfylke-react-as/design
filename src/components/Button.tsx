import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { ButtonKind, ButtonSize } from "../types";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
  /** Made for MUI-icons */
  icon?: ReactNode;
}

export function Button({
  kind = "regular",
  size = "md",
  children,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      kind={kind}
      size={size}
      type={rest?.type ?? "button"}
      {...rest}
    >
      {icon ?? ""}
      {children}
    </StyledButton>
  );
}

type StyledProps = {
  kind: ButtonKind;
  size: ButtonSize;
};

const KIND_TO_BG: Record<ButtonKind, string> = {
  regular: "var(--c-ui-03)",
  danger: "var(--c-danger)",
  ghost: "transparent",
  primary: "var(--c-primary)",
};

const KIND_TO_CONTRAST: Record<ButtonKind, string> = {
  regular: "#fff",
  danger: "#fff",
  ghost: "#000",
  primary: "#fff",
};

const SIZE_TO_HEIGHT: Record<ButtonSize, string> = {
  md: "42px",
  lg: "var(--s-09)",
  field: "36px",
  sm: "2rem",
};

const SIZE_TO_GAP: Record<ButtonSize, string> = {
  md: "var(--s-03)",
  lg: "var(--s-03)",
  field: "var(--s-03)",
  sm: "var(--s-02)",
};

const SIZE_TO_ICON_SIZE: Record<ButtonSize, string> = {
  md: "0.75em",
  lg: "0.75em",
  field: "0.75em",
  sm: "0.55em",
};

export const StyledButton = styled.button<StyledProps>`
  border: none;
  margin: 0;
  padding: var(--s-03) var(--s-05);
  border-radius: var(--roundness);
  background: ${(props) => KIND_TO_BG[props.kind]};
  color: ${(props) => KIND_TO_CONTRAST[props.kind]};
  display: flex;
  align-items: center;
  height: ${(props) => SIZE_TO_HEIGHT[props.size]};
  gap: ${(props) => SIZE_TO_GAP[props.size]};
  &:hover {
    transition: background 0.1s ease-in-out;
    background: var(--c-ui-04);
    color: var(--c-ui-01);
  }
  &:active {
    background: #000;
    color: var(--c-ui-01);
  }
  > svg {
    --size: ${(props) => SIZE_TO_ICON_SIZE[props.size]};
    width: var(--size);
    height: var(--size);
  }
  cursor: pointer;
  ${applyFocusStyles}
  ${applyFontKind("button")}
`;
