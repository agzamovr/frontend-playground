import React, { FunctionComponent, useMemo } from "react";
import { useDragController } from "dnd/useDragController";
import { DropPlaceHolder } from "dnd/DropPlaceholder";

export const Droppable: FunctionComponent = ({ children }) => {
  useDragController();
  const memoChildren = useMemo(() => children, [children]);
  return (
    <>
      {memoChildren}
      <DropPlaceHolder />
    </>
  );
};
