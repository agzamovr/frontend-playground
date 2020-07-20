import React from "react";
import { Field as FormikField, FieldProps } from "formik";
import { RadioGroup } from "components/RadioGroup/RadioGroup";
import { RadioConfig } from "components/FieldComponent";

export const FormRadio = (fieldProps: RadioConfig) => (
  <FormikField
    name={fieldProps.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <RadioGroup
        props={{ ...fieldProps.props, ...rest, ...field }}
        values={fieldProps.values}
      />
    )}
  />
);
