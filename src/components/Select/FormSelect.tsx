import React from "react";
import { Select } from "components/Select/Select";
import { Field as FormikField, FieldProps } from "formik";
import { SelecttFieldConfig } from "components/FieldComponent";

export const FormSelect = (fieldProps: SelecttFieldConfig) => (
  <FormikField
    name={fieldProps.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <Select
        props={{ ...fieldProps.props, ...rest, ...field }}
        values={fieldProps.values}
        groupBy={fieldProps.groupBy}
      />
    )}
  />
);
