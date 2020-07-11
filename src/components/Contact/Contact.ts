import { FieldConfig } from "components/FieldComponent";

export const Contact: FieldConfig = {
  component: "composed",
  name: "Contact",
  fields: [
    {
      component: "textfield",
      props: {
        placeholder: "Phone number",
        disabled: true,
        start: { icon: "phone" },
      },
    },
    {
      component: "textfield",
      props: {
        placeholder: "Email",
        disabled: true,
        start: { icon: "email" },
      },
    },
    {
      component: "textfield",
      props: {
        placeholder: "Full Name",
        disabled: true,
        start: { icon: "contact_mail" },
      },
    },
  ],
};
