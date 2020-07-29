import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Draggables } from "dnd/redux/dndReducer";

const StyledDropPlaceholder = styled.div`
  box-sizing: border-box;
`;
export const DropPlaceHolder: FunctionComponent = () => {
  const placeholderOrder = useSelector(
    ({ placeholderOrder }: Draggables) => placeholderOrder
  );
  const rect = useSelector(
    ({ placeholderRect }: Draggables) => placeholderRect
  );
  const shown = placeholderOrder !== undefined;
  return (
    <StyledDropPlaceholder
      style={{
        width: shown ? rect?.width + "px" : "",
        height: shown ? rect?.height + "px" : "",
        display: shown ? "block" : "none",
        order: placeholderOrder,
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
