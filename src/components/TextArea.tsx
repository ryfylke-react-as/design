import { BaseHTMLAttributes } from "react";
import styled from "styled-components";

interface TextAreaProps
  extends BaseHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: TextAreaProps) {
  return <StyledTextArea {...props} />;
}

const StyledTextArea = styled.textarea``;
