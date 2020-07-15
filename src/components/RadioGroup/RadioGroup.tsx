import React, { FunctionComponent } from "react";
import {
  RadioGroupProps as MuiRadioGroupProps,
  RadioProps as MuiRadioProps,
  Radio as MuiRadio,
  FormControl as MuiFormControl,
  RadioGroup as MuiRadioGroup,
  FormControlLabel as MuiFormControlLabel,
} from "@material-ui/core";
import { Styled } from "components/FieldComponent";

type RadioGroupKeys = "name" | "defaultValue" | "value" | "row";
type RadioKeys = "checked" | "value" | "name" | "inputProps" | "color" | "size";

type RadioProps = {
  label: string;
  value: string;
  props?: Pick<MuiRadioProps, RadioKeys>;
};

export interface RadioGroupProps extends Styled {
  props?: Pick<MuiRadioGroupProps, RadioGroupKeys>;
  values: RadioProps[];
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  props,
  values,
}) => (
  <MuiFormControl component="fieldset">
    <MuiRadioGroup {...props}>
      {values.map(({ props, value, label }, index) => (
        <MuiFormControlLabel
          key={index}
          value={value}
          control={<MuiRadio {...props} />}
          label={label}
        />
      ))}
    </MuiRadioGroup>
  </MuiFormControl>
);
