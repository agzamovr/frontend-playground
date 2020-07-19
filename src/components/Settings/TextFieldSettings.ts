import { FieldConfig } from "components/FieldComponent";
import { TextfieldProps } from "components/TextField/TextField";

export const textFieldSettingsValues = (props: TextfieldProps["props"]) => ({
  [props.name]: {
    label: props.label ?? "",
    placeholder: props.placeholder ?? "",
    helperText: props.helperText ?? "",
    required: false,
  },
});

export const textFieldSettings = (namePrefix: string): FieldConfig[] => [
  {
    component: "textfield",
    props: {
      name: `${namePrefix}.label`,
      label: "Label",
    },
  },
  {
    component: "textfield",
    props: {
      name: `${namePrefix}.placeholder`,
      label: "Placeholder",
    },
  },
  {
    component: "textfield",
    props: {
      name: `${namePrefix}.helperText`,
      label: "Help text",
    },
  },
  {
    component: "textfield",
    props: { name: `${namePrefix}.tooltip`, label: "Tooltip" },
  },
  {
    component: "switch",
    props: { name: `${namePrefix}.required`, color: "primary" },
    formControlProps: { label: "Required" },
  },
];
