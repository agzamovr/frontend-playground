import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardConfig, DemoCardList } from "cards/demo/DemoCards";
import { DemoCardKeys } from "cards/demo/DemoCards";

export interface Cards {
  selectedCards: DemoCardKeys[];
  cards: CardConfig[];
}

const initialState: Cards = {
  selectedCards: [],
  cards: [],
};

const mapSelectedCards = (selectedCards: DemoCardKeys[]) =>
  selectedCards.map((key) => ({ ...DemoCardList[key] }));

export const {
  actions: templateActions,
  reducer: templateReducer,
} = createSlice({
  initialState,
  name: "cards",
  reducers: {
    cleanState: () => initialState,
    addCard: (state, { payload }: PayloadAction<DemoCardKeys>) => ({
      ...state,
      selectedCards: [...state.selectedCards, payload],
    }),
    removeCard: (state, { payload }: PayloadAction<DemoCardKeys>) => ({
      ...state,
      selectedCards: state.selectedCards.filter((card) => card !== payload),
    }),
    addSelectedCards: (state) => ({
      ...state,
      selectedCards: initialState.selectedCards,
      cards: [...state.cards, ...mapSelectedCards(state.selectedCards)],
    }),
  },
});

export default templateReducer;
