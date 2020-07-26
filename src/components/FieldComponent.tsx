import React, { FunctionComponent } from "react";

import { ChipProps, Chip } from "components/Chip";
import { HeaderProps, Header } from "components/Header";
import { DatetimeProps, Datetime } from "components/Datetime";
import { TextfieldProps, TextField } from "components/TextField/TextField";
import { ChecklistProps, Checklist } from "components/Checklist";
import { SwitchProps, Switch } from "components/Switch/Switch";
import { Grid } from "@material-ui/core";
import { TabsProps, Tabs } from "components/Tabs/Tabs";
import { SelectProps, Select } from "components/Select/Select";
import { RadioGroup, RadioGroupProps } from "components/RadioGroup/RadioGroup";
import { UnitOfMeasureValues } from "components/Settings/uom/unitOfMeasures";
import { CardinalityValues } from "components/Settings/cardinality/cardinality";
import { DatasourceProviderValues } from "components/Settings/datasourceProvider/datasourceProvider";

interface FormName {
  name: string;
}
interface HeaderConfig extends HeaderProps, FormName {
  component: "header";
}

interface ChipConfig extends ChipProps, FormName {
  component: "chip";
}

export interface SwitchConfig extends SwitchProps, FormName {
  component: "switch";
}
export interface RadioConfig extends RadioGroupProps, FormName {
  component: "radio";
}
interface DatetimeConfig extends DatetimeProps, FormName {
  component: "datetime";
}
export interface TextFieldConfig extends TextfieldProps, FormName {
  component: "textfield";
}
export interface SelecttFieldConfig extends SelectProps, FormName {
  component: "select";
}
interface ChecklistConfig extends ChecklistProps, FormName {
  component: "checklist";
}

interface TabsConfig extends TabsProps, FormName {
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
  label: string;
  fields: FieldConfig[];
} & CardinalityValues &
  UnitOfMeasureValues &
  DatasourceProviderValues;

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
interface FieldsProps {
  fields: FieldConfig[];
}
const applyCompositeSubfieldsProps = (
  compositeField: ComposedFieldConfig
): FieldConfig[] =>
  compositeField.fields.map((field) =>
    field.component === "textfield"
      ? {
          ...field,
          props: {
            ...field.props,
            end: { text: compositeField.unitOfMeasure?.value },
          },
        }
      : field
  );
export const Fields: FunctionComponent<FieldsProps> = ({ fields }) => (
  <>
    {fields.map((field, index) =>
      field.component === "composed" ? (
        <Fields key={index} fields={applyCompositeSubfieldsProps(field)} />
      ) : (
        <Grid key={index} item>
          <Field {...field} />
        </Grid>
      )
    )}
  </>
);
