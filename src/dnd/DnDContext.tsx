import React, { FunctionComponent } from "react";
import draggables, {
  ElementOrders,
  Draggables,
  dndActions,
} from "./redux/dndReducer";
import { DropPlaceHolder } from "dnd/DropPlaceholder";
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";

interface DnDcontextProps {
  onDragEnd: (elementOrders: ElementOrders) => void;
}
const initElementsOrder = (elementsCount: number) => {
  const elementsOrder: ElementOrders = [];
  for (let i = 0; i < elementsCount; i++) elementsOrder.push(i);
  return elementsOrder;
};

const createStore = (
  elementsCount: number,
  onDragEnd: DnDcontextProps["onDragEnd"]
) => {
  const preloadedState: Draggables = {
    elementsOrder: initElementsOrder(elementsCount),
    placeholderRect: null,
    draggableOriginalOrder: null,
  };
  const dndEventsMiddleware: Middleware = ({ getState }) => (next) => (
    action
  ) => {
    const returnValue = next(action);
    if (dndActions.dragEnd.type === action.type)
      onDragEnd(getState().elementsOrder);
    return returnValue;
  };
  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    dndEventsMiddleware,
  ];
  return configureStore({
    reducer: draggables,
    middleware,
    preloadedState,
    devTools: true,
  });
};

export const DnDContext: FunctionComponent<DnDcontextProps> = ({
  children,
  onDragEnd,
}) => {
  const elementsCount = React.Children.count(children);
  return (
    <Provider store={createStore(elementsCount, onDragEnd)}>
      {children}
      <DropPlaceHolder />
    </Provider>
  );
};
