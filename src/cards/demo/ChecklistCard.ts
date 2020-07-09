import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    type: "checklist",
    items: [
      {
        formControlProps: { label: "Deliver to Customer" },
        checkboxProps: {
          checked: true,
          color: "primary",
        },
      },
      {
        formControlProps: { label: "Install" },
        checkboxProps: {
          indeterminate: true,
          checked: true,
          color: "primary",
        },
        subChecklist: {
          items: [
            {
              formControlProps: { label: "Mount" },
              checkboxProps: {
                checked: true,
                disabled: true,
                color: "primary",
              },
            },
            {
              formControlProps: { label: "Set up" },
              checkboxProps: {
                checked: false,
                color: "primary",
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
