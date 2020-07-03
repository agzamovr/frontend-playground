import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardConfig, DemoCardList } from "cards/demo/DemoCards";
import { DemoCardKeys } from "cards/demo/DemoCards";

type SelectedCard = { order: number; demoCard: DemoCardKeys };
export interface Cards {
  selectedCards: SelectedCard[];
  cards: CardConfig[];
}

const initialState: Cards = {
  selectedCards: [],
  cards: [],
};

const mapSelectedCards = (selectedCards: SelectedCard[]) =>
  [...selectedCards]
    .sort((card1, card2) => (card1.order < card2.order ? -1 : 1))
    .map((card) => ({ ...DemoCardList[card.demoCard] }));

export const {
  actions: templateActions,
  reducer: templateReducer,
} = createSlice({
  initialState,
  name: "cards",
  reducers: {
    cleanState: () => initialState,
    selectDemoCard: (state, { payload }: PayloadAction<SelectedCard>) => ({
      ...state,
      selectedCards: [...state.selectedCards, payload],
    }),
    unselectDemoCard: (state, { payload }: PayloadAction<DemoCardKeys>) => ({
      ...state,
      selectedCards: state.selectedCards.filter(
        (card) => card.demoCard !== payload
      ),
    }),
    addSelectedCards: (state) => ({
      ...state,
      selectedCards: initialState.selectedCards,
      cards: [...state.cards, ...mapSelectedCards(state.selectedCards)],
    }),
    removeCard: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      cards: state.cards.filter((_, i) => i !== payload),
    }),
  },
});

export default templateReducer;
