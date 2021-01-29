import { ListConfig, FieldConfig } from "components/FieldComponent";
import { ListItemProps, ListItems } from "components/List/List";
import {
  SettingsFormValues,
  ListItemFormValues,
} from "components/Settings/settingsUtils";

type ListItemFormValue = {
  label: string;
  items?: ListItemFormValues[];
};
const mapToItemValue = (item: ListItemProps) => {
  const itemValue: ListItemFormValue = { label: item.label };
  if (item.subList?.items) {
    itemValue["items"] = listItemSettingsValues(item.subList?.items);
  }
  return itemValue;
};

const listItemSettingsValues = (items: ListItemProps[]): ListItemFormValues[] =>
  items.map((item) => ({ [item.name]: mapToItemValue(item) }));

export const listSettingsValues = (config: ListConfig): SettingsFormValues => ({
  [config.name]: {
    listType: config.listType,
    items: listItemSettingsValues(config.items),
  },
});

export const listConfigValues = (
  namePrefix: string,
  listProps: ListItems
): ListItems => ({
  ...listProps,
  items: listProps.items.map((item, index) => ({
    ...item,
    name: `${namePrefix}.items[${index}].${item.name}.label`,
    subList:
      item.subList &&
      listConfigValues(
        `${namePrefix}.items[${index}].${item.name}`,
        item.subList
      ),
  })),
});

export const listSettings = (listConfig: ListConfig): FieldConfig[] => [
  {
    component: "select",
    name: `${listConfig.name}.listType`,
    props: { label: "List type" },
    values: [
      { label: "Checklist", value: "checklist" },
      { label: "Ordered", value: "ordered" },
      { label: "Unordered", value: "unordered" },
    ],
  },
  {
    ...listConfig,
    ...listConfigValues(listConfig.name, listConfig),
    editable: true,
  },
];
