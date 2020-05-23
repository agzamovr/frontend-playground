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
  area: number;
  gridColumnStart: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridRow: string;
  gridRowStart: string;
  gridRowEnd: string;
}

export type RectsRecord = Record<number, Rect>;
export interface Draggable {
  order: number;
  rect: Rect;
}
export interface Draggables {
  placeholderOrder: number | null;
  elementsOrder: number[];
  rects: RectsRecord;
}

const initialState: Draggables = {
  placeholderOrder: null,
  elementsOrder: [],
  rects: {},
};

export const { actions: dndActions, reducer: dndReducer } = createSlice({
  initialState,
  name: "grid-board",
  reducers: {
    cleanState: () => initialState,
    setPlaceholderOrder: (
      state,
      { payload }: PayloadAction<number | null>
    ) => ({
      ...state,
      placeholderOrder: payload,
    }),
    setRect: (state, { payload }: PayloadAction<Draggable>) => ({
      ...state,
      rects: { ...state.rects, [payload.order]: payload.rect },
    }),
    setElementsOrder: (
      state,
      {
        payload,
      }: PayloadAction<{
        placeholderOrder: number | null;
        elementsOrder: number[];
      }>
    ) => ({
      ...state,
      placeholderOrder: payload.placeholderOrder,
      elementsOrder: [...payload.elementsOrder],
    }),
  },
});

export default dndReducer;
