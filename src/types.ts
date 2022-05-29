import { ReactNode } from "react";

export type FontKind =
  | "h1"
  | "h2"
  | "h3"
  | "sub"
  | "p"
  | "label"
  | "code"
  | "button";

export type ButtonKind =
  | "regular"
  | "primary"
  | "danger"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "field";

export type ToastKind = "success" | "error" | "info";

export type BaseToast = {
  text: string;
  kind?: ToastKind;
  /** Duration, in milliseconds. Default 1500 */
  duration?: number;
  icon?: ReactNode;
};

export type ActionToast = BaseToast & {
  action: () => void;
  actionText: string;
};

export type Toast = BaseToast | ActionToast | string;

export type ColorToken =
  | "focus"
  | "ui-01"
  | "ui-02"
  | "ui-03"
  | "ui-04"
  | "ui-bg"
  | "text-01"
  | "text-02"
  | "text-03"
  | "text-04"
  | "text-05"
  | "primary"
  | "danger";
