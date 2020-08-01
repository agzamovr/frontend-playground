import React, { FunctionComponent, ReactElement, useMemo } from "react";
import { useDrag } from "dnd/useDrag";
import { useSelector } from "react-redux";
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
  const order = useSelector(({ elementsOrder }: Draggables) =>
    findKeyByValue(elementsOrder, originalOrder)
  );

  const { ref, dragHandleRef } = useDrag(order, originalOrder);
  const memoChildren = useMemo(() => children(dragHandleRef), [
    children,
    dragHandleRef,
  ]);
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
      {memoChildren}
    </Grid>
  );
};
