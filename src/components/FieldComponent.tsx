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
import { SelectProps, Select } from "components/Select/Select";
import { RadioGroup, RadioGroupProps } from "components/RadioGroup/RadioGroup";

export interface Styled {
  style?: CSSProperties;
}

interface HeaderConfig extends HeaderProps {
  component: "header";
}

interface ChipConfig extends ChipProps {
  component: "chip";
}

interface SwitchConfig extends SwitchProps {
  component: "switch";
}
interface RadioConfig extends RadioGroupProps {
  component: "radio";
}
interface DatetimeConfig extends DatetimeProps {
  component: "datetime";
}
interface TextFieldConfig extends TextfieldProps {
  component: "textfield";
}
interface SelecttFieldConfig extends SelectProps {
  component: "select";
}
interface ChecklistConfig extends ChecklistProps {
  component: "checklist";
}

interface TabsConfig extends TabsProps {
  component: "tabs";
}

export type SimpleFieldConfig =
  | HeaderConfig
  | ChipConfig
  | SwitchConfig
  | RadioConfig
  | TextFieldConfig
  | SelecttFieldConfig
  | ChecklistConfig
  | DatetimeConfig
  | TabsConfig;

export type ComposedFieldConfig = {
  component: "composed";
  name: string;
  fields: FieldConfig[];
};

export type FieldConfig = SimpleFieldConfig | ComposedFieldConfig;

export const Field: FunctionComponent<SimpleFieldConfig> = (props) => {
  switch (props.component) {
    case "header":
      return <Header {...props} />;
    case "chip":
      return <Chip {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "radio":
      return <RadioGroup {...props} />;
    case "textfield":
      return <TextField {...props} />;
    case "select":
      return <Select {...props} />;
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
      field.component === "composed" ? (
        <Fields key={index} fields={field.fields} />
      ) : (
        <Grid key={index} item>
          <Field {...field} />
        </Grid>
      )
    )}
  </>
);
