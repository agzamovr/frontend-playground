import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import {
  cardinalitySelector,
  fieldsSettingsInitialValues,
  SettingsFormValues,
} from "components/Settings/settingsUtils";

export const contactSettingsValues = (
  composedField: ComposedFieldConfig
): SettingsFormValues => ({
  [composedField.name]: {
    cardinality: "single",
    ...fieldsSettingsInitialValues(composedField.fields),
  },
});

export const contactSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  cardinalitySelector(composedField),
  ...composedSettings(classes, composedField),
];
