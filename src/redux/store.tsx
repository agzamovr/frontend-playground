import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import template, { Cards } from "template/redux/templateReducer";

export interface Store {
  template: Cards;
}

const rootCombinedReducers = {
  template,
};

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: rootCombinedReducers,
  middleware,
  devTools: true,
});
