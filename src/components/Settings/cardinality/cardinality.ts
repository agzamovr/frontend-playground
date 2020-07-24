import { ComposedFieldConfig, FieldConfig } from "components/FieldComponent";

export type CardinalityType = "" | "single" | "multiple";

export interface CardinalityValues {
  cardinality?: CardinalityType;
}

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
