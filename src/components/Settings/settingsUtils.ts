import { FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import { textFieldSettings } from "components/Settings/TextFieldSettings";
import { sizeSettings } from "components/Settings/SizeSettings";

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
      : composedSettings(classes, field)
    : field.component === "textfield"
    ? textFieldSettings(field.props)
    : [];
