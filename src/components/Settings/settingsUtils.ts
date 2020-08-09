import { FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import {
  composedSettings,
  composedFieldSettingsValues,
} from "components/Settings/ComposedFieldSettings";
import {
  textFieldSettings,
  textFieldSettingsValues,
} from "components/Settings/TextFieldSettings";

import { UnitOfMeasureValues } from "components/Settings/uom/unitOfMeasures";
import { CardinalityValues } from "components/Settings/cardinality/cardinality";
import {
  dateTimeSettings,
  dateTimeSettingsValues,
} from "components/Settings/DateTimeFieldSettings";
import { listSettings } from "components/Settings/ListSettings";

export interface TextFieldFormValues {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}

export interface DateTimeFieldFormValues {
  label: string;
  placeholder: string;
  helperText: string;
  ampm: boolean;
  disablePast: boolean;
  disableFuture: boolean;
  required: boolean;
}
interface SelectProviderValues {
  provider: string;
}
export type SettingsForm =
  | TextFieldFormValues
  | DateTimeFieldFormValues
  | UnitOfMeasureValues
  | SelectProviderValues
  | CardinalityValues;
export type SettingsFormValues = {
  [k: string]: SettingsForm | SettingsFormValues;
};

const fieldSettingsInitialValue = (
  field: FieldConfig
): SettingsFormValues | null =>
  field.component === "composed"
    ? composedFieldSettingsValues(field)
    : field.component === "textfield"
    ? textFieldSettingsValues(field)
    : field.component === "datetime"
    ? dateTimeSettingsValues(field)
    : null;

export const fieldsSettingsInitialValues = (
  fields: FieldConfig[]
): SettingsFormValues =>
  fields.reduce(
    (acc, field) => Object.assign(acc, fieldSettingsInitialValue(field)),
    {}
  );

export const fieldSettingsLabel = (field: FieldConfig) =>
  field.component === "composed"
    ? field.label
    : field.component === "textfield" || field.component === "datetime"
    ? field.props.label || field.props.placeholder
    : null;

export const fieldSettings = ({
  classes,
  namePrefix = "",
  field,
}: FieldSettingsProps): FieldConfig[] =>
  field.component === "composed"
    ? composedSettings(classes, field)
    : field.component === "textfield"
    ? textFieldSettings(field, namePrefix)
    : field.component === "datetime"
    ? dateTimeSettings(`${namePrefix}${field.name}`)
    : field.component === "list"
    ? listSettings(field)
    : [];
