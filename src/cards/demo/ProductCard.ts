import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Size } from "components/Size/Size";

const fields: FieldConfig[] = [
  {
    component: "textfield",
    props: { name: "name", placeholder: "Name", disabled: true },
  },
  {
    component: "textfield",
    props: {
      name: "amount",
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
    props: {
      name: "weight",
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
    props: {
      name: "price",
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
