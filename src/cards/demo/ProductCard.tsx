import React from "react";
import { InputAdornment, Box } from "@material-ui/core";
import { SelectableCard } from "cards/SelectableCard";
import { Field, FieldConfig } from "cards/FieldComponent";

const fields: FieldConfig[] = [
  {
    name: "textfield",
    props: { label: "Name", disabled: true },
  },
  {
    name: "textfield",
    props: {
      label: "Amount",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
    },
  },
  {
    name: "textfield",
    props: {
      label: "Width",
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
      label: "Height",
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
      label: "Length",
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
      label: "Weight",
      type: "number",
      disabled: true,
      inputMode: "decimal",
      inputProps: { min: "0" },
      InputProps: {
        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
      },
    },
  },
  {
    name: "textfield",
    props: {
      label: "Price",
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

export const ProductCard = () => (
  <SelectableCard title="Product">
    {fields.map((field, index) => (
      <Box key={index}>
        <Field {...field} />
      </Box>
    ))}
  </SelectableCard>
);
