import React from "react";
import { ReactNode, LabelHTMLAttributes } from "react";
import styled from "styled-components";
import { applyFontKind } from "../styled-utils";

type FormGroupProps = {
  label: ReactNode;
  children: ReactNode;
  invalid?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function LabelGroup({
  label,
  children,
  invalid,
  ...labelProps
}: FormGroupProps) {
  return label ? (
    <StyledLabel
      invalid={invalid ? true : false}
      {...labelProps}
      className={`ryfre--label ${labelProps?.className ?? ""}`}
    >
      {label}
      <div>{children}</div>
      {invalid ? (
        <InvalidText title={invalid}>{invalid}</InvalidText>
      ) : (
        ""
      )}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
}

const InvalidText = styled.span`
  ${applyFontKind("label")}
  color:var(--c-danger-01);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

type LabelProps = {
  invalid?: boolean;
};

export const StyledLabel = styled.label<LabelProps>`
  ${applyFontKind("label")}
  color:${(props) =>
    props.invalid ? "var(--c-danger-01)" : "var(--c-text-02)"};
  display: flex;
  flex-direction: column;
  gap: var(--s-02);
  width: min-content;
  max-width: 100%;
  &:focus-within {
    color: var(--c-focus-01);
  }
  > div {
    width: min-content;
    max-width: 100%;
  }
  ${(props) =>
    props.invalid &&
    `
      --c-focus: var(--c-danger-01);
  `}
`;
