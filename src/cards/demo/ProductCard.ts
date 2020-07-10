import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Size } from "components/Size/Size";

const fields: FieldConfig[] = [
  {
    type: "textfield",
    props: { placeholder: "Name", disabled: true },
  },
  {
    type: "textfield",
    props: {
      placeholder: "Amount",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      end: { text: "pcs" },
    },
  },
  { ...Size },
  {
    type: "textfield",
    props: {
      placeholder: "Weight",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      end: { text: "kg" },
    },
  },
  {
    type: "textfield",
    props: {
      placeholder: "Price",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      start: { text: "$" },
    },
  },
];

export const ProductCardConfig: CardConfig = {
  title: "Product",
  fields,
};
