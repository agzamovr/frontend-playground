import React, { FunctionComponent } from "react";

import {
  TextFieldProps,
  Chip,
  TextField,
  ChipProps,
  makeStyles,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ChecklistProps, Checklist } from "./Checklist";

export interface Styled {
  style?: CSSProperties;
}

interface ChipConfig extends Styled {
  name: "chip";
  props: ChipProps;
}
interface TextFieldConfig extends Styled {
  name: "textfield";
  props: TextFieldProps;
}
interface ChecklistConfig extends ChecklistProps {
  name: "checklist";
}

export type FieldConfig = ChipConfig | TextFieldConfig | ChecklistConfig;

const useStyles = (style?: CSSProperties) =>
  style ? makeStyles({ root: style })() : undefined;

export const Field: FunctionComponent<FieldConfig> = (props) => {
  const classes = useStyles(props.style);
  switch (props.name) {
    case "chip":
      return <Chip {...props.props} className={classes?.root} />;
    case "textfield":
      return <TextField {...props.props} className={classes?.root} />;
    case "checklist":
      return <Checklist {...props} />;
  }
};
