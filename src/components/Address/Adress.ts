import { FieldConfig } from "components/FieldComponent";

export const Address: FieldConfig = {
  component: "composed",
  name: "Address",
  fields: [
    {
      component: "textfield",
      props: {
        placeholder: "Street address, floor",
        disabled: true,
        start: { icon: "business" },
      },
    },
    {
      component: "textfield",
      props: {
        placeholder: "City, State, Zip",
        disabled: true,
        start: { icon: "location_on" },
      },
    },
  ],
};
