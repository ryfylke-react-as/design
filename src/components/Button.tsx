import { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
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
      className={`ryfre--button ${rest?.className ?? ""}`}
    >
      <span>
        {icon ?? ""}
        {children}
      </span>
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
  regular: "var(--c-text-04)",
  danger: "var(--c-text-04)",
  ghost: "var(--c-text-01)",
  primary: "var(--c-text-04)",
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

const iconAnim = keyframes`
  from {
    transform:scale(0.5) rotate(20deg);
    opacity:0;
  }
`;

export const StyledButton = styled.button<StyledProps>`
  ${applyFontKind("button")}
  border: none;
  margin: 0;
  padding: var(--s-03) var(--s-05);
  border-radius: var(--roundness-01);
  background: ${(props) => KIND_TO_BG[props.kind]};
  color: ${(props) => KIND_TO_CONTRAST[props.kind]};
  display: flex;
  align-items: center;
  height: ${(props) => SIZE_TO_HEIGHT[props.size]};
  box-shadow: 0px 1px 0px 0px var(--c-ui-04);
  ${(props) =>
    props.kind === "ghost" &&
    `
    box-shadow:none;
  `}
  ${applyFocusStyles}
  &:focus {
    box-shadow: none !important;
  }
  &:hover {
    transition: background 0.1s var(--ease-01);
    background: var(--c-ui-04);
    color: var(--c-text-04);
    box-shadow: 0px 1px 0px 0px var(--c-ui-05);
    ${(props) =>
      props.kind === "ghost" &&
      `
    box-shadow:none;
  `}
  }
  > span {
    transition: transform 0.1s var(--ease-01);
    display: flex;
    align-items: center;
    gap: ${(props) => SIZE_TO_GAP[props.size]};
    > svg {
      --size: ${(props) => SIZE_TO_ICON_SIZE[props.size]};
      width: var(--size);
      height: var(--size);
      animation: ${iconAnim} 0.3s var(--ease-01);
    }
  }
  &:active {
    background: #000;
    color: var(--c-text-04);
    transition: background 0.2s var(--ease-01);
    > span {
      transform: translateY(1px);
    }
  }
  cursor: pointer;
`;
