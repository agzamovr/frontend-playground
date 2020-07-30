import React, { FunctionComponent, ReactElement } from "react";
import { useDrag } from "dnd/useDrag";
import { useSelector, shallowEqual } from "react-redux";
import { findKeyByValue, Draggables } from "./redux/dndReducer";
import { Grid } from "@material-ui/core";

interface DraggableProps {
  originalOrder: number;
  children: (
    innerRef: (element?: Element | null) => void
  ) => ReactElement<HTMLElement>;
}
export const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { originalOrder, children } = props;
  const order = useSelector(
    ({ elementsOrder }: Draggables) =>
      findKeyByValue(elementsOrder, originalOrder),
    shallowEqual
  );

  const { ref, dragHandleRef } = useDrag(order, originalOrder);
  return (
    <Grid
      ref={ref}
      item
      style={{
        order,
        boxSizing: "border-box",
      }}
      data-draggable={order}
      draggable={false}
    >
      {children(dragHandleRef)}
    </Grid>
  );
};
