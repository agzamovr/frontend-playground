import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Size } from "components/Size/Size";

const fields: FieldConfig[] = [
  {
    component: "textfield",
    name: "name",
    props: { placeholder: "Name", disabled: true },
  },
  {
    component: "textfield",
    name: "amount",
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
    component: "textfield",
    name: "weight",
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
    component: "textfield",
    name: "price",
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
