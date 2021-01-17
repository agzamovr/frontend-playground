import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";

export type StyledDropPlaceholderProps = {
  isTop?: boolean;
  isNested?: boolean;
};

export type DnDPlaceholderProps = {
  id: string;
  dndItemType: string;
};

export const StyledDropPlaceholder = styled.div.withConfig<StyledDropPlaceholderProps>(
  {
    shouldForwardProp: (prop, defaultValidatorFn) =>
      !["isTop", "isNested"].includes(prop) && defaultValidatorFn(prop),
  }
)`
  flex-grow: 1;
  pointer-events: none;
  background: rgba(46, 170, 220, 0.5);
  height: 4px;
  position: absolute;
  left: ${({ isNested }) => (isNested ? "4px" : 0)};
  right: ${({ isNested }) => (isNested ? "10px" : 0)};
  top: ${({ isTop }) => (isTop ? 0 : "auto")};
  bottom: ${({ isTop }) => (isTop ? "auto" : "-4px")};
`;
const placeholderPosition = (
  dndItemType: string,
  draggingItem: DnDItem,
  underlyingItem: DnDItem,
  isEntering: boolean,
  intersectionInfo?: IntersectionInfoParam,
  enableNested: boolean = false
) => {
  if (draggingItem.type !== dndItemType || underlyingItem.type !== dndItemType)
    return;
  const fromTop = !!intersectionInfo?.fromTop;
  const fromBottom = !fromTop && !!intersectionInfo?.fromBottom;
  const nested = enableNested && !!intersectionInfo?.fromLeft && fromBottom;
  return {
    showTopPlaceholder: isEntering && !nested && fromTop,
    showBottomPlaceholder: isEntering && !nested && fromBottom,
    showNestedPlaceholder: isEntering && nested,
  };
};

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
      const position = placeholderPosition(
        dndItemType,
        draggingItem,
        underlyingItem,
        isEntering,
        intersectionInfo,
        enableNested
      );
      if (!position) return;
      setShowTopPlaceholder(position.showTopPlaceholder);
      setShowBottomPlaceholder(position.showBottomPlaceholder);
      setShowNestedPlaceholder(position.showNestedPlaceholder);
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

export const DropPlaceholder = ({ id, dndItemType }: DnDPlaceholderProps) => {
  const { showTopPlaceholder, showBottomPlaceholder } = useDnDItemPlaceholder(
    id,
    dndItemType
  );
  const show = showTopPlaceholder || showBottomPlaceholder;
  const setRef = useCallback((element?: Element | null) => {
    const parentElement = element?.parentElement;
    if (!parentElement) return;
    parentElement.style.position = "relative";
  }, []);
  return show ? (
    <StyledDropPlaceholder
      isTop={showTopPlaceholder}
      isNested={false}
      ref={setRef}
    />
  ) : null;
};
