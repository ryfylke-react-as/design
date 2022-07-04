import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TOAST_EVENT } from "../constants";
import { useListener } from "../hooks/useListener";
import { applyFontKind } from "../styled-utils";
import {
  ActionToast,
  BaseToast,
  Toast,
  ToastKind,
} from "../types";

type ToastListItem = (BaseToast | ActionToast) & {
  id: string;
};

const defaultToastOpts: BaseToast = {
  text: "",
  duration: 3500,
  kind: "info",
};
const uid = function () {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substr(2)
  );
};

type ToastProviderLocation =
  | "topright"
  | "topleft"
  | "bottomright"
  | "bottomleft"
  | "static";

type ToastProviderProps = {
  location?: ToastProviderLocation;
  zIndex?: number;
};

export function ToastProvider({
  location = "bottomright",
  zIndex = 1,
}: ToastProviderProps) {
  const toastCancelers = useRef<Record<string, boolean>>({});
  const toastTimers = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const mountedRef = useRef(true);
  const [toastList, setToastList] = useState<ToastListItem[]>(
    []
  );

  const pushToast = (toast: BaseToast | ActionToast) => {
    const id = uid();
    setToastList((p) => [...p, { ...toast, id }]);
    toastCancelers.current[id] = false;
    const timeoutFunc = () => {
      if (!toastCancelers.current[id]) {
        clearToast(id);
      }
    };
    toastTimers.current[id] = setTimeout(
      timeoutFunc,
      toast.duration ?? defaultToastOpts.duration
    );
  };

  const clearToast = (id: string) => {
    if (mountedRef.current) {
      setToastList((prev) =>
        prev.filter((toast) => toast.id !== id)
      );
    }
  };

  useListener(TOAST_EVENT, (event: CustomEvent<Toast>) => {
    const toast = event.detail;
    if (mountedRef.current) {
      if (typeof toast == "string") {
        pushToast({
          ...defaultToastOpts,
          text: toast,
        });
      } else {
        pushToast({
          ...toast,
          duration: toast?.duration ?? defaultToastOpts.duration,
          kind: toast?.kind ?? defaultToastOpts.kind,
        });
      }
    }
  });

  const list = ["topleft", "topright"].includes(location)
    ? toastList
    : [...toastList].reverse();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return (
    <ToastContainer location={location} zIndex={zIndex}>
      {list.map((toast) => (
        <ToastItem
          toast={toast}
          onClear={() => clearToast(toast.id)}
          key={toast.id}
          onMouseEnter={() => {
            toastCancelers.current[toast.id] = true;
            clearTimeout(toastTimers.current[toast.id]);
          }}
          onMouseLeave={() => {
            toastCancelers.current[toast.id] = false;
            const timeoutFunc = () => {
              if (!toastCancelers.current[toast.id]) {
                clearToast(toast.id);
              }
            };
            toastTimers.current[toast.id] = setTimeout(
              timeoutFunc,
              toast.duration ?? defaultToastOpts.duration
            );
          }}
        />
      ))}
    </ToastContainer>
  );
}

export const toast = (toast: Toast) => {
  const toastEvent = new CustomEvent(TOAST_EVENT, {
    detail: toast,
  });
  document.body.dispatchEvent(toastEvent);
};

type ToastItemProps = {
  toast: ToastListItem;
  onClear: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function ToastItem({
  toast,
  onClear,
  onMouseEnter,
  onMouseLeave,
}: ToastItemProps) {
  return (
    <ToastItemContainer
      kind={toast.kind as "info"}
      onClick={onClear}
      title="Clear toast"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {toast.icon ?? ""} {toast.text}
    </ToastItemContainer>
  );
}

type ToastItemContainerProps = {
  kind: ToastKind;
};

const KIND_TO_BG: Record<ToastKind, string> = {
  error: "var(--c-danger-01)",
  info: "var(--c-ui-02)",
  success: "var(--c-success-01)",
};
const KIND_TO_COLOR: Record<ToastKind, string> = {
  error: "var(--c-text-04)",
  info: "var(--c-text-01)",
  success: "var(--c-text-04)",
};

const itemAnim = keyframes`
    from {
        transform:scale(0.5) rotate(10deg) translateX(20%);
        opacity:0;
    }
`;

const ToastItemContainer = styled.button<ToastItemContainerProps>`
  padding: var(--s-05) var(--s-05);
  background: ${({ kind }) => KIND_TO_BG[kind]};
  border-radius: var(--roundness-01);
  display: flex;
  gap: var(--s-04);
  border: none;
  cursor: pointer;
  animation: ${itemAnim} 0.2s var(--ease-01);
  perspective: 20px;
  width: 250px;
  align-items: center;
  position: relative;
  transition: transform 0.2s var(--ease-01);
  z-index: 2;
  svg {
    --size: 0.75em;
    width: var(--size);
    height: var(--size);
  }
  &:hover {
    transform: translateX(-5px);
  }
  ${applyFontKind("label")}
  color: ${({ kind }) => KIND_TO_COLOR[kind]};
`;

const ToastContainer = styled.div<{
  location: ToastProviderLocation;
  zIndex: number;
}>`
  position: ${(props) =>
    props.location !== "static" ? "fixed" : "static"};
  bottom: ${(props) =>
    ["bottomright", "bottomleft"].includes(props.location)
      ? "var(--s-03)"
      : "auto"};
  right: ${(props) =>
    ["bottomright", "topright"].includes(props.location)
      ? "var(--s-03)"
      : "auto"};
  left: ${(props) =>
    ["bottomleft", "topleft"].includes(props.location)
      ? "var(--s-03)"
      : "auto"};
  top: ${(props) =>
    ["topleft", "topright"].includes(props.location)
      ? "var(--s-03)"
      : "auto"};
  z-index: ${(props) => props.zIndex.toString()};
  display: flex;
  flex-direction: column;
  gap: var(--s-03);
`;
