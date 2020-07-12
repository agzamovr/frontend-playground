import { FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import { textFieldSettings } from "components/Settings/TextFieldSettings";
import { sizeSettings } from "components/Settings/SizeSettings";
import { contactSettings } from "components/Settings/ContactSettings";
import { addressSettings } from "components/Settings/AddressSettings";

export const cardinalitySelector = (): FieldConfig => ({
  component: "radio",
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

export const fieldSettingsLabel = (field: FieldConfig) =>
  field.component === "composed"
    ? field.name
    : field.component === "textfield"
    ? field.props.label || field.props.placeholder
    : null;

export const fieldSettings = ({
  classes,
  field,
}: FieldSettingsProps): FieldConfig[] =>
  field.component === "composed"
    ? field.name === "Size"
      ? sizeSettings(classes, field)
      : field.name === "Contact"
      ? contactSettings(classes, field)
      : field.name === "Address"
      ? addressSettings(classes, field)
      : composedSettings(classes, field)
    : field.component === "textfield"
    ? textFieldSettings(field.props)
    : [];
