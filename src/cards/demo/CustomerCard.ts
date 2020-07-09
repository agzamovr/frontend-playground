import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    type: "textfield",
    props: {
      placeholder: "Street address, floor",
      disabled: true,
      start: { icon: "business" },
    },
  },
  {
    type: "textfield",
    props: {
      placeholder: "City, State, Zip",
      disabled: true,
      start: { icon: "location_on" },
    },
  },
  {
    type: "textfield",
    props: {
      placeholder: "Phone number",
      disabled: true,
      start: { icon: "phone" },
    },
  },
  {
    type: "textfield",
    props: {
      placeholder: "Email",
      disabled: true,
      start: { icon: "email" },
    },
  },
  {
    type: "textfield",
    props: {
      placeholder: "Full Name",
      disabled: true,
      start: { icon: "contact_mail" },
    },
  },
];

export const CustomerCardConfig: CardConfig = {
  title: "Customer",
  fields,
};
