import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import draggables, { Draggables } from "./dndReducer";

export interface Store {
  draggables: Draggables;
}

const rootCombinedReducers = {
  draggables,
};

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: rootCombinedReducers,
  middleware,
  devTools: true,
});
