import { FieldConfig } from "components/FieldComponent";

export const Size: FieldConfig = {
  component: "composed",
  name: "size",
  label: "Size",
  fields: [
    {
      component: "textfield",
      name: "width",
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
      name: "height",
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
      name: "length",
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
