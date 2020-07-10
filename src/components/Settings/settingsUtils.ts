import { FieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { composedSettings } from "components/Settings/ComposedFieldSettings";
import { textFieldSettings } from "components/Settings/TextFieldSettings";

export const fieldSettingsLabel = (field: FieldConfig) =>
  field.type === "composed"
    ? field.name
    : field.type === "textfield"
    ? field.props.label || field.props.placeholder
    : null;

export const fieldSettings = ({
  classes,
  field,
}: FieldSettingsProps): FieldConfig[] =>
  field.type === "composed"
    ? composedSettings(classes, field)
    : field.type === "textfield"
    ? textFieldSettings(field.props)
    : [];
