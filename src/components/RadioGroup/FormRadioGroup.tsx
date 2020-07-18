import React from "react";
import { Field as FormikField, FieldProps } from "formik";
import { RadioGroupProps, RadioGroup } from "components/RadioGroup/RadioGroup";

export const FormRadio = (fieldProps: RadioGroupProps) => (
  <FormikField
    name={fieldProps.props?.name}
    component={({ field, form, ...rest }: FieldProps<string>) => (
      <RadioGroup
        props={{ ...fieldProps.props, ...rest, ...field }}
        values={fieldProps.values}
      />
    )}
  />
);
