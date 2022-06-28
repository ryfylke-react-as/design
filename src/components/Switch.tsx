import {
  BaseHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import { useID } from "../hooks/useID";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { spread } from "../utils";

interface SwitchProps
  extends Omit<
    BaseHTMLAttributes<HTMLInputElement>,
    "checked" | "onChange"
  > {
  checked?: boolean;
  inverted?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelProps?: BaseHTMLAttributes<HTMLLabelElement>;
  containerProps?: BaseHTMLAttributes<HTMLDivElement>;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
}

export function Switch({
  checked: propChecked,
  onChange: propOnChange,
  label,
  labelProps,
  containerProps,
  checkedIcon,
  uncheckedIcon,
  inverted,
  ...props
}: SwitchProps) {
  const id = useID();
  const labelRef = useRef<HTMLLabelElement>(null);
  const [stateChecked, setStateChecked] = useState(false);
  const checked = propChecked ?? stateChecked;
  const onChange = propOnChange ?? setStateChecked;

  const check = () => {
    onChange(!checked);
    labelRef.current?.focus?.();
  };

  return (
    <SwitchContainer {...spread(containerProps)}>
      <StyledInput
        checked={checked}
        onChange={check}
        type="checkbox"
        id={id}
        tabIndex={-1}
        {...spread(props)}
      />
      <StyledSwitch
        htmlFor={id}
        checked={checked}
        tabIndex={0}
        ref={labelRef}
        inverted={inverted}
        onKeyDown={(e) => {
          if ([" ", "Enter"].includes(e.key)) {
            check();
          }
        }}
      >
        {(checked && checkedIcon) ?? ""}
        {(!checked && uncheckedIcon) ?? ""}
      </StyledSwitch>
      {label ? (
        <label htmlFor={id} {...spread(labelProps)}>
          {label}
        </label>
      ) : (
        ""
      )}
    </SwitchContainer>
  );
}

const iconAnim = keyframes`
  from {
    opacity:0;
    transform:rotate(90deg);
  }
`;

const StyledSwitch = styled.label<{
  checked?: boolean;
  inverted?: boolean;
}>`
  --width: 35px;
  --toggleSize: 20px;
  width: var(--width);
  height: 18px;
  border-radius: 50px;
  background: ${(props) =>
    props.inverted ? "var(--c-ui-bg)" : "var(--c-ui-02)"};
  ${(props) =>
    props.inverted && `border:1px solid var(--c-ui-02);`}
  position: relative;
  svg {
    position: absolute;
    animation: ${iconAnim} 0.2s var(--ease-01);
    transition: transform 0.2s var(--ease-01);
    --iconSize: calc(var(--toggleSize) * 0.6);
    color: var(--c-text-04);
    width: var(--iconSize);
    height: var(--iconSize);
    left: 0;
    z-index: 2;
    top: 50%;
    transform: ${(props) =>
      props.checked
        ? "translate(calc(calc(var(--width) - 100%) - calc(var(--toggleSize) / 5)), -50%)"
        : "translate(calc(var(--toggleSize) / 5), -50%)"};
    opacity: 0.8;
  }
  &::after {
    transition: transform 0.2s var(--ease-01);

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
      props.checked ? "var(--c-focus-01)" : "var(--c-ui-03)"};
  }
  ${applyFocusStyles(true)}
  &:focus {
    outline-offset: 2px;
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

const SwitchContainer = styled.div`
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
