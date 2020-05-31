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
}
export interface GridCell {
  gridColumnStart: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridRow: string;
  gridRowStart: string;
  gridRowEnd: string;
}
export type GridCellRect = Rect & GridCell;

export type RectsRecord = Record<string, GridCellRect>;
export type OrderRecord = Record<string, string>;
export interface Draggable {
  order: string;
  rect: GridCellRect;
}
export interface Draggables {
  placeholderOrder: string | null;
  elementsOrder: OrderRecord;
  rects: RectsRecord;
}

const initialState: Draggables = {
  placeholderOrder: null,
  elementsOrder: {},
  rects: {},
};

export const findKeyByValue = (elementsOrder: OrderRecord, value: string) =>
  Object.keys(elementsOrder).find((key) => elementsOrder[key] === value) || "";

const switchIndexes = (
  elementsOrder: OrderRecord,
  index: string,
  order: string
): OrderRecord => {
  const destinationIndex = findKeyByValue(elementsOrder, order);
  return {
    ...elementsOrder,
    [index]: elementsOrder[destinationIndex],
    [destinationIndex]: elementsOrder[index],
  };
};

export const { actions: dndActions, reducer: dndReducer } = createSlice({
  initialState,
  name: "grid-board",
  reducers: {
    cleanState: () => initialState,
    setPlaceholderOrder: (
      state,
      { payload }: PayloadAction<string | null>
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
        placeholderOrder: string | null;
        elementsOrder: OrderRecord;
      }>
    ) => ({
      ...state,
      placeholderOrder: payload.placeholderOrder,
      elementsOrder: { ...payload.elementsOrder },
    }),
    switchElementsOrder: (
      state,
      {
        payload,
      }: PayloadAction<{
        index: string;
        order: string;
      }>
    ) => ({
      ...state,
      placeholderOrder: findKeyByValue(state.elementsOrder, payload.order),
      elementsOrder: switchIndexes(
        state.elementsOrder,
        payload.index,
        payload.order
      ),
    }),
  },
});

export default dndReducer;
