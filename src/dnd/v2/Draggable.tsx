import React, { useCallback } from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grey from "@material-ui/core/colors/grey";

interface DragHandleProps {
  draggableId: string;
}
export const useDraggable = (draggableId: string) => {
  const setDragHandleRef = useCallback(
    (element) => {
      element?.setAttribute("data-dnd-drag-handle", draggableId);
    },
    [draggableId]
  );

  return setDragHandleRef;
};

export const DragHandle = (props: DragHandleProps) => {
  const dragHandleRef = useDraggable(props.draggableId);
  return <DragIndicatorIcon style={{ color: Grey[500] }} ref={dragHandleRef} />;
};
