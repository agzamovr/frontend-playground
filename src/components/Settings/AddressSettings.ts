import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import { cardinalitySelector } from "components/Settings/settingsUtils";

export const addressSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  cardinalitySelector(),
  {
    component: "select",
    props: { label: "Provider", helperText: "Geo service provider" },
    values: [
      { label: "Google Maps", value: "google" },
      { label: "Mapbox", value: "mapbox" },
      { label: "Yandex Maps", value: "yandex" },
    ],
  },
  ...composedSettings(classes, composedField),
];
