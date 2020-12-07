import React, { FunctionComponent } from "react";
import draggables, { ElementOrders, dndActions } from "dnd/v1/redux/dndReducer";
import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./dnd.css";

interface DnDcontextProps {
  onDragEnd: (elementOrders: ElementOrders) => void;
}
const createStore = (onDragEnd: DnDcontextProps["onDragEnd"]) => {
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
    devTools: { name: "DnDContext", maxAge: 10 },
  });
};

export const DnDContext: FunctionComponent<DnDcontextProps> = ({
  children,
  onDragEnd,
}) => <Provider store={createStore(onDragEnd)}>{children}</Provider>;
