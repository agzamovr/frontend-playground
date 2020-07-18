import React from "react";
import { TextField, TextfieldProps } from "components/TextField/TextField";
import { Field as FormikField, FieldProps } from "formik";

export const FormTextField = (fieldProps: TextfieldProps) => (
  <FormikField
    name={fieldProps.props.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <TextField props={{ ...fieldProps.props, ...rest, ...field }} />
    )}
  />
);
