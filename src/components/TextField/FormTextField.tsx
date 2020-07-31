import React from "react";
import { TextField } from "components/TextField/TextField";
import { TextFieldConfig } from "components/FieldComponent";
import { Field } from "react-final-form";

export const FormTextField = (fieldProps: TextFieldConfig) => (
  <Field name={fieldProps.name}>
    {({ input }) => <TextField props={{ ...fieldProps.props, ...input }} />}
  </Field>
);
