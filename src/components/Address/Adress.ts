import { FieldConfig } from "components/FieldComponent";

export const Address: FieldConfig = {
  type: "composed",
  name: "Address",
  fields: [
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
  ],
};
