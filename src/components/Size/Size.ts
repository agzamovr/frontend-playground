import { FieldConfig } from "components/FieldComponent";

export const Size: FieldConfig = {
  component: "composed",
  name: "size",
  label: "Size",
  fields: [
    {
      component: "textfield",
      props: {
        name: "width",
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
        name: "height",
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
        name: "length",
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
