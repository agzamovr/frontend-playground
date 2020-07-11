import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Address } from "components/Address/Adress";
import { Contact } from "components/Contact/Contact";

const fields: FieldConfig[] = [
  { ...Address },
  { ...Contact },
  {
    component: "datetime",
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
