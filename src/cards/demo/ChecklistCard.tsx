import React, { MouseEvent } from "react";
import { Box } from "@material-ui/core";
import { FieldConfig, Field } from "cards/FieldComponent";
import { SelectableCard } from "cards/SelectableCard";

const noop = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

const fields: FieldConfig[] = [
  {
    name: "checklist",
    items: [
      {
        formControlProps: { label: "Deliver to Customer" },
        checkboxProps: { checked: true, color: "primary", onClick: noop },
      },
      {
        formControlProps: { label: "Install" },
        checkboxProps: {
          indeterminate: true,
          checked: true,
          color: "primary",
          onClick: noop,
        },
        subChecklist: {
          items: [
            {
              formControlProps: { label: "Mount" },
              checkboxProps: {
                checked: true,
                disabled: true,
                color: "primary",
                onClick: noop,
              },
            },
            {
              formControlProps: { label: "Set up" },
              checkboxProps: {
                checked: false,
                color: "primary",
                onClick: noop,
              },
            },
          ],
        },
      },
    ],
  },
];

export const ChecklistCard = () => (
  <SelectableCard title="Checklist">
    {fields.map((field, index) => (
      <Box key={index}>
        <Field {...field} />
      </Box>
    ))}
  </SelectableCard>
);
