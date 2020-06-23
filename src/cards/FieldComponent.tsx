import React, { FunctionComponent } from "react";

import {
  TextFieldProps,
  Chip,
  TextField,
  ChipProps,
  makeStyles,
  DividerProps,
  Divider,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ChecklistProps, Checklist } from "./Checklist";
import { Header, HeaderProps } from "./Header";
import { Datetime, DatetimeProps } from "./Datetime";

export interface Styled {
  style?: CSSProperties;
}

interface DividerConfig extends Styled {
  name: "divider";
  props?: DividerProps;
}

interface HeaderConfig extends HeaderProps {
  name: "header";
}

interface ChipConfig extends Styled {
  name: "chip";
  props?: ChipProps;
}
interface DatetimeConfig extends DatetimeProps {
  name: "datetime";
}
interface TextFieldConfig extends Styled {
  name: "textfield";
  props?: TextFieldProps;
}
interface ChecklistConfig extends ChecklistProps {
  name: "checklist";
}

export type FieldConfig =
  | DividerConfig
  | HeaderConfig
  | ChipConfig
  | TextFieldConfig
  | ChecklistConfig
  | DatetimeConfig;

export const useStyles = (style?: CSSProperties) =>
  style ? makeStyles({ root: style })() : undefined;

export const Field: FunctionComponent<FieldConfig> = (props) => {
  const classes = useStyles(props.style);
  switch (props.name) {
    case "divider":
      return <Divider {...props.props} className={classes?.root} />;
    case "header":
      return <Header {...props} />;
    case "chip":
      return <Chip {...props.props} className={classes?.root} />;
    case "textfield":
      return <TextField {...props.props} className={classes?.root} />;
    case "checklist":
      return <Checklist {...props} />;
    case "datetime":
      return <Datetime {...props} />;
  }
};
