import { FieldConfig, DatetimeConfig } from "components/FieldComponent";
import { SettingsFormValues } from "components/Settings/settingsUtils";

export const dateTimeSettingsValues = (
  config: DatetimeConfig
): SettingsFormValues => ({
  [config.name]: {
    label: config.props.label ?? "",
    placeholder: config.props.placeholder ?? "",
    helperText: config.props.helperText ?? "",
    ampm: config.props.ampm ?? false,
    disablePast: config.props.disablePast ?? false,
    disableFuture: config.props.disableFuture ?? false,
    required: config.props.required ?? false,
  },
});

export const dateTimeSettings = (namePrefix: string): FieldConfig[] => [
  {
    component: "textfield",
    name: `${namePrefix}.label`,
    props: {
      label: "Label",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.placeholder`,
    props: {
      label: "Placeholder",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.helperText`,
    props: {
      label: "Help text",
    },
  },
  {
    component: "textfield",
    name: `${namePrefix}.tooltip`,
    props: { label: "Tooltip" },
  },
  {
    component: "switch",
    name: `${namePrefix}.ampm`,
    props: { color: "primary" },
    formControlProps: { label: "Use AM/PM" },
  },
  {
    component: "switch",
    name: `${namePrefix}.disablePast`,
    props: { color: "primary" },
    formControlProps: { label: "Disable past" },
  },
  {
    component: "switch",
    name: `${namePrefix}.disableFuture`,
    props: { color: "primary" },
    formControlProps: { label: "Disable future" },
  },
  {
    component: "switch",
    name: `${namePrefix}.required`,
    props: { color: "primary" },
    formControlProps: { label: "Required" },
  },
];
