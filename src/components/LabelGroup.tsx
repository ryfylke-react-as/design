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
  color:var(--c-danger);
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
    props.invalid ? "var(--c-danger)" : "var(--c-text-02)"};
  display: flex;
  flex-direction: column;
  gap: var(--s-02);
  width: min-content;
  &:focus-within {
    color: var(--c-focus);
  }
  > div {
    width: min-content;
  }
  ${(props) =>
    props.invalid &&
    `
      --c-focus: var(--c-danger);
  `}
`;
