import React, { FunctionComponent } from "react";

import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ChipProps, Chip } from "components/Chip";
import { HeaderProps, Header } from "components/Header";
import { DatetimeProps, Datetime } from "components/Datetime";
import { TextfieldProps, TextField } from "components/TextField/TextField";
import { ChecklistProps, Checklist } from "cards/Checklist";
import { SwitchProps, Switch } from "components/Switch";
import { Grid } from "@material-ui/core";
import { TabsProps, Tabs } from "components/Tabs/Tabs";

export interface Styled {
  style?: CSSProperties;
}

interface HeaderConfig extends HeaderProps {
  type: "header";
}

interface ChipConfig extends ChipProps {
  type: "chip";
}

interface SwitchConfig extends SwitchProps {
  type: "switch";
}
interface DatetimeConfig extends DatetimeProps {
  type: "datetime";
}
interface TextFieldConfig extends TextfieldProps {
  type: "textfield";
}
interface ChecklistConfig extends ChecklistProps {
  type: "checklist";
}

interface TabsConfig extends TabsProps {
  type: "tabs";
}

export type SimpleFieldConfig =
  | HeaderConfig
  | ChipConfig
  | SwitchConfig
  | TextFieldConfig
  | ChecklistConfig
  | DatetimeConfig
  | TabsConfig;

export type ComposedFieldConfig = {
  type: "composed";
  name: string;
  fields: FieldConfig[];
};

export type FieldConfig = SimpleFieldConfig | ComposedFieldConfig;

export const Field: FunctionComponent<SimpleFieldConfig> = (props) => {
  switch (props.type) {
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
    case "tabs":
      return <Tabs {...props} />;
  }
};

export const Fields: FunctionComponent<{ fields: FieldConfig[] }> = ({
  fields,
}) => (
  <>
    {fields.map((field, index) =>
      field.type === "composed" ? (
        <Fields key={index} fields={field.fields} />
      ) : (
        <Grid key={index} item>
          <Field {...field} />
        </Grid>
      )
    )}
  </>
);
