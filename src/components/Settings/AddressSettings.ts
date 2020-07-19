import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import {
  cardinalitySelector,
  fieldsSettingsInitialValues,
  SettingsFormValues,
} from "components/Settings/settingsUtils";

export const addressSettingsValues = (
  composedField: ComposedFieldConfig
): SettingsFormValues => ({
  [composedField.name]: {
    provider: "",
    cardinality: "single",
    ...fieldsSettingsInitialValues(composedField.fields),
  },
});
export const addressSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  cardinalitySelector(composedField),
  {
    component: "select",
    props: {
      name: `${composedField.name}.provider`,
      label: "Provider",
      helperText: "Geo service provider",
    },
    values: [
      { label: "Google Maps", value: "google" },
      { label: "Mapbox", value: "mapbox" },
      { label: "Yandex Maps", value: "yandex" },
    ],
  },
  ...composedSettings(classes, composedField),
];
