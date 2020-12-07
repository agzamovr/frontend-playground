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
export type ElementOrders = string[];
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
  value: string
): number => elementsOrder.findIndex((element) => element === value);

const swapElementsByIndex = (
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
    addDraggable: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      elementsOrder: [...state.elementsOrder, payload],
    }),
    dragStart: (state, { payload }: PayloadAction<Placeholder>) => ({
      ...state,
      placeholderOrder: payload.order,
      placeholderRect: payload.placeholderRect,
    }),
    switchElementsOrder: (state, { payload }: PayloadAction<SwitchOrder>) => ({
      ...state,
      placeholderOrder: payload.destinationOrder,
      elementsOrder: swapElementsByIndex(
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
