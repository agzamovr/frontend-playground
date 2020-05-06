import React, { FunctionComponent, RefCallback } from "react";
import styled, { CSSProperties } from "styled-components";

const StyledDropPlaceholder = styled.div`
  box-sizing: border-box;
`;
interface DropPlaceHolderProps {
  style?: CSSProperties;
  ref: RefCallback<HTMLDivElement>;
}
export const DropPlaceHolder: FunctionComponent<DropPlaceHolderProps> = ({
  style,
  ref,
}) => <StyledDropPlaceholder ref={ref} style={style} />;
