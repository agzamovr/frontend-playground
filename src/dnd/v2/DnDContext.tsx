import { useDnDController } from "dnd/v2/useDnDController";
import React, { FunctionComponent, useMemo } from "react";

type DragStartCallback = (draggingId: string) => void;
type DropCallback = (draggingId: string, droppingId: string) => void;
type DragCallback = (
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
type DragCallbacks = {
  [id: string]: DragCallback[];
};
interface DnDContextType {
  getElements: () => Elements;
  addElement: (id: string) => void;
  removeElement: (id: string) => void;
  addDragStartObserver: (callback: DragStartCallback, ids: string[]) => void;
  removeDragStartObserver: (callback: DragStartCallback, ids: string[]) => void;
  addDropObserver: (callback: DropCallback, ids: string[]) => void;
  removeDropObserver: (callback: DropCallback, ids: string[]) => void;
  addDragObserver: (callback: DragCallback, ids: string[]) => void;
  removeDragObserver: (callback: DragCallback, ids: string[]) => void;
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
  dragObservers: DragCallbacks;
};
const createDnDContextValue = (): DnDContextType => {
  const store: Store = {
    elements: [],
    dragStartObservers: {},
    dropObservers: {},
    dragObservers: {},
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
    dragStart: (id) =>
      store.dragStartObservers[id]?.forEach((callback) => callback(id)),
    drop: (draggingId: string) =>
      store.dropObservers[draggingId]?.forEach(
        (callback) => droppingId && callback(draggingId, droppingId)
      ),
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
        droppingId = undefined;
        store.dragObservers[draggingId]?.forEach((callback) =>
          callback(draggingId, underlyingId, false)
        );
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
