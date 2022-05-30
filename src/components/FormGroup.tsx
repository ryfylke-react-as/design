import { ReactNode } from "react";
import styled from "styled-components";
import { StyledButton } from "./Button";
import { StyledLabel } from "./LabelGroup";

type FormGroupProps = {
  invalid?: boolean | string;
  children: ReactNode | ReactNode[];
};

export function FormGroup({
  invalid,
  children,
}: FormGroupProps) {
  return (
    <StyledFormGroup invalid={invalid}>
      {children}
    </StyledFormGroup>
  );
}

const StyledFormGroup = styled.div<FormGroupProps>`
  display: flex;
  gap: var(--s-03);
  align-items: flex-start;
  ${StyledLabel}, .ryfre--label {
    align-self: flex-start;
  }
  ${StyledButton}, .ryfre--button {
    align-self: ${(props) =>
      props.invalid ? "center" : "flex-end"};
  }
`;
