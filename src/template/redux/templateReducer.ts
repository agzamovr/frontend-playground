import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardConfig, DemoCardList } from "cards/demo/DemoCards";
import { DemoCardKeys } from "cards/demo/DemoCards";
import {
  SettingsFormValues,
  TextFieldFormValues,
  DateTimeFieldFormValues,
} from "components/Settings/settingsUtils";
import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";
import {
  UnitOfMeasureField,
  UnitOfMeasureValues,
} from "components/Settings/uom/unitOfMeasures";
import { CardinalityType } from "components/Settings/cardinality/cardinality";
import { DatasourceProviderField } from "components/Settings/datasourceProvider/datasourceProvider";

type SelectedCard = { order: number; demoCard: DemoCardKeys };
type DrawerType = null | "cards" | "settings";
export interface Cards {
  drawer: DrawerType;
  cardConfigIndex: number | null;
  cardConfig: CardConfig | null;
  selectedCards: SelectedCard[];
  cards: CardConfig[];
}

const initialState: Cards = {
  drawer: null,
  cardConfigIndex: null,
  cardConfig: null,
  selectedCards: [],
  cards: [],
};

const mapSelectedCards = (selectedCards: SelectedCard[]) =>
  [...selectedCards]
    .sort((card1, card2) => (card1.order < card2.order ? -1 : 1))
    .map((card) => ({ ...DemoCardList[card.demoCard] }));

const applyComposedFieldSettings = (
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

const dateTimeFieldSettingsProps = ({
  label,
  placeholder,
  helperText,
  ampm,
  disablePast,
  disableFuture,
  required,
}: DateTimeFieldFormValues) => ({
  label,
  placeholder,
  helperText,
  ampm,
  disablePast,
  disableFuture,
  required,
});

const applyFieldSettings = (
  fields: FieldConfig[],
  settings: SettingsFormValues
): FieldConfig[] =>
  fields.map((field) =>
    field.component === "composed"
      ? applyComposedFieldSettings(
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
      : field.component === "datetime"
      ? {
          ...field,
          props: {
            ...field.props,
            ...dateTimeFieldSettingsProps(
              settings[field.name] as DateTimeFieldFormValues
            ),
          },
        }
      : field
  );

const reorderCardFields = (fieldsOrder: string[], fields: FieldConfig[]) =>
  fieldsOrder.map(
    (name) => fields.find((field) => field.name === name) as FieldConfig
  );

const applyCardSettings = (
  cards: CardConfig[],
  cardIndex: number,
  settings: SettingsFormValues,
  fieldsOrder: string[]
) =>
  cards.map((card, index) =>
    index !== cardIndex
      ? card
      : {
          ...card,
          fields: reorderCardFields(
            fieldsOrder,
            applyFieldSettings(card.fields, settings)
          ),
        }
  );

export const {
  actions: templateActions,
  reducer: templateReducer,
} = createSlice({
  initialState,
  name: "cards",
  reducers: {
    cleanState: () => initialState,
    setDrawer: (state, { payload }: PayloadAction<DrawerType>) => ({
      ...state,
      drawer: payload,
    }),
    openCardConfig: (
      state,
      { payload }: PayloadAction<[number, CardConfig]>
    ) => ({
      ...state,
      drawer: "settings",
      cardConfigIndex: payload[0],
      cardConfig: payload[1],
    }),
    openAddNewCardDrawer: (state) => ({
      ...state,
      drawer: "cards",
    }),
    closeDrawer: (state) => ({
      ...state,
      drawer: null,
      cardConfigIndex: null,
      cardConfig: null,
    }),
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
      drawer: null,
      selectedCards: initialState.selectedCards,
      cards: [...state.cards, ...mapSelectedCards(state.selectedCards)],
    }),
    removeCard: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      cards: state.cards.filter((_, i) => i !== payload),
    }),
    applyCardSettings: (
      state,
      { payload }: PayloadAction<[SettingsFormValues, string[]]>
    ) => ({
      ...state,
      cards: applyCardSettings(
        state.cards,
        state.cardConfigIndex ?? -1,
        payload[0],
        payload[1]
      ),
    }),
  },
});

export default templateReducer;
