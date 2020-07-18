import React from "react";
import { Field as FormikField, FieldProps } from "formik";
import { SwitchProps, Switch } from "components/Switch/Switch";

export const FormSwitch = (fieldProps: SwitchProps) => (
  <FormikField
    name={fieldProps.props.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <Switch
        props={{ ...fieldProps.props, ...rest, ...field }}
        formControlProps={fieldProps.formControlProps}
      />
    )}
  />
);
