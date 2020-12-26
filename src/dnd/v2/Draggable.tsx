import React, { ReactElement, useMemo, useCallback } from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grey from "@material-ui/core/colors/grey";

interface DragHandleProps {
  draggableId: string;
}

type DraggableProps = DragHandleProps & {
  children: (
    innerRef: (element?: Element | null) => void
  ) => ReactElement<HTMLElement>;
};

export const useDraggable = (draggableId: string) => {
  const setDragHandleRef = useCallback(
    (element) => {
      if (element) element?.setAttribute("data-dnd-drag-handle", draggableId);
    },
    [draggableId]
  );

  return setDragHandleRef;
};

export const DragHandle = (props: DragHandleProps) => {
  const dragHandleRef = useDraggable(props.draggableId);
  return <DragIndicatorIcon style={{ color: Grey[500] }} ref={dragHandleRef} />;
};

export const Draggable = (props: DraggableProps) => {
  const { children } = props;
  const setDragHandleRef = useDraggable(props.draggableId);
  const memoChildren = useMemo(() => children(setDragHandleRef), [
    children,
    setDragHandleRef,
  ]);
  return memoChildren;
};
