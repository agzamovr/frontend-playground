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
  placeholderRect: GridCellRect | null;
}

const initialState: Draggables = {
  placeholderOrder: null,
  elementsOrder: {},
  placeholderRect: null,
};

export const findKeyByValue = (elementsOrder: OrderRecord, value: string) =>
  Object.keys(elementsOrder).find((key) => elementsOrder[key] === value) || "";

const switchIndexes = (
  elementsOrder: OrderRecord,
  source: string,
  destination: string
): OrderRecord => {
  const destinationIndex = findKeyByValue(elementsOrder, destination);
  return {
    ...elementsOrder,
    [source]: elementsOrder[destinationIndex],
    [destinationIndex]: elementsOrder[source],
  };
};

interface Placeholder {
  order: string;
  placeholderRect: GridCellRect | null;
}

export const { actions: dndActions, reducer: dndReducer } = createSlice({
  initialState,
  name: "grid-board",
  reducers: {
    cleanState: () => initialState,
    resetPlaceholder: (state) => ({
      ...state,
      placeholderOrder: null,
      placeholderRect: null,
    }),
    setPlaceholderOrder: (state, { payload }: PayloadAction<Placeholder>) => ({
      ...state,
      placeholderOrder: payload.order,
      placeholderRect: payload.placeholderRect,
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
        sourceOrder: string;
        destinationOrder: string;
      }>
    ) => ({
      ...state,
      placeholderOrder: findKeyByValue(
        state.elementsOrder,
        payload.destinationOrder
      ),
      elementsOrder: switchIndexes(
        state.elementsOrder,
        payload.sourceOrder,
        payload.destinationOrder
      ),
    }),
  },
});

export default dndReducer;
