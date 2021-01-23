import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { v4 as uuidv4 } from "uuid";

const fields: FieldConfig[] = [
  {
    component: "list",
    name: "checklist",
    dndEnabled: false,
    items: [
      {
        blockId: uuidv4(),
        control: {
          component: "checkbox",
          name: "deliverToCustomer",
          formControlProps: { label: "Deliver to Customer" },
          props: {
            color: "primary",
          },
        },
      },
      {
        blockId: uuidv4(),
        control: {
          component: "checkbox",
          name: "install",
          formControlProps: { label: "Install" },
          props: {
            color: "primary",
          },
        },
        subList: {
          items: [
            {
              blockId: uuidv4(),
              control: {
                component: "checkbox",
                name: "mount",
                formControlProps: { label: "Mount" },
                props: {
                  color: "primary",
                },
              },
            },
            {
              blockId: uuidv4(),
              control: {
                component: "checkbox",
                name: "setUp",
                formControlProps: { label: "Set up" },
                props: {
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
