import { FieldConfig, TextFieldConfig } from "components/FieldComponent";

export const textFieldSettingsValues = (config: TextFieldConfig) => ({
  [config.name]: {
    label: config.props.label ?? "",
    placeholder: config.props.placeholder ?? "",
    helperText: config.props.helperText ?? "",
    required: false,
  },
});

export const textFieldSettings = (namePrefix: string): FieldConfig[] => [
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
