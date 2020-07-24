import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";

export type UnitOfMeasurType = "length" | "currency";

type UnitOfMeasure = {
  group?: string;
  label: string;
  value: string;
};

const lengthUnits: UnitOfMeasure[] = [
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
];

const currencies: UnitOfMeasure[] = [];

export const unitOfMeasure = (name: UnitOfMeasurType): UnitOfMeasure[] => {
  switch (name) {
    case "length":
      return lengthUnits;
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
  field: ComposedFieldConfig
): FieldConfig => ({
  component: "select",
  name: `${field.name}.unitOfMeasure.value`,
  props: {
    label: "Unit",
    helperText: "Unit of measure",
  },
  groupBy: true,
  values: field.unitOfMeasure ? unitOfMeasure(field.unitOfMeasure?.unit) : [],
});
