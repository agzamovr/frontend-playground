import React from "react";
import { InputAdornment } from "@material-ui/core";
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
      InputProps: {
        endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
      },
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
      InputProps: {
        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
      },
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
      InputProps: {
        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
      },
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
      InputProps: {
        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
      },
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
      InputProps: {
        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
      },
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
      InputProps: {
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      },
    },
  },
];

export const ProductCardConfig: CardConfig = {
  title: "Product",
  fields,
};
