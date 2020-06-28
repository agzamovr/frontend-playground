import React from "react";
import { InputAdornment, Box } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { SelectableCard } from "cards/SelectableCard";
import { Field, FieldConfig } from "cards/FieldComponent";

const fields: FieldConfig[] = [
  {
    name: "textfield",
    props: {
      placeholder: "Street address, floor",
      disabled: true,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <BusinessIcon />
          </InputAdornment>
        ),
      },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "City, State, Zip",
      disabled: true,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon />
          </InputAdornment>
        ),
      },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Phone number",
      disabled: true,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIcon />
          </InputAdornment>
        ),
      },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Email",
      disabled: true,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      },
    },
  },
  {
    name: "textfield",
    props: {
      placeholder: "Full Name",
      disabled: true,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <ContactMailIcon />
          </InputAdornment>
        ),
      },
    },
  },
];

export const CustomerCard = () => (
  <SelectableCard title="Customer">
    {fields.map((field, index) => (
      <Box key={index}>
        <Field {...field} />
      </Box>
    ))}
  </SelectableCard>
);
