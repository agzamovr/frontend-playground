import React, { FunctionComponent } from "react";
import {
  FieldConfig,
  Field,
  SimpleFieldConfig,
} from "components/FieldComponent";
import { Grid } from "@material-ui/core";
import { FormTextField } from "components/TextField/FormTextField";
import { FormSwitch } from "components/Switch/FormSwitch";
import { FormCheckbox } from "components/Checkbox/FormCheckbox";
import { FormSelect } from "components/Select/FormSelect";
import { FormRadio } from "components/RadioGroup/FormRadioGroup";

interface FieldsProps {
  fields: FieldConfig[];
}

export const FormField = (fieldProps: SimpleFieldConfig) => {
  switch (fieldProps.component) {
    case "textfield":
      return <FormTextField {...fieldProps} />;
    case "switch":
      return <FormSwitch {...fieldProps} />;
    case "select":
      return <FormSelect {...fieldProps} />;
    case "radio":
      return <FormRadio {...fieldProps} />;
    case "checkbox":
      return <FormCheckbox {...fieldProps} />;
    default:
      return <Field {...fieldProps} />;
  }
};

export const FormFields: FunctionComponent<FieldsProps> = ({ fields }) => (
  <>
    {fields.map((fieldProps, index) =>
      fieldProps.component === "composed" ? (
        <FormFields key={index} fields={fieldProps.fields} />
      ) : (
        <Grid key={index} item>
          <FormField {...fieldProps} />
        </Grid>
      )
    )}
  </>
);
