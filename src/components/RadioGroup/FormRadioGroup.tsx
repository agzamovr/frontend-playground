import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";
import { RadioConfig } from "components/FieldComponent";
import {
  Radio as MuiRadio,
  FormControl as MuiFormControl,
  RadioGroup as MuiRadioGroup,
  FormControlLabel as MuiFormControlLabel,
} from "@material-ui/core";

export const FormRadio: FunctionComponent<RadioConfig> = (props) => (
  <MuiFormControl component="fieldset">
    <MuiRadioGroup {...props.props}>
      {props.values.map(({ props: valueProps, value, label }, index) => (
        <MuiFormControlLabel
          key={index}
          value={value}
          control={
            <Field name={props.name} type="radio">
              {({ input }) => <MuiRadio {...valueProps} {...input} />}
            </Field>
          }
          label={label}
        />
      ))}
    </MuiRadioGroup>
  </MuiFormControl>
);
