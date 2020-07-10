import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import {
  fieldSettingsLabel,
  fieldSettings,
} from "components/Settings/settingsUtils";

export const composedSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  {
    type: "tabs",
    props: {
      value: 0,
      indicatorColor: "primary",
      scrollButtons: "off",
      variant: "scrollable",
      className: classes.tabs,
    },
    tabs: composedField.fields.map((subField) => ({
      tab: {
        label: fieldSettingsLabel(subField),
        className: classes.tab,
      },
      panel: fieldSettings({ classes, field: subField }),
    })),
  },
];