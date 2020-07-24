import { FieldConfig } from "components/FieldComponent";

export const Address: FieldConfig = {
  component: "composed",
  name: "address",
  label: "Address",
  cardinality: "single",
  datasourceProvider: { provider: "geocoding", value: "mapbox" },
  fields: [
    {
      component: "textfield",
      name: "addressLine1",
      props: {
        placeholder: "Street address, floor",
        disabled: true,
        start: { icon: "business" },
      },
    },
    {
      component: "textfield",
      name: "addressLine2",
      props: {
        placeholder: "City, State, Zip",
        disabled: true,
        start: { icon: "location_on" },
      },
    },
  ],
};
