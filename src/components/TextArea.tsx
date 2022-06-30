import { DragIndicator } from "@material-ui/icons";
import React, { BaseHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { LabelGroup } from "./LabelGroup";

interface TextAreaProps
  extends Omit<
    BaseHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > {
  label: string;
  invalid?: string;
  inverted?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  disabled?: boolean;
  resizable?: boolean;
}

export function TextArea({
  label,
  invalid,
  inverted,
  resizable,
  ...props
}: TextAreaProps) {
  const isInvalid = invalid !== "" && invalid !== undefined;
  return (
    <LabelGroup invalid={invalid} label={label}>
      <StyledContainer
        inverted={inverted}
        invalid={isInvalid}
        disabled={props?.disabled}
        resizable={resizable ?? true}
      >
        <StyledTextArea
          invalid={isInvalid}
          inverted={inverted}
          resizable={resizable ?? true}
          {...props}
        />
        <DragIndicator />
      </StyledContainer>
    </LabelGroup>
  );
}

type StyledContainerProps = {
  inverted?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  resizable?: boolean;
};

const StyledContainer = styled.div<StyledContainerProps>`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 4px;
    right: 0px;
    width: 15px;
    height: 15px;
    background: ${(props) =>
      props.inverted ? "var(--c-ui-bg)" : "var(--c-ui-01)"};
    ${(props) =>
      props.disabled &&
      css<StyledContainerProps>`
        background: ${(props) =>
          props.disabled ? "var(--c-ui-01)" : "var(--c-ui-bg)"};
      `}
    pointer-events: none;
  }
  > svg {
    position: absolute;
    width: 1rem;
    height: 1rem;
    bottom: 5px;
    right: 5px;
    z-index: 2;
    transform: rotate(90deg);
    pointer-events: none;
    fill: ${(props) =>
      props.invalid ? "var(--c-danger-01)" : "var(--c-text-03)"};
  }
  &:focus-within > svg {
    fill: var(--c-focus-01);
  }
  ${(props) =>
    props.resizable === false &&
    `
    > svg, &::after {
      display:none;
    }
  `}
`;

const StyledTextArea = styled.textarea<{
  inverted?: boolean;
  invalid?: boolean;
  resizable?: boolean;
}>`
  ${applyFontKind("label")}
  color:var(--c-text-02);
  background: ${(props) =>
    props.inverted ? "var(--c-ui-bg)" : "var(--c-ui-01)"};
  padding: var(--s-03);
  border-radius: var(--roundness-01);
  border: none;
  box-shadow: 0px 1px 0px var(--c-ui-02);
  &:disabled {
    background: ${(props) =>
      props.inverted
        ? "var(--c-ui-01)"
        : "var(--c-ui-bg)"} !important;
    cursor: not-allowed;
  }
  ${(props) =>
    props.resizable === false &&
    `
    resize:none;
  `}
  &:hover {
    outline: 1px solid var(--c-ui-02);
  }
  ${(props) =>
    props.invalid &&
    `
      outline: 1px solid var(--c-danger-01);
      &:hover {
          outline: 1px solid var(--c-danger-01);
          box-shadow:none;
      }
  `}
  ${applyFocusStyles()}
`;
