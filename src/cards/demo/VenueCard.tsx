import React from "react";
import { InputAdornment } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { FieldConfig } from "cards/FieldComponent";
import { CardConfig } from "cards/demo/DemoCards";

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
  {
    name: "datetime",
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
