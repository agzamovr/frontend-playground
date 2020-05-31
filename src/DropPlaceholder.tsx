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
  const { placeholderOrder, rects, elementsOrder } = useSelector(
    ({ draggables }: Store) => draggables
  );
  const shown = placeholderOrder !== null;
  const rect =
    placeholderOrder !== null ? rects[elementsOrder[placeholderOrder]] : null;
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
