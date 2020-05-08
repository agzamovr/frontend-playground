import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Rect {
  height: number;
  width: number;
  x: number;
  y: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export type RectsRecord = Record<string, Rect>;

export interface Draggables {
  rects: RectsRecord;
}

const initialState: Draggables = { rects: {} };

export const { actions: dndActions, reducer: dndReducer } = createSlice({
  initialState,
  name: "grid-board",
  reducers: {
    cleanState: () => initialState,
    setRect: (
      state,
      { payload }: PayloadAction<{ order: string; rect: Rect }>
    ) => ({
      ...state,
      rects: { ...state.rects, [payload.order]: payload.rect },
    }),
  },
});

export default dndReducer;
