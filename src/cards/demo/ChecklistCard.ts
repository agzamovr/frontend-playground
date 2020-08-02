import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    component: "list",
    name: "checklist",
    items: [
      {
        control: {
          component: "checkbox",
          name: "deliverToCustomer",
          formControlProps: { label: "Deliver to Customer" },
          props: { checked: true, color: "primary" },
        },
      },
      {
        control: {
          component: "checkbox",
          name: "install",
          formControlProps: { label: "Install" },
          props: {
            indeterminate: true,
            checked: true,
            color: "primary",
          },
        },
        subList: {
          items: [
            {
              control: {
                component: "checkbox",
                name: "mount",
                formControlProps: { label: "Mount" },
                props: {
                  checked: true,
                  disabled: true,
                  color: "primary",
                },
              },
            },
            {
              control: {
                component: "checkbox",
                name: "setUp",
                formControlProps: { label: "Set up" },
                props: {
                  checked: false,
                  color: "primary",
                },
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
