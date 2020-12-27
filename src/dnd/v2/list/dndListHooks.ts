import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";
import { ListItemProp, ListProps } from "dnd/v2/list/DnDList";
import { moveNode } from "dnd/v2/list/treeModifier";
import { useCallback, useContext, useEffect, useState } from "react";
const dndItemType = "list-item";
export const useDnDItemPlaceholder = (id: string) => {
  const dndContext = useContext(DnDContext);
  const [showDividerTop, setShowDividerTop] = useState(false);
  const [showDividerBottom, setShowDividerBottom] = useState(false);
  const [showDividerChild, setShowDividerChild] = useState(false);
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
      const asChild = !!intersectionInfo?.fromLeft && fromBottom;
      setShowDividerTop(isEntering && fromTop);
      setShowDividerBottom(isEntering && !asChild && fromBottom);
      setShowDividerChild(isEntering && asChild);
    },
    []
  );
  const onDropOver = useCallback(() => {
    setShowDividerTop(false);
    setShowDividerBottom(false);
    setShowDividerChild(false);
  }, []);
  useEffect(() => {
    dndContext?.addDragOverObserver(onDragOver, [id]);
    dndContext?.addDropOverObserver(onDropOver, [id]);
    return () => {
      dndContext?.removeDragOverObserver(onDragOver, [id]);
      dndContext?.removeDropOverObserver(onDropOver, [id]);
    };
  }, [dndContext, onDragOver, onDropOver, id]);

  return { showDividerTop, showDividerBottom, showDividerChild };
};

const getAllNodeIds = (items: ListItemProp[]) => {
  const stack: ListItemProp[] = [...items];
  const ids: string[] = [];
  while (stack.length > 0) {
    const item = stack.pop();
    if (!item?.blockId) continue;
    ids.push(item.blockId);
    if (item.subList?.items.length) stack.push(...item.subList.items);
  }
  return ids;
};

export const useRegisterDraggables = (listProps: ListProps) => {
  const dndContext = useContext(DnDContext);
  const [dumbTrigger, setDumbTrigger] = useState(false);
  const { items } = listProps;
  const onDrop = useCallback(
    (
      draggable: DnDItem,
      droppable: DnDItem,
      intersectionInfo: IntersectionInfoParam
    ) => {
      if (draggable.id === droppable.id || !droppable) return;
      const asChild = intersectionInfo.fromLeft && intersectionInfo.fromBottom;
      const before = asChild || intersectionInfo.fromTop;
      const moved = moveNode(
        listProps,
        draggable.id,
        droppable.id,
        before,
        asChild
      );
      if (moved) setDumbTrigger(!dumbTrigger);
    },
    [dumbTrigger, listProps]
  );
  useEffect(() => {
    const ids = getAllNodeIds(items);
    dndContext.addDraggables(ids, dndItemType);
    dndContext.addDropObserver(onDrop, ids);
    return () => {
      ids.forEach((id) => dndContext?.removeDraggable(id));
      dndContext.removeDropObserver(onDrop, ids);
    };
  }, [dndContext, onDrop, items]);
};
