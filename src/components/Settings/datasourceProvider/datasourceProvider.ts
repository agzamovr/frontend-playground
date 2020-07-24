import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";

export type DatasourceProviderType = "geocoding";

type DatasourceProvider = {
  label: string;
  value: string;
};

export interface DatasourceProviderField {
  provider: DatasourceProviderType;
  value: string;
  label?: string;
  helperText?: string;
}
export interface DatasourceProviderValues {
  datasourceProvider?: DatasourceProviderField;
}
const geoServiceProvider: DatasourceProvider[] = [
  { label: "Google Maps", value: "google" },
  { label: "Mapbox", value: "mapbox" },
  { label: "Yandex Maps", value: "yandex" },
];

export const datasourceProvider = (
  name: DatasourceProviderType
): DatasourceProvider[] => {
  switch (name) {
    case "geocoding":
      return geoServiceProvider;
  }
};
export const datasoruceProvider = (
  field: ComposedFieldConfig
): FieldConfig => ({
  component: "select",
  name: `${field.name}.datasourceProvider.value`,
  props: {
    label: "Provider",
    helperText: "Geo service provider",
  },
  values: field.datasourceProvider
    ? datasourceProvider(field.datasourceProvider.provider)
    : [],
});
