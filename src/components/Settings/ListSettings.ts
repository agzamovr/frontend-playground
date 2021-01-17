import { ListConfig, FieldConfig } from "components/FieldComponent";
import { cloneDeep } from "lodash";

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
  { ...cloneDeep(listConfig), dndEnabled: true },
];
