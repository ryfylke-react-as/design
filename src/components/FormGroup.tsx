import { ReactNode, LabelHTMLAttributes } from "react";
import styled from "styled-components";
import { applyFontKind } from "../styled-utils";

type FormGroupProps = {
  label: ReactNode;
  children: ReactNode;
  invalid?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function FormGroup({
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
      {invalid ? <InvalidText>{invalid}</InvalidText> : ""}
    </StyledLabel>
  ) : (
    <>{children}</>
  );
}

const InvalidText = styled.span`
  ${applyFontKind("label")}
  color:var(--c-danger)
`;

type LabelProps = {
  invalid?: boolean;
};

const StyledLabel = styled.label<LabelProps>`
  ${applyFontKind("label")}
  color:${(props) =>
    props.invalid ? "var(--c-danger)" : "var(--c-ui-03)"};
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
