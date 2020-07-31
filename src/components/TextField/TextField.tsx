import React, { FunctionComponent } from "react";
import {
  InputAdornment,
  TextFieldProps as MuiTextFieldProps,
  TextField as MuiTextField,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { UnitOfMeasureValues } from "components/Settings/uom/unitOfMeasures";

interface Adornment {
  icon?: string;
  text?: string;
}
type TextFieldKeys =
  | "placeholder"
  | "disabled"
  | "type"
  | "inputMode"
  | "inputProps"
  | "value"
  | "defaultValue"
  | "select"
  | "error"
  | "fullWidth";
export interface TextfieldProps extends UnitOfMeasureValues {
  props: Pick<MuiTextFieldProps, TextFieldKeys> & {
    label?: string;
    helperText?: string;
    start?: Adornment;
    end?: Adornment;
    required?: boolean;
  };
}

export const TextField: FunctionComponent<TextfieldProps> = (props) => {
  const { start, end, ...rest } = props.props;
  const { children, unitOfMeasure } = props;
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
    ) : unitOfMeasure?.value ? (
      <InputAdornment position="end">{unitOfMeasure.value}</InputAdornment>
    ) : undefined;
  return (
    <MuiTextField {...rest} InputProps={{ startAdornment, endAdornment }}>
      {children}
    </MuiTextField>
  );
};
