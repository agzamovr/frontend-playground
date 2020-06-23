import React from "react";
import Box from "@material-ui/core/Box";
import { SelectableCard } from "cards/SelectableCard";
import { Field, FieldConfig } from "cards/FieldComponent";

const fields: FieldConfig[] = [
  {
    name: "chip",
    props: { label: "STATUS" },
    style: {
      backgroundColor: "#FFB74D",
    },
  },
  {
    name: "textfield",
    props: { label: "Description and notes", disabled: true },
  },
];

export const HeaderDescriptionCard = () => (
  <SelectableCard title="Title">
    {fields.map((field) => (
      <Box>
        <Field {...field} />
      </Box>
    ))}
  </SelectableCard>
);
