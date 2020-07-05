import { FieldConfig } from "components/FieldComponent";
import { TextfieldProps } from "components/TextField/TextField";

export const textFieldSettings = (
  props: TextfieldProps["props"]
): FieldConfig[] => [
  {
    name: "textfield",
    props: {
      label: "Label",
      defaultValue: props.label,
    },
  },
  {
    name: "textfield",
    props: { label: "Placeholder", defaultValue: props.placeholder },
  },
  {
    name: "textfield",
    props: { label: "Tooltip" },
  },
  {
    name: "switch",
    props: { color: "primary" },
    formControlProps: { label: "Required" },
  },
];
