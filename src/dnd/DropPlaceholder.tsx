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
  return shown ? (
    <StyledDropPlaceholder
      style={{
        width: rect?.width + "px",
        height: rect?.height + "px",
        order: placeholderOrder,
        gridColumnStart: rect?.gridColumnStart,
        gridColumn: rect?.gridColumn,
        gridColumnEnd: rect?.gridColumnEnd,
        gridRow: rect?.gridRow,
        gridRowStart: rect?.gridRowStart,
        gridRowEnd: rect?.gridRowEnd,
      }}
    />
  ) : null;
};
