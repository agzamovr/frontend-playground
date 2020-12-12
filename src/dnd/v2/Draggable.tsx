import React, {
  ReactElement,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { DnDContext } from "dnd/v2/DnDContext";
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
  const context = useContext(DnDContext);

  const setDragHandleRef = useCallback(
    (element) => {
      element.setAttribute("data-dnd-drag-handle", "");
      context?.addElement(draggableId);
    },
    [context, draggableId]
  );

  useEffect(() => {
    return () => context?.removeElement(draggableId);
  }, [context, draggableId]);
  return setDragHandleRef;
};

export const DragHandle = (props: DragHandleProps) => {
  const dragHandleRef = useDraggable(props.draggableId);
  return <DragIndicatorIcon style={{ color: Grey[500] }} ref={dragHandleRef} />;
};

export const Draggable = (props: DraggableProps) => {
  const { draggableId, children } = props;
  const setDragHandleRef = useDraggable(draggableId);
  const memoChildren = useMemo(() => children(setDragHandleRef), [
    children,
    setDragHandleRef,
  ]);
  return memoChildren;
};
