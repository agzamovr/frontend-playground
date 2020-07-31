import React from "react";
import { Field } from "react-final-form";
import { Switch } from "components/Switch/Switch";
import { SwitchConfig } from "components/FieldComponent";

export const FormSwitch = (fieldProps: SwitchConfig) => (
  <Field name={fieldProps.name} type="checkbox">
    {({ input }) => (
      <Switch
        props={{ ...fieldProps.props, ...input }}
        formControlProps={fieldProps.formControlProps}
      />
    )}
  </Field>
);
