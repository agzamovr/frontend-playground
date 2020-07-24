import { FieldConfig } from "components/FieldComponent";

export const Contact: FieldConfig = {
  component: "composed",
  name: "contact",
  label: "Contact",
  cardinality: "single",
  fields: [
    {
      component: "textfield",
      name: "phoneNumber",
      props: {
        placeholder: "Phone number",
        disabled: true,
        start: { icon: "phone" },
      },
    },
    {
      component: "textfield",
      name: "email",
      props: {
        placeholder: "Email",
        disabled: true,
        start: { icon: "email" },
      },
    },
    {
      component: "textfield",
      name: "fullName",
      props: {
        placeholder: "Full Name",
        disabled: true,
        start: { icon: "contact_mail" },
      },
    },
  ],
};
