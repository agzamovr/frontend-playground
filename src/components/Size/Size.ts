import { FieldConfig } from "components/FieldComponent";

export const Size: FieldConfig = {
  type: "composed",
  name: "Size",
  fields: [
    {
      type: "textfield",
      props: {
        placeholder: "Width",
        type: "number",
        disabled: true,
        inputMode: "decimal",
        inputProps: { min: "0" },
        end: { text: "cm" },
      },
    },
    {
      type: "textfield",
      props: {
        placeholder: "Height",
        type: "number",
        disabled: true,
        inputMode: "decimal",
        inputProps: { min: "0" },
        end: { text: "cm" },
      },
    },
    {
      type: "textfield",
      props: {
        placeholder: "Length",
        type: "number",
        disabled: true,
        inputMode: "decimal",
        inputProps: { min: "0" },
        end: { text: "cm" },
      },
    },
  ],
};
