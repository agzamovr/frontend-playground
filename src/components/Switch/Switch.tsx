import React from "react";
import {
  SwitchProps as MuiSwitchProps,
  Switch as MuiSwitch,
  FormControlLabelProps,
  FormControlLabel,
} from "@material-ui/core";

type SwitchKeys = "color" | "value" | "type";
export interface SwitchProps {
  props: Pick<MuiSwitchProps, SwitchKeys>;
  formControlProps: Pick<FormControlLabelProps, "label">;
}

export const Switch = (props: SwitchProps) => (
  <FormControlLabel
    control={<MuiSwitch {...props.props} type="checkbox" />}
    {...props.formControlProps}
  />
);
