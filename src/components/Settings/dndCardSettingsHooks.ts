import { useCallback, useState, useContext, useEffect } from "react";
import { CardConfig } from "cards/demo/DemoCards";
import { v4 as uuidv4 } from "uuid";
import { DnDContext, DnDItem, IntersectionInfoParam } from "dnd/v2/DnDContext";

export const DnDCardSettingType = "card-settings";

export const useRegisterDraggables = (card: CardConfig) => {
  const [fields, setFields] = useState(() =>
    card.fields.map((field) => ({ blockId: uuidv4(), field }))
  );
  const ids = fields.map((field) => field.blockId);

  const dndContext = useContext(DnDContext);
  const onDrop = useCallback(
    (
      draggable: DnDItem,
      droppable: DnDItem,
      intersectionInfo: IntersectionInfoParam
    ) => {
      if (draggable.id === droppable.id || !droppable) return;
      const temp = [...fields];
      const indexFrom = temp.findIndex((item) => item.blockId === draggable.id);
      const indexTo = temp.findIndex((item) => item.blockId === droppable.id);
      const { fromTop, fromBottom } = intersectionInfo;
      const postionChanged =
        (fromTop && indexFrom !== indexTo - 1) ||
        (fromBottom && indexFrom - 1 !== indexTo);
      if (!postionChanged) return;
      const item = temp.splice(indexFrom, 1);
      temp.splice(indexTo, 0, ...item);
      setFields(temp);
    },
    [fields]
  );

  useEffect(() => {
    dndContext.addDraggables(ids, DnDCardSettingType);
    dndContext.addDropObserver(onDrop, ids);
    return () => {
      ids.forEach((id) => dndContext?.removeDraggable(id));
      dndContext.removeDropObserver(onDrop, ids);
    };
  }, [dndContext, onDrop, ids]);

  return fields;
};
