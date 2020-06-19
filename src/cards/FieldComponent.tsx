import React, { FunctionComponent } from "react";

import {
  TextFieldProps,
  Chip,
  TextField,
  ChipProps,
  makeStyles,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface Style {
  style?: CSSProperties;
}

interface ChipConfig extends Style {
  name: "chip";
  props: ChipProps;
}
interface TextFieldConfig extends Style {
  name: "textfield";
  props: TextFieldProps;
}
export type FieldConfig = ChipConfig | TextFieldConfig;

const useStyles = (style?: CSSProperties) =>
  style ? makeStyles({ root: style })() : undefined;

export const Field: FunctionComponent<FieldConfig> = (props) => {
  const classes = useStyles(props.style);
  switch (props.name) {
    case "chip":
      return <Chip {...props.props} className={classes?.root} />;
    case "textfield":
      return <TextField {...props.props} className={classes?.root} />;
  }
};
