import { FieldConfig } from "components/FieldComponent";

export const Contact: FieldConfig = {
  type: "composed",
  name: "Contact",
  fields: [
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
  ],
};
