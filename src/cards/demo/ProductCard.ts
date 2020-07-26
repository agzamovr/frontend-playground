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
    unitOfMeasure: { unit: "weight", value: "kg" },
    props: {
      placeholder: "Weight",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
    },
  },
  {
    component: "textfield",
    name: "price",
    unitOfMeasure: { unit: "currency", value: "USD" },
    props: {
      placeholder: "Price",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
    },
  },
];

export const ProductCardConfig: CardConfig = {
  title: "Product",
  fields,
};
