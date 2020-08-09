import { ListConfig, FieldConfig } from "components/FieldComponent";

export const listSettings = (listConfig: ListConfig): FieldConfig[] => [
  {
    component: "select",
    name: "listType",
    props: { label: "List type" },
    values: [
      { label: "Checklist", value: "checklist" },
      { label: "Ordered", value: "ordered" },
      { label: "Unordered", value: "unordered" },
    ],
  },
  {
    ...listConfig,
    items: [
      ...listConfig.items,
      {
        control: {
          component: "textfield",
          name: "addNew",
          props: {
            placeholder: "+ New item",
          },
        },
      },
    ],
  },
];
