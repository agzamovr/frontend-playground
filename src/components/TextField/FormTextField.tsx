import React from "react";
import { TextField } from "components/TextField/TextField";
import { Field as FormikField, FieldProps } from "formik";
import { TextFieldConfig } from "components/FieldComponent";

export const FormTextField = (fieldProps: TextFieldConfig) => (
  <FormikField
    name={fieldProps.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <TextField props={{ ...fieldProps.props, ...rest, ...field }} />
    )}
  />
);
