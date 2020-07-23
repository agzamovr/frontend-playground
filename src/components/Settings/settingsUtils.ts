import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import {
  textFieldSettings,
  textFieldSettingsValues,
} from "components/Settings/TextFieldSettings";
import {
  sizeSettings,
  sizeSettingsValues,
} from "components/Settings/SizeSettings";
import {
  contactSettings,
  contactSettingsValues,
} from "components/Settings/ContactSettings";
import {
  addressSettings,
  addressSettingsValues,
} from "components/Settings/AddressSettings";

export const cardinalitySelector = (
  field: ComposedFieldConfig
): FieldConfig => ({
  component: "radio",
  name: `${field.name}.cardinality`,
  props: { row: true },
  values: [
    {
      label: "Single",
      value: "single",
      props: { size: "small", color: "primary" },
    },
    {
      label: "Multiple",
      value: "multiple",
      props: { size: "small", color: "primary" },
    },
  ],
});

export interface TextFieldFormValues {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
}
interface UnitOfMeasureValues {
  unit: string;
}
interface SelectProviderValues {
  provider: string;
}
interface CardinalityValues {
  cardinality: "" | "single" | "multiple";
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
    ? field.name === "size"
      ? sizeSettingsValues(field)
      : field.name === "contact"
      ? contactSettingsValues(field)
      : field.name === "address"
      ? addressSettingsValues(field)
      : fieldsSettingsInitialValues(field.fields)
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
  namePrefix,
  field,
}: FieldSettingsProps): FieldConfig[] =>
  field.component === "composed"
    ? field.name === "size"
      ? sizeSettings(classes, field)
      : field.name === "contact"
      ? contactSettings(classes, field)
      : field.name === "address"
      ? addressSettings(classes, field)
      : composedSettings(classes, field)
    : field.component === "textfield"
    ? textFieldSettings(`${namePrefix}${field.name}`)
    : [];
