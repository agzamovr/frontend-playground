import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import { cardinalitySelector } from "components/Settings/settingsUtils";

export const contactSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  cardinalitySelector(),
  ...composedSettings(classes, composedField),
];
