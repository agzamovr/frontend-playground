import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Address } from "components/Address/Adress";
import { Contact } from "components/Contact/Contact";

const fields: FieldConfig[] = [
  { ...Address },
  { ...Contact },
  {
    component: "datetime",
    name: "venueDate",
    props: {
      disabled: true,
      label: "Date",
      variant: "dialog",
      disablePast: true,
      autoOk: true,
      format: "dd.MM.yyyy HH:mm",
    },
  },
];

export const VenueCardConfig: CardConfig = {
  title: "Venue/Location",
  fields,
};
