import {
  FieldConfig,
  ComposedFieldConfig,
  TextFieldConfig,
} from "components/FieldComponent";

export type UnitOfMeasurType = "length" | "currency" | "weight";

type UnitOfMeasure = {
  group?: string;
  label: string;
  value: string;
};

const lengthUnits = {
  props: { label: "Unit", helperText: "Unit of measure" },
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
};

const weightUnits = {
  props: { label: "Unit", helperText: "Unit of measure" },
  values: [
    { group: "International", label: "Nanogram (nm)", value: "ng" },
    { group: "International", label: "Microgram (µm)", value: "µg" },
    { group: "International", label: "Milligram (mg)", value: "mg" },
    { group: "International", label: "Gram (g)", value: "g" },
    { group: "International", label: "Kilogram (kg)", value: "kg" },
    { group: "International", label: "Metric ton (t)", value: "t" },

    { group: "Imperial", label: "Ounce (oz)", value: "oz" },
    { group: "Imperial", label: "Pound (lb)", value: "lb" },
    { group: "Imperial", label: "Quarter (qtr)", value: "qtr" },
    { group: "Imperial", label: "Long ton (lt)", value: "lt" },
  ],
};

const currencies = {
  props: { label: "Currency" },
  values: [
    {
      label: "USA Dollar",
      value: "USD",
    },
    {
      label: "Euro",
      value: "EUR",
    },
    {
      label: "Japanese yen",
      value: "JPY",
    },
    {
      label: "Pound sterling",
      value: "GBP",
    },
    {
      label: "Renminbi",
      value: "CNY",
    },
    {
      label: "Canadian dollar",
      value: "CAD",
    },
    {
      label: "Swiss franc",
      value: "CHF",
    },
    {
      label: "Ruble",
      value: "RUB",
    },
  ],
};

export const unitOfMeasure = (name: UnitOfMeasurType) => {
  switch (name) {
    case "length":
      return lengthUnits;
    case "weight":
      return weightUnits;
    case "currency":
      return currencies;
  }
};

export interface UnitOfMeasureField {
  unit: UnitOfMeasurType;
  value: string;
}

export interface UnitOfMeasureValues {
  unitOfMeasure?: UnitOfMeasureField;
}

export const uniOfMeasureSelector = (
  field: ComposedFieldConfig | TextFieldConfig
): FieldConfig => ({
  component: "select",
  name: `${field.name}.unitOfMeasure.value`,
  groupBy: true,
  ...unitOfMeasure(field.unitOfMeasure?.unit as UnitOfMeasurType),
});
