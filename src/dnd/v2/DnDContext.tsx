import { IntersectionInfo } from "dnd/v2/dndGeometry";
import { useDnDController } from "dnd/v2/useDnDController";
import React, { FunctionComponent } from "react";
export type IntersectionInfoParam = Omit<IntersectionInfo, "blockId">;
export type DnDItem = {
  id: string;
  type: string;
};
type DragStartCallback = (draggingId: string) => void;
type DropCallback = (
  draggable: DnDItem,
  droppingId: DnDItem,
  intersectionInfo: IntersectionInfoParam
) => void;
type DropOverCallback = (
  draggable: DnDItem,
  droppingId: DnDItem,
  intersectionInfo: IntersectionInfoParam
) => void;
type DragCallback = (
  draggable: DnDItem,
  underlyingId: DnDItem,
  isEntering: boolean,
  intersectionInfo?: IntersectionInfoParam
) => void;
type DragOverCallback = (
  draggable: DnDItem,
  underlyingId: DnDItem,
  isEntering: boolean,
  intersectionInfo?: IntersectionInfoParam
) => void;
type Draggables = { [x: string]: DnDItem };
type DragStartCallbacks = {
  [id: string]: DragStartCallback[];
};
type DropCallbacks = {
  [id: string]: DropCallback[];
};
type DropOverCallbacks = {
  [id: string]: DropOverCallback[];
};
type DragCallbacks = {
  [id: string]: DragCallback[];
};
type DragOverCallbacks = {
  [id: string]: DragOverCallback[];
};
export interface DnDContextType {
  getDraggablesIds: () => string[];
  addDraggable: (dndItem: DnDItem) => void;
  addDraggables: (ids: string[], type: string) => void;
  removeDraggable: (id: string) => void;
  addDragStartObserver: (callback: DragStartCallback, ids: string[]) => void;
  removeDragStartObserver: (callback: DragStartCallback, ids: string[]) => void;
  addDropObserver: (callback: DropCallback, ids: string[]) => void;
  removeDropObserver: (callback: DropCallback, ids: string[]) => void;
  addDropOverObserver: (callback: DropOverCallback, ids: string[]) => void;
  removeDropOverObserver: (callback: DropOverCallback, ids: string[]) => void;
  addDragObserver: (callback: DragCallback, ids: string[]) => void;
  removeDragObserver: (callback: DragCallback, ids: string[]) => void;
  addDragOverObserver: (callback: DragCallback, ids: string[]) => void;
  removeDragOverObserver: (callback: DragCallback, ids: string[]) => void;
  dragStart: (id: string) => void;
  drop: (id: string) => void;
  dragging: (draggingId: string, intersections: IntersectionInfo[]) => void;
}
type Store = {
  draggables: Draggables;
  dragStartObservers: DragStartCallbacks;
  dropObservers: DropCallbacks;
  dropOverObservers: DropOverCallbacks;
  dragObservers: DragCallbacks;
  dragOverObservers: DragOverCallbacks;
};
type Droppables = Record<string, IntersectionInfo>;
const compareIntersections = (
  a: IntersectionInfoParam,
  b: IntersectionInfoParam
) =>
  a &&
  b &&
  a.fromLeft === b.fromLeft &&
  a.fromTop === b.fromTop &&
  a.fromRight === b.fromRight &&
  a.fromBottom === b.fromBottom;
const createDnDContextValue = (): DnDContextType => {
  const store: Store = {
    draggables: {},
    dragStartObservers: {},
    dropObservers: {},
    dropOverObservers: {},
    dragObservers: {},
    dragOverObservers: {},
  };
  const prevDroppings: Droppables = {};
  return {
    getDraggablesIds: () => Object.keys(store.draggables),
    removeDraggable: (id) => {
      const { [id]: _d, ...newDraggables } = store.draggables;
      store.draggables = newDraggables;
      const { [id]: _s, ...newDragStartObservers } = store.dragStartObservers;
      store.dragStartObservers = newDragStartObservers;
      const { [id]: _e, ...newDragEndObservers } = store.dropObservers;
      store.dropObservers = newDragEndObservers;
      const { [id]: _o, ...newDragObservers } = store.dragObservers;
      store.dragObservers = newDragObservers;
    },
    addDraggable: (draggable) => {
      store.draggables[draggable.id] = draggable;
    },
    addDraggables: (ids: string[], type: string) =>
      ids
        .map((id) => ({
          id,
          type,
        }))
        .forEach((dndItem) => (store.draggables[dndItem.id] = dndItem)),
    addDragStartObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dragStartObservers.hasOwnProperty(id)
          ? (store.dragStartObservers[id] = [
              ...store.dragStartObservers[id],
              callback,
            ])
          : (store.dragStartObservers[id] = [callback]);
      }),
    removeDragStartObserver: (callback, ids) =>
      ids.forEach((id) => {
        if (store.dragStartObservers.hasOwnProperty(id))
          store.dragStartObservers[id] = store.dragStartObservers[id].filter(
            (func) => func !== callback
          );
      }),
    addDropObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dropObservers.hasOwnProperty(id)
          ? (store.dropObservers[id] = [...store.dropObservers[id], callback])
          : (store.dropObservers[id] = [callback]);
      }),
    removeDropObserver: (callback, ids) =>
      ids.forEach((id) => {
        if (store.dropObservers.hasOwnProperty(id))
          store.dropObservers[id] = store.dropObservers[id].filter(
            (func) => func !== callback
          );
      }),
    addDropOverObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dropOverObservers.hasOwnProperty(id)
          ? (store.dropOverObservers[id] = [
              ...store.dropOverObservers[id],
              callback,
            ])
          : (store.dropOverObservers[id] = [callback]);
      }),
    removeDropOverObserver: (callback, ids) =>
      ids.forEach((id) => {
        if (store.dropOverObservers.hasOwnProperty(id))
          store.dropOverObservers[id] = store.dropOverObservers[id].filter(
            (func) => func !== callback
          );
      }),
    addDragObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dragObservers.hasOwnProperty(id)
          ? (store.dragObservers[id] = [...store.dragObservers[id], callback])
          : (store.dragObservers[id] = [callback]);
      }),
    removeDragObserver: (callback, ids) =>
      ids.forEach((id) => {
        if (store.dragObservers.hasOwnProperty(id))
          store.dragObservers[id] = store.dragObservers[id].filter(
            (func) => func !== callback
          );
      }),
    addDragOverObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dragOverObservers.hasOwnProperty(id)
          ? (store.dragOverObservers[id] = [
              ...store.dragOverObservers[id],
              callback,
            ])
          : (store.dragOverObservers[id] = [callback]);
      }),
    removeDragOverObserver: (callback, ids) =>
      ids.forEach((id) => {
        if (store.dragOverObservers.hasOwnProperty(id))
          store.dragOverObservers[id] = store.dragOverObservers[id].filter(
            (func) => func !== callback
          );
      }),
    dragStart: (id) =>
      store.dragStartObservers[id]?.forEach((callback) => callback(id)),
    drop: (draggingId: string) => {
      Object.entries(prevDroppings).forEach(
        ([droppingId, intersectionInfo]) => {
          const draggable = store.draggables[draggingId];
          const droppable = store.draggables[droppingId];
          store.dropObservers[draggingId]?.forEach(
            (callback) =>
              droppingId && callback(draggable, droppable, intersectionInfo)
          );
          store.dropOverObservers[droppingId]?.forEach(
            (callback) =>
              droppingId && callback(draggable, droppable, intersectionInfo)
          );
        }
      );
    },
    dragging: (draggingId, intersections) => {
      const draggable = store.draggables[draggingId];
      const currentDroppings = intersections.reduce(
        (agg: Droppables, is) => Object.assign(agg, { [is.blockId]: is }),
        {}
      );
      Object.keys(prevDroppings)
        .filter(
          (droppingId) =>
            !currentDroppings.hasOwnProperty(droppingId) ||
            currentDroppings[droppingId].intersectionRatio < 0.5
        )
        .forEach((droppingId) => {
          const underlyingItem = store.draggables[droppingId];
          store.dragObservers[draggingId]?.forEach((callback) =>
            callback(draggable, underlyingItem, false)
          );
          const droppable = store.draggables[droppingId];
          store.dragOverObservers[droppingId]?.forEach(
            (callback) => droppingId && callback(draggable, droppable, false)
          );
          delete prevDroppings[droppingId];
        });

      const droppables = Object.entries(currentDroppings)
        .filter(
          ([, intersectionInfo]) => intersectionInfo.intersectionRatio >= 0.5
        )
        .reduce((agg: Droppables, [droppingId, intersectionInfo]) => {
          const { type } = store.draggables[droppingId];
          const droppable = agg[type];
          if (
            !droppable ||
            droppable.intersectionRatio < intersectionInfo.intersectionRatio
          )
            agg[type] = intersectionInfo;
          return agg;
        }, {});
      Object.values(droppables).forEach((intersectionInfo) => {
        const droppingId = intersectionInfo.blockId;
        if (compareIntersections(prevDroppings[droppingId], intersectionInfo))
          return;
        prevDroppings[droppingId] = intersectionInfo;
        const underlyingItem = store.draggables[intersectionInfo.blockId];
        store.dragObservers[draggingId]?.forEach((callback) =>
          callback(draggable, underlyingItem, true, intersectionInfo)
        );
        store.dragOverObservers[droppingId]?.forEach((callback) =>
          callback(draggable, underlyingItem, true, intersectionInfo)
        );
      });
    },
  };
};
const contextValue = createDnDContextValue();
export const DnDContext = React.createContext<DnDContextType>(contextValue);

const DnDContextInternal: FunctionComponent = (props) => {
  useDnDController();
  return <>{props.children}</>;
};
export const DnDContextProvider: FunctionComponent = (props) => (
  <DnDContext.Provider value={contextValue}>
    <DnDContextInternal>{props.children}</DnDContextInternal>
  </DnDContext.Provider>
);
