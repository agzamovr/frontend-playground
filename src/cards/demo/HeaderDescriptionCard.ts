import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    type: "chip",
    props: { label: "STATUS" },
    style: {
      backgroundColor: "#FFB74D",
    },
  },
  {
    type: "textfield",
    props: { label: "Description and notes", disabled: true },
  },
];

export const HeaderDescriptionCardConfig: CardConfig = {
  title: "Title",
  fields,
};