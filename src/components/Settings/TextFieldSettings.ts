import { FieldConfig, TextFieldConfig } from "components/FieldComponent";
import { SettingsFormValues } from "components/Settings/settingsUtils";
import { uniOfMeasureSelector } from "components/Settings/uom/unitOfMeasures";

export const textFieldSettingsValues = (
  config: TextFieldConfig
): SettingsFormValues => ({
  [config.name]: {
    unitOfMeasure: config.unitOfMeasure,
    label: config.props.label ?? "",
    placeholder: config.props.placeholder ?? "",
    helperText: config.props.helperText ?? "",
    required: config.props.required ?? false,
  },
});

const baseSettings = (namePrefix: string): FieldConfig[] => [
  {
    component: "textfield",
    name: `${namePrefix}.label`,
    props: {
      label: "Label",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.placeholder`,
    props: {
      label: "Placeholder",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.helperText`,
    props: {
      label: "Help text",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.tooltip`,
    props: { label: "Tooltip" },
  },
  {
    component: "switch",
    name: `${namePrefix}.required`,
    props: { color: "primary" },
    formControlProps: { label: "Required" },
  },
];

export const textFieldSettings = (
  field: TextFieldConfig,
  namePrefix: string
): FieldConfig[] => {
  const result: FieldConfig[] = [];
  if (field.unitOfMeasure !== undefined)
    result.push(uniOfMeasureSelector(field));
  return result.concat(baseSettings(`${namePrefix}${field.name}`));
};
