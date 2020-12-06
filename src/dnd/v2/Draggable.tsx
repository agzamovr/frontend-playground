import {
  ReactElement,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { DnDContext } from "dnd/v2/DnDContext";

interface DraggableProps {
  draggableId: string;
  children: (
    innerRef: (element?: Element | null) => void
  ) => ReactElement<HTMLElement>;
}
export const Draggable = (props: DraggableProps) => {
  const context = useContext(DnDContext);
  const { draggableId, children } = props;
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

  const memoChildren = useMemo(() => children(setDragHandleRef), [
    children,
    setDragHandleRef,
  ]);
  return memoChildren;
};
