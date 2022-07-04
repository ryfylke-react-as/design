import { Check, Save, SaveAlt } from "@styled-icons/material";
import { ElementType, ReactNode } from "react";
import { toast } from "./components/ToastProvider";
import { FontKind, ButtonKind, ButtonSize } from "./types";

export const typographyKinds: Array<{
  as: ElementType;
  kind: FontKind;
  text: string;
}> = [
  { as: "h1", kind: "h1", text: "Header 1" },
  { as: "h2", kind: "h2", text: "Header 2" },
  { as: "h3", kind: "h3", text: "Header 3" },
  { as: "strong", kind: "subtitle", text: "Subtitle" },
  { as: "p", kind: "body", text: "Body" },
  { as: "p", kind: "label", text: "Label" },
  { as: "p", kind: "small", text: "Small" },
  { as: "p", kind: "code", text: "CODE { }" },
  { as: "p", kind: "button", text: "Button" },
];

export const buttonKinds: Array<{
  kind: ButtonKind;
  text: string;
  icon?: ReactNode;
  ripple?: boolean;
  onClick?: () => void;
}> = [
  {
    kind: "regular",
    text: "Regular",
    onClick: () => toast("Clicked regular button"),
  },
  {
    kind: "primary",
    text: "Primary",
    onClick: () => toast("Clicked primary button"),
  },
  {
    kind: "success",
    text: "Success",
    onClick: () =>
      toast({
        text: "Clicked success button",
        kind: "success",
      }),
  },
  {
    kind: "danger",
    text: "Danger",
    onClick: () =>
      toast({
        text: "Clicked danger button",
        kind: "error",
      }),
  },
  {
    kind: "ghost",
    text: "Ghost",
    onClick: () => toast("Clicked ghost button"),
  },
  {
    kind: "ghost",
    text: "Ghost (with icon)",
    onClick: () => toast("Clicked ghost button"),
    icon: <Save />,
  },
  {
    ripple: true,
    kind: "ghost",
    text: "Ghost (With ripple)",
    onClick: () => toast("Clicked ghost button"),
  },
  {
    kind: "ghost",
    text: "",
    icon: <SaveAlt />,
    onClick: () =>
      toast({
        text: "Clicked icon-only button",
        icon: <Check />,
      }),
  },
];

export const buttonSizes: Array<{
  size: ButtonSize;
  text: string;
}> = [
  {
    size: "sm",
    text: "Small",
  },
  {
    size: "field",
    text: "Field",
  },
  {
    size: "md",
    text: "Medium",
  },
  {
    size: "lg",
    text: "Large",
  },
];

export const selectOpts = [
  {
    id: "no",
    text: "Norway",
  },
  {
    id: "en",
    text: "England",
  },
  {
    id: "ir",
    text: "Ireland",
  },
  {
    id: "sw",
    text: "Sweden",
  },
  {
    id: "de",
    text: "Denmark",
  },
  {
    id: "fi",
    text: "Finland",
  },
  {
    id: "ge",
    text: "Germany",
  },
  {
    id: "ne",
    text: "Netherlands",
  },
];
