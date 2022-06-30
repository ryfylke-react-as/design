import { useRef } from "react";
import styled from "styled-components";
import { applyFontKind } from "../../styled-utils";

type Props = {
  code: string;
};

export function CodePreview({ code }: Props) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <StyledPre
      ref={ref}
      onDoubleClick={() => {
        if (window.getSelection && ref.current) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(ref.current);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }}
    >
      <code>{code}</code>
    </StyledPre>
  );
}

const StyledPre = styled.pre`
  max-height: 400px;
  overflow-y: auto;
  background: var(--c-ui-01);
  padding: var(--s-03);
  ${applyFontKind("code")}
  color:var(--c-text-03);
`;
