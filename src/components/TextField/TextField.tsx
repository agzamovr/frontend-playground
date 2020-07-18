import React, { FunctionComponent } from "react";
import {
  InputAdornment,
  TextFieldProps as MuiTextFieldProps,
  TextField as MuiTextField,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Styled } from "components/FieldComponent";

interface Adornment {
  icon?: string;
  text?: string;
}
type TextFieldKeys =
  | "name"
  | "label"
  | "placeholder"
  | "disabled"
  | "type"
  | "inputMode"
  | "inputProps"
  | "value"
  | "defaultValue"
  | "select"
  | "helperText"
  | "error";
export interface TextfieldProps extends Styled {
  props: Pick<MuiTextFieldProps, TextFieldKeys> & {
    start?: Adornment;
    end?: Adornment;
  };
}

export const TextField: FunctionComponent<TextfieldProps> = (props) => {
  const { start, end, ...rest } = props.props;
  const startAdornment =
    start?.icon || start?.text ? (
      <InputAdornment position="start">
        {start?.icon ? <Icon>{start?.icon}</Icon> : start?.text}
      </InputAdornment>
    ) : undefined;
  const endAdornment =
    end?.icon || end?.text ? (
      <InputAdornment position="end">
        {end?.icon ? <Icon>{end?.icon}</Icon> : end?.text}
      </InputAdornment>
    ) : undefined;

  return (
    <MuiTextField {...rest} InputProps={{ startAdornment, endAdornment }}>
      {props.children}
    </MuiTextField>
  );
};
