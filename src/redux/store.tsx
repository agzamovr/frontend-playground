import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import dndReducer, { Draggables } from "./dndReducer";

export interface Store {
  dndReducer: Draggables;
}

const rootCombinedReducers = {
  dndReducer,
};

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: rootCombinedReducers,
  middleware,
  devTools: true,
});
