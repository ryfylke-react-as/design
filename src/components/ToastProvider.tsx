import { useState } from "react";
import styled, { keyframes } from "styled-components";
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
  const [toastList, setToastList] = useState<ToastListItem[]>(
    []
  );

  const pushToast = (toast: BaseToast | ActionToast) => {
    const id = uid();
    setToastList((p) => [...p, { ...toast, id }]);
    setTimeout(() => {
      clearToast(id);
    }, toast.duration ?? defaultToastOpts.duration);
  };

  const clearToast = (id: string) => {
    setToastList((prev) =>
      prev.filter((toast) => toast.id !== id)
    );
  };

  useListener("ryfre-toast", (event: CustomEvent<Toast>) => {
    const toast = event.detail;
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
  });

  const list = ["topleft", "topright"].includes(location)
    ? toastList
    : [...toastList].reverse();

  return (
    <ToastContainer location={location} zIndex={zIndex}>
      {list.map((toast) => (
        <ToastItem
          toast={toast}
          onClear={() => clearToast(toast.id)}
          key={toast.id}
        />
      ))}
    </ToastContainer>
  );
}

export const toast = (toast: Toast) => {
  const toastEvent = new CustomEvent("ryfre-toast", {
    detail: toast,
  });
  document.body.dispatchEvent(toastEvent);
};

type ToastItemProps = {
  toast: ToastListItem;
  onClear: () => void;
};

function ToastItem({ toast, onClear }: ToastItemProps) {
  return (
    <ToastItemContainer
      kind={toast.kind as "info"}
      onClick={onClear}
      title="Clear toast"
    >
      {toast.icon ?? ""} {toast.text}
    </ToastItemContainer>
  );
}

type ToastItemContainerProps = {
  kind: ToastKind;
};

const KIND_TO_BG: Record<ToastKind, string> = {
  error: "var(--c-danger)",
  info: "var(--c-ui-02)",
  success: "var(--c-primary)",
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
  svg {
    --size: 0.75em;
    width: var(--size);
    height: var(--size);
  }
  &:hover {
    opacity: 0.9;
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
  gap: var(--s-02);
`;
