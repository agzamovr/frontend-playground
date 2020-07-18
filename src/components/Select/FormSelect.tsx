import React from "react";
import { SelectProps, Select } from "components/Select/Select";
import { Field as FormikField, FieldProps } from "formik";

export const FormSelect = (fieldProps: SelectProps) => (
  <FormikField
    name={fieldProps.props.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <Select
        props={{ ...fieldProps.props, ...rest, ...field }}
        values={fieldProps.values}
        groupBy={fieldProps.groupBy}
      />
    )}
  />
);
