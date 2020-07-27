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

export interface TextFieldFormValues {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}
interface SelectProviderValues {
  provider: string;
}
export type SettingsForm =
  | TextFieldFormValues
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
    : field.component === "textfield"
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
    : [];
