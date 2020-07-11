import { FieldConfig } from "components/FieldComponent";

export const Size: FieldConfig = {
  component: "composed",
  name: "Size",
  fields: [
    {
      component: "textfield",
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
      component: "textfield",
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
      component: "textfield",
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
