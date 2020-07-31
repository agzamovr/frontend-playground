import React from "react";
import { Select } from "components/Select/Select";
import { Field } from "react-final-form";
import { SelecttFieldConfig } from "components/FieldComponent";

export const FormSelect = (fieldProps: SelecttFieldConfig) => (
  <Field name={fieldProps.name}>
    {({ input }) => (
      <Select
        props={{ ...fieldProps.props, ...input }}
        values={fieldProps.values}
        groupBy={fieldProps.groupBy}
      />
    )}
  </Field>
);
