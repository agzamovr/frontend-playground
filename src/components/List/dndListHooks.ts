import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";
import { ListItemProps, ListProps } from "components/List/List";
import { findParentItem, moveNode } from "components/List/treeModifier";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-final-form";

export const DnDListItemType = "list-item";

const getAllNodeIds = (items: ListItemProps[]) => {
  const stack = [...items];
  const ids: string[] = [];
  while (stack.length > 0) {
    const item = stack.pop();
    if (!item?.blockId) continue;
    ids.push(item.blockId);
    if (item.subList?.items.length) stack.push(...item.subList.items);
  }
  return ids;
};

const extractName = (namePrefix: string, fullName: string) => {
  const index = fullName.lastIndexOf(".", fullName.length - 7) + 1;
  const name = fullName.substring(index, fullName.length - 6);
  return namePrefix + name;
};

const getNewNames = (namePrefix: string, items?: ListItemProps[]) => {
  if (!items) return {};
  let oldNewNameMapping: Record<string, string> = {};
  for (let i in items) {
    const item = items[i];
    const newName = extractName(`${namePrefix}.items[${i}].`, item.name);
    const oldName = item.name;
    item.name = newName + ".label";
    oldNewNameMapping[oldName] = newName + ".label";
    oldNewNameMapping = Object.assign(
      oldNewNameMapping,
      getNewNames(newName, item?.subList?.items)
    );
  }
  return oldNewNameMapping;
};
const mutateFormValues = (parentItem?: ListItemProps) => {
  let namePrefix = parentItem?.name;
  let index = namePrefix?.lastIndexOf(".");
  namePrefix = namePrefix?.substring(0, index);
  if (parentItem?.subList && namePrefix) {
    return getNewNames(namePrefix, parentItem.subList.items);
  }
};

export const useRegisterDraggables = (listProps: ListProps) => {
  const dndContext = useContext(DnDContext);
  const [dumbTrigger, setDumbTrigger] = useState(false);
  const { items } = listProps;
  const form = useForm();
  const onDrop = useCallback(
    (
      draggable: DnDItem,
      droppable: DnDItem,
      intersectionInfo: IntersectionInfoParam
    ) => {
      if (draggable.id === droppable.id || !droppable) return;
      const asChild = intersectionInfo.fromLeft && intersectionInfo.fromBottom;
      const before = asChild || intersectionInfo.fromTop;
      const oldParentItem = findParentItem(draggable.id, listProps);
      const moved = moveNode(
        listProps,
        draggable.id,
        droppable.id,
        before,
        asChild
      );
      if (moved) {
        const newParentItem = findParentItem(draggable.id, listProps);
        const fieldNames1 = mutateFormValues(oldParentItem);
        const fieldNames2 = mutateFormValues(newParentItem);
        const fieldNames = Object.assign(fieldNames1, fieldNames2);
        form.mutators.dndMutator(fieldNames, form);
        setDumbTrigger(!dumbTrigger);
      }
    },
    [dumbTrigger, listProps, form]
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
