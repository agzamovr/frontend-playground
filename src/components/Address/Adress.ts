import { FieldConfig } from "components/FieldComponent";

export const Address: FieldConfig = {
  component: "composed",
  name: "address",
  label: "Address",
  fields: [
    {
      component: "textfield",
      props: {
        name: "address.addressLine1",
        placeholder: "Street address, floor",
        disabled: true,
        start: { icon: "business" },
      },
    },
    {
      component: "textfield",
      props: {
        name: "address.addressLine2",
        placeholder: "City, State, Zip",
        disabled: true,
        start: { icon: "location_on" },
      },
    },
  ],
};
