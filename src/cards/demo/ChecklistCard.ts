import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { v4 as uuidv4 } from "uuid";

const fields: FieldConfig[] = [
  {
    component: "list",
    name: "checklist",
    editable: false,
    listType: "checklist",
    items: [
      {
        blockId: uuidv4(),
        label: "Deliver to Customer",
        name: "deliverToCustomer",
      },
      {
        blockId: uuidv4(),
        label: "Install",
        name: "install",
        subList: {
          listType: "checklist",
          items: [
            {
              blockId: uuidv4(),
              label: "Mount",
              name: "mount",
            },
            {
              blockId: uuidv4(),
              label: "Set up",
              name: "setUp",
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
