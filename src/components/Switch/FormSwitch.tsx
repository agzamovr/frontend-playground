import React from "react";
import { Field as FormikField, FieldProps } from "formik";
import { Switch } from "components/Switch/Switch";
import { SwitchConfig } from "components/FieldComponent";

export const FormSwitch = (fieldProps: SwitchConfig) => (
  <FormikField
    name={fieldProps.name}
    type="checkbox"
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <Switch
        props={{ ...fieldProps.props, ...rest, ...field }}
        formControlProps={fieldProps.formControlProps}
      />
    )}
  />
);
