import { FieldConfig } from "components/FieldComponent";

export const Contact: FieldConfig = {
  component: "composed",
  name: "contact",
  label: "Contact",
  fields: [
    {
      component: "textfield",
      props: {
        name: "phoneNumber",
        placeholder: "Phone number",
        disabled: true,
        start: { icon: "phone" },
      },
    },
    {
      component: "textfield",
      props: {
        name: "email",
        placeholder: "Email",
        disabled: true,
        start: { icon: "email" },
      },
    },
    {
      component: "textfield",
      props: {
        name: "fullName",
        placeholder: "Full Name",
        disabled: true,
        start: { icon: "contact_mail" },
      },
    },
  ],
};
