import { FieldConfig } from "components/FieldComponent";
import { TextfieldProps } from "components/TextField/TextField";

export const textFieldSettings = (
  props: TextfieldProps["props"]
): FieldConfig[] => [
  {
    component: "textfield",
    props: {
      label: "Label",
      value: props.label,
    },
  },
  {
    component: "textfield",
    props: { label: "Placeholder", value: props.placeholder },
  },
  {
    component: "textfield",
    props: { label: "Help text", value: props.helperText },
  },
  {
    component: "textfield",
    props: { label: "Tooltip" },
  },
  {
    component: "switch",
    props: { color: "primary" },
    formControlProps: { label: "Required" },
  },
];
