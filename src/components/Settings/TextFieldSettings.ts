import { FieldConfig } from "components/FieldComponent";
import { TextfieldProps } from "components/TextField/TextField";

export const textFieldSettings = (
  props: TextfieldProps["props"]
): FieldConfig[] => [
  {
    type: "textfield",
    props: {
      label: "Label",
      value: props.label,
    },
  },
  {
    type: "textfield",
    props: { label: "Placeholder", value: props.placeholder },
  },
  {
    type: "textfield",
    props: { label: "Help text", value: props.helperText },
  },
  {
    type: "textfield",
    props: { label: "Tooltip" },
  },
  {
    type: "switch",
    props: { color: "primary" },
    formControlProps: { label: "Required" },
  },
];
