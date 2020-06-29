import { FieldConfig } from "cards/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    name: "textfield",
    props: { placeholder: "Name", disabled: true },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Amount",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      end: { text: "pcs" },
    },
  },
  {
    name: "textfield",
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
    name: "textfield",
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
    name: "textfield",
    props: {
      placeholder: "Length",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      end: { text: "cm" },
    },
  },
  {
    name: "textfield",
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
    name: "textfield",
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
