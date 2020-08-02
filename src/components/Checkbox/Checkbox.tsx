import React from "react";
import {
  CheckboxProps as MuiCheckboxProps,
  Checkbox as MuiCheckbox,
  FormControlLabelProps,
  FormControlLabel,
} from "@material-ui/core";

type CheckboxKeys =
  | "color"
  | "value"
  | "indeterminate"
  | "checked"
  | "disabled";
export interface CheckboxProps {
  props: Pick<MuiCheckboxProps, CheckboxKeys>;
  formControlProps: Pick<FormControlLabelProps, "label">;
}

export const Checkbox = (props: CheckboxProps) => (
  <FormControlLabel
    control={<MuiCheckbox {...props.props} />}
    {...props.formControlProps}
  />
);
