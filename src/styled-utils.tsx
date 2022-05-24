import {
  css,
  FlattenSimpleInterpolation,
} from "styled-components";
import { FontKind } from "./types";

export const applyFocusStyles = css`
  &:focus {
    transition: outline 0.1s ease-in-out;
    outline: 2px solid var(--c-focus);
    outline-offset: 1px;
    position: relative;
  }
`;

export function applyFontKind(
  fontName: FontKind
): FlattenSimpleInterpolation {
  switch (fontName) {
    case "h1":
      return css`
        font-size: 36px;
        letter-spacing: -0.01em;
        font-weight: bold;
        line-height: auto;
      `;
    case "h2":
      return css`
        font-size: 27.5px;
        letter-spacing: -0.01em;
        font-weight: medium;
        line-height: auto;
      `;
    case "h3":
      return css`
        font-size: 23px;
        font-weight: normal;
        letter-spacing: 0px;
        line-height: auto;
      `;
    case "sub":
      return css`
        font-size: 19.2px;
        font-weight: bold;
        letter-spacing: -0.01em;
        line-height: auto;
      `;
    case "p":
      return css`
        font-size: 16px;
        line-height: 1.5em;
        letter-spacing: 0.025em;
        font-weight: normal;
        line-height: auto;
      `;
    case "label":
      return css`
        font-size: 14px;
        line-height: 1.25em;
        letter-spacing: -0.28px;
        font-weight: normal;
      `;
    case "code":
      return css`
        font-family: "Ubuntu Mono", monospace;
        font-size: 16px;
        letter-spacing: 0.05em;
        font-weight: normal;
      `;
    case "button":
      return css`
        font-size: 11.1px;
        font-weight: bold;
        letter-spacing: 0.555px;
        text-transform: uppercase;
      `;
  }
}
