import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import draggables, { Draggables } from "../dnd/redux/dndReducer";
import template, { Cards } from "template/redux/templateReducer";

export interface Store {
  draggables: Draggables;
  template: Cards;
}

const rootCombinedReducers = {
  draggables,
  template,
};

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: rootCombinedReducers,
  middleware,
  devTools: true,
});
