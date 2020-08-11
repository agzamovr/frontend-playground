import React, {
  FunctionComponent,
  ReactElement,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
  const dragHandleRef = useRef<HTMLElement | null>(null);
  const { draggableId, children } = props;
  const setDragHandleRef = useCallback((element) => {
    dragHandleRef.current = element;
    element && element.setAttribute("data-dnd-drag-handle", "0");
  }, []);
  useEffect(() => {
    dispatch(dndActions.addDraggable(draggableId));
  }, [dispatch, draggableId]);

  const order = useSelector(({ elementsOrder }: Draggables) =>
    findKeyByValue(elementsOrder, draggableId)
  );
  const memoChildren = useMemo(() => children(setDragHandleRef), [
    children,
    setDragHandleRef,
  ]);
  return (
    <Grid item style={{ order }} data-dnd-draggable={order} draggable={false}>
      {memoChildren}
    </Grid>
  );
};
