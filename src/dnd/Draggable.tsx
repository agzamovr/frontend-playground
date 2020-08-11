import React, {
  FunctionComponent,
  ReactElement,
  useMemo,
  useEffect,
} from "react";
import { useDrag } from "dnd/useDrag";
import { useSelector, useDispatch } from "react-redux";
import { findKeyByValue, Draggables, dndActions } from "./redux/dndReducer";
import { Grid } from "@material-ui/core";

interface DraggableProps {
  draggableId: string;
  children: (
    innerRef: (element?: Element | null) => void
  ) => ReactElement<HTMLElement>;
}
export const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const dispatch = useDispatch();
  const { draggableId, children } = props;

  useEffect(() => {
    dispatch(dndActions.addDraggable(draggableId));
  }, [dispatch, draggableId]);

  const order = useSelector(({ elementsOrder }: Draggables) =>
    findKeyByValue(elementsOrder, draggableId)
  );

  const { ref, dragHandleRef } = useDrag(order);
  const memoChildren = useMemo(() => children(dragHandleRef), [
    children,
    dragHandleRef,
  ]);
  return (
    <Grid
      ref={ref}
      item
      style={{ order }}
      data-dnd-draggable={order}
      draggable={false}
    >
      {memoChildren}
    </Grid>
  );
};
