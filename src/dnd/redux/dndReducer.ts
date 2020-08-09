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
  order: number;
  gridColumnStart: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridRow: string;
  gridRowStart: string;
  gridRowEnd: string;
}
export type GridCellRect = Rect & GridCell;

export type RectsRecord = GridCellRect[];
export type ElementOrders = number[];
export interface Draggables {
  placeholderOrder?: number;
  elementsOrder: ElementOrders;
  placeholderRect: GridCellRect | null;
}

const initialState: Draggables = {
  elementsOrder: [],
  placeholderRect: null,
};

export const findKeyByValue = (
  elementsOrder: ElementOrders,
  value: number
): number => elementsOrder.findIndex((element) => element === value);

const switchIndexes = (
  elementsOrder: ElementOrders,
  source: number,
  destination: number
): ElementOrders =>
  elementsOrder.map((element, index) =>
    index === source
      ? elementsOrder[destination]
      : index === destination
      ? elementsOrder[source]
      : element
  );
interface Placeholder {
  order: number;
  placeholderRect: GridCellRect | null;
}
interface SwitchOrder {
  sourceOrder: number;
  destinationOrder: number;
}

export const { actions: dndActions, reducer: dndReducer } = createSlice({
  initialState,
  name: "dragAndDropSlice",
  reducers: {
    dragStart: (state, { payload }: PayloadAction<Placeholder>) => ({
      ...state,
      placeholderOrder: payload.order,
      placeholderRect: payload.placeholderRect,
    }),
    switchElementsOrder: (state, { payload }: PayloadAction<SwitchOrder>) => ({
      ...state,
      placeholderOrder: payload.destinationOrder,
      elementsOrder: switchIndexes(
        state.elementsOrder,
        payload.sourceOrder,
        payload.destinationOrder
      ),
    }),
    dragEnd: (state) => ({
      ...state,
      placeholderOrder: undefined,
      placeholderRect: null,
    }),
  },
});

export default dndReducer;
