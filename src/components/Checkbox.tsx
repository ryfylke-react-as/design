import { BaseHTMLAttributes, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useID } from "../hooks/useID";
import Check from "../svgr/Check";
import { spread } from "../utils";

interface CheckboxProps
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

export function Checkbox({
  checked: propChecked,
  onChange: propOnChange,
  label,
  labelProps,
  containerProps,
  ...props
}: CheckboxProps) {
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
      <StyledCheckbox htmlFor={id} checked={checked}>
        <Check />
      </StyledCheckbox>
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

const checkAnim = keyframes`
  0% {
    clip-path: polygon(0 0, 0 0, 0 0, 0% 100%);
  }
  50% {
    clip-path: polygon(0 0, 0 0, 50% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
`;

const StyledCheckbox = styled.label<{
  checked?: boolean;
}>`
  --size: 18px;
  width: var(--size);
  height: var(--size);
  background: ${(props) =>
    props.checked ? "var(--c-focus)" : "var(--c-ui-01)"};
  border: 1px solid
    ${(props) =>
      props.checked ? "var(--c-focus)" : "var(--c-ui-02)"};
  border-radius: var(--roundness-01);
  display: inline-block;
  cursor: pointer;
  svg {
    fill: var(--c-text-04);
    path {
      stroke-dasharray: 57;
      stroke-dashoffset: 57;
      transition: opacity 0.1s var(--ease-01);
      ${(props) =>
        !props.checked &&
        `
        opacity:0;
      `}
      ${(props) =>
        props.checked &&
        css`
          animation: ${checkAnim} 0.2s var(--ease-01);
          animation-fill-mode: both;
        `}
    }
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
  }
`;
