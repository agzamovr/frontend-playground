import { MouseEvent } from "react";
import { FieldConfig } from "cards/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

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

export const ChecklistCardConfig: CardConfig = {
  title: "Checklist",
  fields,
};
