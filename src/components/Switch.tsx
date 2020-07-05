import React from "react";
import { Styled } from "./FieldComponent";
import {
  SwitchProps as MuiSwitchProps,
  Switch as MuiSwitch,
  FormControlLabelProps,
  FormControlLabel,
} from "@material-ui/core";

export interface SwitchProps extends Styled {
  props: Pick<MuiSwitchProps, "color">;
  formControlProps: Pick<FormControlLabelProps, "label">;
}

export const Switch = (props: SwitchProps) => (
  <FormControlLabel
    control={<MuiSwitch {...props.props} />}
    {...props.formControlProps}
  />
);
