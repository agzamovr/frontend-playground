import React, { FunctionComponent } from "react";
import styled, { CSSProperties } from "styled-components";
import { useSelector } from "react-redux";
import { Store } from "./redux/store";

const StyledDropPlaceholder = styled.div`
  box-sizing: border-box;
`;
interface DropPlaceHolderProps {
  style?: CSSProperties;
}
export const DropPlaceHolder: FunctionComponent = () => {
  const { placeholderOrder, rects } = useSelector(
    ({ draggables }: Store) => draggables
  );
  const shown = placeholderOrder !== null;
  const rect = placeholderOrder !== null ? rects[placeholderOrder] : null;
  return (
    <StyledDropPlaceholder
      style={{
        width: shown ? rect?.width + "px" : "",
        height: shown ? rect?.height + "px" : "",
        display: shown ? "block" : "none",
        order: placeholderOrder || undefined,
      }}
    />
  );
};
