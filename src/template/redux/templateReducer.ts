import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardConfig, DemoCardList } from "cards/demo/DemoCards";
import { DemoCardKeys } from "cards/demo/DemoCards";
import {
  SettingsFormValues,
  TextFieldFormValues,
} from "components/Settings/settingsUtils";
import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";
import {
  UnitOfMeasureField,
  UnitOfMeasureValues,
} from "components/Settings/uom/unitOfMeasures";
import { CardinalityType } from "components/Settings/cardinality/cardinality";
import { DatasourceProviderField } from "components/Settings/datasourceProvider/datasourceProvider";

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

const applyComplexFieldSettings = (
  field: ComposedFieldConfig,
  settings: SettingsFormValues
): ComposedFieldConfig => ({
  ...field,
  unitOfMeasure: settings.unitOfMeasure as UnitOfMeasureField,
  cardinality: settings.cardinality as CardinalityType,
  datasourceProvider: settings.datasourceProvider as DatasourceProviderField,
  fields: applyFieldSettings(field.fields, settings as SettingsFormValues),
});

const textFieldSettingsProps = ({
  label,
  placeholder,
  helperText,
  required,
}: TextFieldFormValues) => ({
  label,
  placeholder,
  helperText,
  required,
});

const applyFieldSettings = (
  fields: FieldConfig[],
  settings: SettingsFormValues
): FieldConfig[] =>
  fields.map((field) =>
    field.component === "composed"
      ? applyComplexFieldSettings(
          field,
          settings[field.name] as SettingsFormValues
        )
      : field.component === "textfield"
      ? {
          ...field,
          unitOfMeasure: (settings[field.name] as UnitOfMeasureValues)
            .unitOfMeasure,
          props: {
            ...field.props,
            ...textFieldSettingsProps(
              settings[field.name] as TextFieldFormValues
            ),
          },
        }
      : field
  );

const applyCardSettings = (
  cards: CardConfig[],
  index: number,
  settings: SettingsFormValues
) => [
  ...cards.slice(0, index),
  {
    ...cards[index],
    fields: applyFieldSettings(cards[index].fields, settings),
  },
  ...cards.slice(index + 1),
];

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
    applyCardSettings: (
      state,
      { payload }: PayloadAction<[number, SettingsFormValues]>
    ) => ({
      ...state,
      cards: applyCardSettings(state.cards, payload[0], payload[1]),
    }),
  },
});

export default templateReducer;
