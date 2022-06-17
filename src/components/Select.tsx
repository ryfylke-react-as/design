import { ArrowDropDown } from "@material-ui/icons";
import React, {
  ReactNode,
  BaseHTMLAttributes,
  useState,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { useScrollBlock } from "../hooks/useScrollBlock";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { LabelGroup } from "./LabelGroup";

type SelectOption =
  | {
      id: string;
      node: ReactNode;
      text?: string;
    }
  | {
      id: string;
      text: string;
      node?: ReactNode;
    };

interface SelectProps
  extends Omit<
    BaseHTMLAttributes<HTMLButtonElement>,
    "onChange" | "value" | "placeholder"
  > {
  options: SelectOption[];
  onChange: (value: string) => void;
  value: string;
  label?: ReactNode;
  placeholder?: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  invalid?: string;
  inverted?: boolean;
}

export function Select({
  options,
  onChange,
  value,
  label,
  onOpenChange,
  placeholder,
  invalid,
  inverted,
  ...props
}: SelectProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [optPos, setOptPos] = useState({ x: 0, y: 0 });
  const [optWidth, setOptWidth] = useState(0);
  const [currentFocus, setCurrentFocus] =
    useState<number | null>(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  const timer = useRef(setTimeout(() => {}));
  const [currentSearch, setCurrentSearch] = useState("");
  const [search, setSearch] = useState("");

  const onBodyClick = (e: MouseEvent) => {
    const target = e.target;
    if (
      !optionsRef.current?.contains(target as Node) &&
      !buttonRef.current?.contains(target as Node)
    ) {
      setOpen(false);
    }
  };

  const typeSearch = (key: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCurrentSearch("");
    }, 1000);
    setCurrentSearch((s) => `${s}${key}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<any>) => {
    switch (true) {
      case e.key === "ArrowDown":
      case e.key === "Tab" && !e.shiftKey:
        if (currentFocus === options.length) {
          setOpen(false);
          buttonRef?.current?.focus();
          return;
        }
        e.preventDefault();
        if (optionsRef.current && currentFocus !== null) {
          const option: HTMLButtonElement | null =
            optionsRef.current.querySelector(
              `button[data-index="${currentFocus + 1}"]`
            );
          option?.focus?.();
          return false;
        }
        break;
      case e.key === "ArrowUp":
      case e.key === "Tab" && e.shiftKey:
        if (currentFocus === 0) {
          setOpen(false);
          return;
        }
        e.preventDefault();
        if (currentFocus === 1) {
          buttonRef?.current?.focus();
          return false;
        }
        if (optionsRef.current && currentFocus !== null) {
          const option: HTMLButtonElement | null =
            optionsRef.current.querySelector(
              `button[data-index="${currentFocus - 1}"]`
            );
          option?.focus?.();
          return false;
        }
        break;
      case e.key.length === 1:
        typeSearch(e.key);
        break;
      default:
        break;
    }
  };

  const onOpen = () => {
    if (buttonRef?.current && optionsRef?.current) {
      const {
        x,
        y: buttonY,
        height,
        width: buttonWidth,
      } = buttonRef.current.getBoundingClientRect();
      const { height: optHeight } =
        optionsRef.current.getBoundingClientRect();
      const y =
        window.innerHeight <= buttonY + height + optHeight
          ? window.innerHeight - optHeight - height
          : buttonY + height;
      setOptPos({
        x,
        y: y + 3,
      });
      setOptWidth(buttonWidth);
      setTimeout(() => {
        blockScroll();
      }, 100);
      document.body.addEventListener("click", onBodyClick);
    }
  };

  const onClose = () => {
    allowScroll();
    document.body.removeEventListener("click", onBodyClick);
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
    onOpenChange?.(isOpen);
    return () => {
      onClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onOpenChange === undefined]);

  useEffect(() => {
    if (currentSearch) {
      setSearch(currentSearch);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (search && isOpen) {
      const match = options.find((opt) => {
        if (typeof opt?.node === "string") {
          return (
            opt.node.toLowerCase().search(search.toLowerCase()) >
            -1
          );
        } else if (opt.text) {
          return (
            opt.text.toLowerCase().search(search.toLowerCase()) >
            -1
          );
        }
        return false;
      });
      if (match && optionsRef?.current) {
        const index = options.indexOf(match);
        const optEl: HTMLButtonElement | null =
          optionsRef.current.querySelector(
            `button[data-index="${index + 1}"]`
          );
        optEl?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const selectedOpt = options.find((opt) => opt.id === value);

  return (
    <>
      <LabelGroup label={label} invalid={invalid}>
        <SelectButton
          {...props}
          inverted={inverted}
          invalid={invalid ? true : false}
          open={isOpen}
          onClick={() => {
            setOpen((c) => !c);
            buttonRef?.current?.focus?.();
          }}
          ref={buttonRef}
          onFocus={() => setCurrentFocus(0)}
          type="button"
          role="listbox"
          tabIndex={0}
          aria-label={`Open select menu "${
            typeof label === "string" ? label : ""
          }"`}
          onKeyDown={
            isOpen
              ? onKeyDown
              : (e) => {
                  if (e.key === "ArrowDown" && !isOpen) {
                    e.preventDefault();
                    setOpen(true);
                    return false;
                  }
                }
          }
        >
          {value ? (
            selectedOpt?.node ?? selectedOpt?.text
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
          <ArrowDropDown />
        </SelectButton>
      </LabelGroup>
      {isOpen
        ? ReactDOM.createPortal(
            <OptionsContainer
              x={optPos.x}
              y={optPos.y}
              className="ryfre--options-menu"
              ref={optionsRef}
              style={{
                minWidth: optWidth,
              }}
            >
              <ul>
                {options.map((opt, i) => (
                  <li>
                    <button
                      onClick={() => {
                        onChange(opt.id);
                        setOpen(false);
                        buttonRef?.current?.focus();
                      }}
                      onFocus={() => {
                        setCurrentFocus(i + 1);
                      }}
                      role="option"
                      aria-selected={opt.id === value}
                      type="button"
                      onKeyDown={onKeyDown}
                      data-index={i + 1}
                    >
                      {opt?.node ?? opt?.text}
                    </button>
                  </li>
                ))}
              </ul>
            </OptionsContainer>,
            document.body
          )
        : null}
    </>
  );
}

type SelectButtonProps = {
  open: boolean;
  invalid?: boolean;
  inverted?: boolean;
};

const SelectButton = styled.button<SelectButtonProps>`
  min-width: 200px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 0px 0px 1px var(--c-ui-02);
  background: ${(props) =>
    props.inverted ? "var(--c-ui-bg)" : "var(--c-ui-01)"};
  padding: var(--s-03) var(--s-05);
  height: 36px;
  cursor: pointer;
  ${applyFontKind("label")}
  ${applyFocusStyles(false)}
  border-radius:var(--roundness-01);
  user-select: text;
  ${(props) =>
    props.invalid &&
    `
      outline: 1px solid var(--c-danger-01);
  `}
  svg {
    fill: var(--c-focus);
    --size: 0.75em;
    width: var(--size);
    height: var(--size);
    transform: ${(props) =>
      props.open ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;

const Placeholder = styled.span`
  color: var(--c-text-02);
`;

const optionsContainerAnim = keyframes`
    from {
        opacity:0;
        transform:scaleY(0.8);
    }
`;

type OptionsContainerProps = {
  x: number;
  y: number;
};
const OptionsContainer = styled.div<OptionsContainerProps>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: var(--c-ui-01);
  max-height: 150px;
  overflow-y: auto;
  animation: ${optionsContainerAnim} 0.15s var(--ease-01);
  transform-origin: top;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--c-ui-03);
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    li button {
      margin: 0;
      border: none;
      background: transparent;
      width: 100%;
      cursor: pointer;
      text-align: left;
      padding: var(--s-03) var(--s-05);
      ${applyFontKind("label")}
      ${applyFocusStyles(false)}
      &:focus {
        outline-offset: -3px;
      }
      &:hover,
      &:focus {
        background: var(--c-ui-02);
      }
    }
  }
`;
