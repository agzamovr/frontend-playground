import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";
import { FieldSettingsProps } from "components/Settings/FieldSettings";
import { composedSettings } from "components/Settings/ComposedFieldSettings";

export const sizeSettings = (
  classes: FieldSettingsProps["classes"],
  composedField: ComposedFieldConfig
): FieldConfig[] => [
  {
    component: "select",
    props: { label: "Unit", helperText: "Unit of measure" },
    groupBy: true,
    values: [
      { group: "International", label: "Nanometer (nm)", value: "nm" },
      { group: "International", label: "Micrometer (µm)", value: "µm" },
      { group: "International", label: "Millimeter (mm)", value: "mm" },
      { group: "International", label: "Centimeter (cm)", value: "cm" },
      { group: "International", label: "Decimeter (dm)", value: "dm" },
      { group: "International", label: "Meter (m)", value: "m" },
      { group: "International", label: "Decameter (dam)", value: "dam" },
      { group: "International", label: "Hectometer (hm)", value: "hm" },
      { group: "International", label: "Kilometer (km)", value: "km" },

      { group: "Imperial", label: "Inch (in)", value: "inch" },
      { group: "Imperial", label: "Foot (ft)", value: "ft" },
      { group: "Imperial", label: "Yard (yd)", value: "yd" },
      { group: "Imperial", label: "Mile (mi)", value: "mi" },
    ],
  },
  ...composedSettings(classes, composedField),
];
