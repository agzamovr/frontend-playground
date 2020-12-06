import { useDnDController } from "dnd/v2/useDnDController";
import React, { FunctionComponent, useMemo } from "react";

type Callback = (id: string) => void;
type DragCallback = (
  draggingId: string,
  underlyingId: string,
  isEntering: boolean
) => void;
type Elements = string[];
type Callbacks = {
  [id: string]: Callback[];
};
interface DnDContextType {
  getElements: () => Elements;
  addElement: (id: string) => void;
  removeElement: (id: string) => void;
  addDragStartObserver: (callback: Callback, ids: string[]) => void;
  addDragEndObserver: (callback: Callback, ids: string[]) => void;
  addDragObserver: (callback: DragCallback, ids: string[]) => void;
  dragStart: (id: string) => void;
  dragEnd: (id: string) => void;
  dragging: (
    draggingId: string,
    underlyingId: string,
    threshold: number
  ) => void;
}
type Store = {
  elements: Elements;
  dragStartObservers: Callbacks;
  dragEndObservers: Callbacks;
  dragObservers: { [id: string]: DragCallback[] };
};
const createDnDContextValue = (): DnDContextType => {
  const store: Store = {
    elements: [],
    dragStartObservers: {},
    dragEndObservers: {},
    dragObservers: {},
  };
  let intersection: { id: string; isIntersecting: boolean } = {
    id: "",
    isIntersecting: false,
  };
  return {
    getElements: () => [...store.elements],
    removeElement: (id) => {
      store.elements = store.elements.filter((el) => el !== id);
      const { [id]: _s, ...newDragStartObservers } = store.dragStartObservers;
      store.dragStartObservers = newDragStartObservers;
      const { [id]: _e, ...newDragEndObservers } = store.dragEndObservers;
      store.dragEndObservers = newDragEndObservers;
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
    addDragEndObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dragEndObservers.hasOwnProperty(id)
          ? (store.dragEndObservers[id] = [
              ...store.dragEndObservers[id],
              callback,
            ])
          : (store.dragEndObservers[id] = [callback]);
      }),
    addDragObserver: (callback, ids) =>
      ids.forEach((id) => {
        store.dragObservers.hasOwnProperty(id)
          ? (store.dragObservers[id] = [...store.dragObservers[id], callback])
          : (store.dragObservers[id] = [callback]);
      }),
    dragStart: (id) =>
      store.dragStartObservers[id]?.forEach((callback) => callback(id)),
    dragEnd: (id) =>
      store.dragEndObservers[id]?.forEach((callback) => callback(id)),
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
      }
      if (
        intersection.id !== underlyingId &&
        !intersection.isIntersecting &&
        threshold > 0.5
      ) {
        intersection = { id: underlyingId, isIntersecting: true };
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
