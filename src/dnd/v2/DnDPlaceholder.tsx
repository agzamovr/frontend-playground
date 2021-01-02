import { Box } from "@material-ui/core";
import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";

type StyledDropPlaceholderProps = {
  $isTop?: boolean;
  $isNested?: boolean;
};

type DnDPlaceholderProps = {
  show: boolean;
  isTop?: boolean;
  isNested?: boolean;
};

export const StyledDropPlaceholder = styled(Box)<StyledDropPlaceholderProps>`
  flex-grow: 1;
  pointer-events: none;
  background: rgba(46, 170, 220, 0.5);
  height: 4px;
  position: absolute;
  left: ${({ $isNested }) => ($isNested ? "4px" : 0)};
  right: ${({ $isNested }) => ($isNested ? "10px" : 0)};
  top: ${({ $isTop }) => ($isTop ? 0 : "auto")};
  bottom: ${({ $isTop }) => ($isTop ? "auto" : "-4px")};
`;

export const useDnDItemPlaceholder = (
  id: string,
  dndItemType: string,
  enableNested: boolean = false
) => {
  const dndContext = useContext(DnDContext);
  const [showTopPlaceholder, setShowTopPlaceholder] = useState(false);
  const [showBottomPlaceholder, setShowBottomPlaceholder] = useState(false);
  const [showNestedPlaceholder, setShowNestedPlaceholder] = useState(false);
  const onDragOver = useCallback(
    (
      draggingItem: DnDItem,
      underlyingItem: DnDItem,
      isEntering: boolean,
      intersectionInfo?: IntersectionInfoParam
    ) => {
      if (
        draggingItem.type !== dndItemType ||
        underlyingItem.type !== dndItemType
      )
        return;
      const fromTop = !!intersectionInfo?.fromTop;
      const fromBottom = !fromTop && !!intersectionInfo?.fromBottom;
      const nested = enableNested && !!intersectionInfo?.fromLeft && fromBottom;
      setShowTopPlaceholder(isEntering && fromTop);
      setShowBottomPlaceholder(isEntering && !nested && fromBottom);
      setShowNestedPlaceholder(isEntering && nested);
    },
    [dndItemType, enableNested]
  );
  const onDropOver = useCallback(() => {
    setShowTopPlaceholder(false);
    setShowBottomPlaceholder(false);
    setShowNestedPlaceholder(false);
  }, []);
  useEffect(() => {
    dndContext?.addDragOverObserver(onDragOver, [id]);
    dndContext?.addDropOverObserver(onDropOver, [id]);
    return () => {
      dndContext?.removeDragOverObserver(onDragOver, [id]);
      dndContext?.removeDropOverObserver(onDropOver, [id]);
    };
  }, [dndContext, onDragOver, onDropOver, id]);

  return {
    showTopPlaceholder,
    showBottomPlaceholder,
    showNestedPlaceholder,
  };
};

export const DropPlaceholder = ({
  show,
  isTop,
  isNested,
}: DnDPlaceholderProps) => {
  return show ? (
    <StyledDropPlaceholder $isTop={isTop} $isNested={isNested} />
  ) : null;
};
