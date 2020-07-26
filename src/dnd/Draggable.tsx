import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";
import { useSelector, shallowEqual } from "react-redux";
import { Store } from "../redux/store";
import { findKeyByValue } from "./redux/dndReducer";

interface DraggableAttributes {
  order: string;
}

const StyledDraggable = styled.div.attrs((props: DraggableAttributes) => ({
  "data-draggable": props.order,
  draggable: false,
}))<DraggableAttributes>`
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
  box-sizing: border-box;
`;
interface DraggableProps {
  originalOrder: string;
}
export const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { originalOrder, children } = props;
  const order = useSelector(
    ({ draggables: { elementsOrder } }: Store) =>
      findKeyByValue(elementsOrder, originalOrder),
    shallowEqual
  );

  const { ref } = useDrag(order, originalOrder);
  return (
    <StyledDraggable
      ref={ref}
      order={order}
      style={{ order: order ? parseInt(order) : undefined }}
    >
      {children}
    </StyledDraggable>
  );
};
