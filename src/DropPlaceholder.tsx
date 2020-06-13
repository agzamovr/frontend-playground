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
  const placeholderOrder = useSelector(
    ({ draggables }: Store) => draggables.placeholderOrder
  );
  const rect = useSelector(
    ({ draggables }: Store) => draggables.placeholderRect
  );
  const shown = placeholderOrder !== null;
  return (
    <StyledDropPlaceholder
      style={{
        width: shown ? rect?.width + "px" : "",
        height: shown ? rect?.height + "px" : "",
        display: shown ? "block" : "none",
        order: placeholderOrder ? parseInt(placeholderOrder) : undefined,
        gridColumnStart: shown ? rect?.gridColumnStart : "",
        gridColumn: shown ? rect?.gridColumn : "",
        gridColumnEnd: shown ? rect?.gridColumnEnd : "",
        gridRow: shown ? rect?.gridRow : "",
        gridRowStart: shown ? rect?.gridRowStart : "",
        gridRowEnd: shown ? rect?.gridRowEnd : "",
      }}
    />
  );
};
