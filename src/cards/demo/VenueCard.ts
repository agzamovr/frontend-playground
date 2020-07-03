import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

const fields: FieldConfig[] = [
  {
    name: "textfield",
    props: {
      placeholder: "Street address, floor",
      disabled: true,
      start: { icon: "business" },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "City, State, Zip",
      disabled: true,
      start: { icon: "location_on" },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Phone number",
      disabled: true,
      start: { icon: "phone" },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Email",
      disabled: true,
      start: { icon: "email" },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Full Name",
      disabled: true,
      start: { icon: "contact_mail" },
    },
  },
  {
    name: "datetime",
    props: {
      disabled: true,
      disablePast: true,
    },
  },
];

export const VenueCardConfig: CardConfig = {
  title: "Venue/Location",
  fields,
};
