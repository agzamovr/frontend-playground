import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";
import { ListItemProp, ListProps } from "dnd/v2/list/DnDList";
import { moveNode } from "dnd/v2/list/treeModifier";
import { useCallback, useContext, useEffect, useState } from "react";
export const DnDListItemType = "list-item";

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
    dndContext.addDraggables(ids, DnDListItemType);
    dndContext.addDropObserver(onDrop, ids);
    return () => {
      ids.forEach((id) => dndContext?.removeDraggable(id));
      dndContext.removeDropObserver(onDrop, ids);
    };
  }, [dndContext, onDrop, items]);
};
