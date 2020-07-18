import React from "react";
import { Styled } from "../FieldComponent";
import {
  SwitchProps as MuiSwitchProps,
  Switch as MuiSwitch,
  FormControlLabelProps,
  FormControlLabel,
} from "@material-ui/core";

type SwitchKeys = "name" | "color" | "value" | "type";
export interface SwitchProps extends Styled {
  props: Pick<MuiSwitchProps, SwitchKeys>;
  formControlProps: Pick<FormControlLabelProps, "label">;
}

export const Switch = (props: SwitchProps) => (
  <FormControlLabel
    control={<MuiSwitch {...props.props} />}
    {...props.formControlProps}
  />
);
