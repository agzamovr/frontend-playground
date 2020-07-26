import { FieldConfig } from "components/FieldComponent";

export const Size: FieldConfig = {
  component: "composed",
  name: "size",
  label: "Size",
  unitOfMeasure: { unit: "length", value: "m" },
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
      },
    },
  ],
};
