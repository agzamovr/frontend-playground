import React, { forwardRef } from "react";
import styled, { CSSProperties } from "styled-components";

const StyledDropPlaceholder = styled.div`
  box-sizing: border-box;
`;
interface DropPlaceHolderProps {
  style?: CSSProperties;
}
export const DropPlaceHolder = forwardRef<HTMLDivElement, DropPlaceHolderProps>(
  (props, ref) => <StyledDropPlaceholder ref={ref} style={props.style} />
);
