import { FieldConfig } from "components/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";
import { Address } from "components/Address/Adress";
import { Contact } from "components/Contact/Contact";

const fields: FieldConfig[] = [{ ...Address }, { ...Contact }];

export const CustomerCardConfig: CardConfig = {
  title: "Customer",
  fields,
};
