import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    component: "chip",
    props: { label: "STATUS" },
  },
  {
    component: "textfield",
    props: { label: "Description and notes", disabled: true },
  },
];

export const HeaderDescriptionCardConfig: CardConfig = {
  title: "Title",
  fields,
};
