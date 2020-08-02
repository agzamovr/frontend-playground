import React from "react";
import { Field } from "react-final-form";
import { CheckboxConfig } from "components/FieldComponent";
import { Checkbox } from "components/Checkbox/Checkbox";

export const FormSwitch = (fieldProps: CheckboxConfig) => (
  <Field name={fieldProps.name} type="checkbox">
    {({ input }) => (
      <Checkbox
        props={{ ...fieldProps.props, ...input }}
        formControlProps={fieldProps.formControlProps}
      />
    )}
  </Field>
);
