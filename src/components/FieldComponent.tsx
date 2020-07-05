import React, { FunctionComponent } from "react";

import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ChipProps, Chip } from "components/Chip";
import { HeaderProps, Header } from "components/Header";
import { DatetimeProps, Datetime } from "components/Datetime";
import { TextfieldProps, TextField } from "components/TextField/TextField";
import { ChecklistProps, Checklist } from "cards/Checklist";
import { SwitchProps, Switch } from "components/Switch";

export interface Styled {
  style?: CSSProperties;
}

interface HeaderConfig extends HeaderProps {
  name: "header";
}

interface ChipConfig extends ChipProps {
  name: "chip";
}

interface SwitchConfig extends SwitchProps {
  name: "switch";
}
interface DatetimeConfig extends DatetimeProps {
  name: "datetime";
}
interface TextFieldConfig extends TextfieldProps {
  name: "textfield";
}
interface ChecklistConfig extends ChecklistProps {
  name: "checklist";
}

export type FieldConfig =
  | HeaderConfig
  | ChipConfig
  | SwitchConfig
  | TextFieldConfig
  | ChecklistConfig
  | DatetimeConfig;

export const Field: FunctionComponent<FieldConfig> = (props) => {
  switch (props.name) {
    case "header":
      return <Header {...props} />;
    case "chip":
      return <Chip {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "textfield":
      return <TextField {...props} />;
    case "checklist":
      return <Checklist {...props} />;
    case "datetime":
      return <Datetime {...props} />;
  }
};
