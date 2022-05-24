import { ReactNode, LabelHTMLAttributes } from "react";
import styled from "styled-components";
import { applyFontKind } from "../styled-utils";

type FormGroupProps = {
  label: ReactNode;
  children: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
};

export function FormGroup({
  label,
  children,
  labelProps = {},
}: FormGroupProps) {
  return (
    <StyledFormGroup>
      {label ? (
        <StyledLabel {...labelProps}>
          {label}
          <div>{children}</div>
        </StyledLabel>
      ) : (
        children
      )}
    </StyledFormGroup>
  );
}

const StyledFormGroup = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  ${applyFontKind("label")}
  color:var(--c-ui-03);
  display: flex;
  flex-direction: column;
  gap: var(--s-02);
`;
