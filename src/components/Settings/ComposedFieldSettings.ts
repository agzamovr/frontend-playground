import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import {
  fieldSettingsLabel,
  fieldSettings,
  SettingsFormValues,
  fieldsSettingsInitialValues,
} from "components/Settings/settingsUtils";
import { uniOfMeasureSelector } from "components/Settings/uom/unitOfMeasures";
import { cardinalitySelector } from "components/Settings/cardinality/cardinality";
import { datasoruceProvider } from "components/Settings/datasourceProvider/datasourceProvider";

const composedSubFieldSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  {
    component: "tabs",
    name: `${composedField.name}.composedFieldSettings`,
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
      panel: fieldSettings({
        classes,
        namePrefix: `${composedField.name}.`,
        field: subField,
      }),
    })),
  },
];

export const composedFieldSettingsValues = (
  composedField: ComposedFieldConfig
): SettingsFormValues => ({
  [composedField.name]: {
    unitOfMeasure: composedField.unitOfMeasure,
    cardinality: composedField.cardinality,
    datasourceProvider: composedField.datasourceProvider,
    ...fieldsSettingsInitialValues(composedField.fields),
  },
});

export const composedSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => {
  const result: FieldConfig[] = [];
  if (composedField.cardinality !== undefined)
    result.push(cardinalitySelector(composedField));
  if (composedField.unitOfMeasure !== undefined)
    result.push(uniOfMeasureSelector(composedField));
  if (composedField.datasourceProvider !== undefined)
    result.push(datasoruceProvider(composedField));
  return result.concat(composedSubFieldSettings(classes, composedField));
};
