import {
  css,
  FlattenSimpleInterpolation,
} from "styled-components";

export const applyFocusStyles = css`
  &:focus {
    transition: outline 0.1s ease-in-out;
    outline: 2px solid var(--c-focus);
    outline-offset: 1px;
    position: relative;
    & + button,
    & + input,
    & + select {
      margin-left: 3px;
    }
  }
`;

type FontKind =
  | "h1"
  | "h2"
  | "h3"
  | "sub"
  | "p"
  | "label"
  | "code"
  | "button";

export function applyFontKind(
  fontName: FontKind
): FlattenSimpleInterpolation {
  switch (fontName) {
    case "h1":
      return css``;
    case "h2":
      return css``;
    case "h3":
      return css``;
    case "sub":
      return css``;
    case "p":
      return css``;
    case "label":
      return css`
        font-size: 14px;
        line-height: 1.25em;
        letter-spacing: -0.28px;
      `;
    case "code":
      return css``;
    case "button":
      return css`
        font-size: 11.1px;
        font-weight: bold;
        letter-spacing: 0.555px;
        text-transform: uppercase;
      `;
  }
}
