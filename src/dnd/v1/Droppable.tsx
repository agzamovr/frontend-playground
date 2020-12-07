import React, { useMemo, useRef, useCallback, ReactElement } from "react";
import { useDragController } from "dnd/v1/useDragController";
import { DropPlaceHolder } from "dnd/v1/DropPlaceholder";

interface DroppableProps {
  droppableId: string;
  children: (
    innerRef: (element?: HTMLElement | null) => void,
    placeholder: ReactElement
  ) => ReactElement<HTMLElement>;
}
export const Droppable = (props: DroppableProps) => {
  const droppableRef = useRef<HTMLElement | null>(null);
  const { droppableId, children } = props;
  const setRef = useCallback(
    (element?: HTMLElement | null) => {
      if (!element) return;
      droppableRef.current = element;
      element.setAttribute("data-dnd-droppable-id", droppableId);
    },
    [droppableId]
  );
  useDragController();
  const placeholder = useMemo(() => <DropPlaceHolder />, []);
  const memoChildren = useMemo(() => children(setRef, placeholder), [
    children,
    setRef,
    placeholder,
  ]);
  return memoChildren;
};
