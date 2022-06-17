import { BaseHTMLAttributes, useState } from "react";
import styled from "styled-components";
import { useID } from "../hooks/useID";
import { applyFontKind } from "../styled-utils";
import { spread } from "../utils";

interface SwitchProps
  extends Omit<
    BaseHTMLAttributes<HTMLInputElement>,
    "checked" | "onChange"
  > {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelProps?: BaseHTMLAttributes<HTMLLabelElement>;
  containerProps?: BaseHTMLAttributes<HTMLDivElement>;
}

export function Switch({
  checked: propChecked,
  onChange: propOnChange,
  label,
  labelProps,
  containerProps,
  ...props
}: SwitchProps) {
  const [stateChecked, setStateChecked] = useState(false);
  const checked = propChecked ?? stateChecked;
  const onChange = propOnChange ?? setStateChecked;
  const id = useID();
  return (
    <CheckboxContainer {...spread(containerProps)}>
      <StyledInput
        checked={checked}
        onChange={() => onChange(!checked)}
        type="checkbox"
        id={id}
        {...spread(props)}
      />
      <StyledSwitch
        htmlFor={id}
        checked={checked}
      ></StyledSwitch>
      {label ? (
        <label htmlFor={id} {...spread(labelProps)}>
          {label}
        </label>
      ) : (
        ""
      )}
    </CheckboxContainer>
  );
}

const StyledSwitch = styled.label<{
  checked?: boolean;
}>`
  --width: 35px;
  width: var(--width);
  height: 18px;
  border-radius: 50px;
  background: var(--c-ui-02);
  position: relative;
  &::after {
    transition: transform 0.2s var(--ease-01);
    --toggleSize: 20px;
    content: "";
    display: block;
    width: var(--toggleSize);
    height: var(--toggleSize);
    position: absolute;
    left: 0;
    top: 50%;
    transform: ${(props) =>
      props.checked
        ? "translate(calc(var(--width) - 100%), -50%)"
        : "translate(0, -50%)"};
    border-radius: 50%;
    background: ${(props) =>
      props.checked ? "var(--c-focus)" : "var(--c-ui-03)"};
  }
`;

const StyledInput = styled.input`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  visibility: inherit;
  white-space: nowrap;
  top: 1.25rem;
  left: 0.7rem;
`;

const CheckboxContainer = styled.div`
  position: relative;
  display: flex;
  gap: var(--s-03);
  label {
    cursor: pointer;
    user-select: none;
    ${applyFontKind("label")}
    color:var(--c-text-02);
  }
`;
