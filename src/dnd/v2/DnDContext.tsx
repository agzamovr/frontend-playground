import { useDnDController } from "dnd/v2/useDnDController";
import React, { FunctionComponent, useMemo } from "react";

type DragStartCallback = (draggingId: string) => void;
type DropCallback = (draggingId: string, droppingId: string) => void;
type DropOverCallback = (draggingId: string, droppingId: string) => void;
type DragCallback = (
  draggingId: string,
  underlyingId: string,
  isEntering: boolean
) => void;
type DragOverCallback = (
  draggingId: string,
  underlyingId: string,
  isEntering: boolean
) => void;
type Elements = string[];
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
interface DnDContextType {
  getElements: () => Elements;
  addElement: (id: string) => void;
  removeElement: (id: string) => void;
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
  dragging: (
    draggingId: string,
    underlyingId: string,
    threshold: number
  ) => void;
}
type Store = {
  elements: Elements;
  dragStartObservers: DragStartCallbacks;
  dropObservers: DropCallbacks;
  dropOverObservers: DropOverCallbacks;
  dragObservers: DragCallbacks;
  dragOverObservers: DragOverCallbacks;
};
const createDnDContextValue = (): DnDContextType => {
  const store: Store = {
    elements: [],
    dragStartObservers: {},
    dropObservers: {},
    dropOverObservers: {},
    dragObservers: {},
    dragOverObservers: {},
  };
  let intersection: { id: string; isIntersecting: boolean } = {
    id: "",
    isIntersecting: false,
  };
  let droppingId: string | undefined;
  return {
    getElements: () => [...store.elements],
    removeElement: (id) => {
      store.elements = store.elements.filter((el) => el !== id);
      const { [id]: _s, ...newDragStartObservers } = store.dragStartObservers;
      store.dragStartObservers = newDragStartObservers;
      const { [id]: _e, ...newDragEndObservers } = store.dropObservers;
      store.dropObservers = newDragEndObservers;
      const { [id]: _o, ...newDragObservers } = store.dragObservers;
      store.dragObservers = newDragObservers;
    },
    addElement: (id) => {
      store.elements = [...store.elements, id];
    },
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
            (func) => func === callback
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
            (func) => func === callback
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
            (func) => func === callback
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
            (func) => func === callback
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
            (func) => func === callback
          );
      }),
    dragStart: (id) =>
      store.dragStartObservers[id]?.forEach((callback) => callback(id)),
    drop: (draggingId: string) => {
      if (!droppingId) return;
      store.dropObservers[draggingId]?.forEach(
        (callback) => droppingId && callback(draggingId, droppingId)
      );
      store.dropOverObservers[droppingId]?.forEach(
        (callback) => droppingId && callback(draggingId, droppingId)
      );
    },
    dragging: (draggingId: string, underlyingId: string, threshold: number) => {
      if (
        intersection.id === underlyingId &&
        intersection.isIntersecting &&
        threshold > 0.5
      )
        return;
      if (
        (intersection.id !== underlyingId ||
          (intersection.id === underlyingId && threshold < 0.5)) &&
        intersection.isIntersecting
      ) {
        intersection = { id: "", isIntersecting: false };
        store.dragObservers[draggingId]?.forEach((callback) =>
          callback(draggingId, underlyingId, false)
        );
        if (droppingId)
          store.dragOverObservers[droppingId]?.forEach(
            (callback) => droppingId && callback(draggingId, droppingId, false)
          );
        droppingId = undefined;
      }
      if (
        intersection.id !== underlyingId &&
        !intersection.isIntersecting &&
        threshold > 0.5
      ) {
        intersection = { id: underlyingId, isIntersecting: true };
        droppingId = underlyingId;
        store.dragObservers[draggingId]?.forEach((callback) =>
          callback(draggingId, underlyingId, true)
        );
        store.dragOverObservers[underlyingId]?.forEach((callback) =>
          callback(draggingId, underlyingId, true)
        );
      }
    },
  };
};

export const DnDContext = React.createContext<DnDContextType | null>(null);

const DnDContextInternal: FunctionComponent = (props) => {
  useDnDController();
  return <>{props.children}</>;
};
export const DnDContextProvider: FunctionComponent = (props) => {
  const value = useMemo(() => createDnDContextValue(), []);
  return (
    <DnDContext.Provider value={value}>
      <DnDContextInternal>{props.children}</DnDContextInternal>
    </DnDContext.Provider>
  );
};
