import { FieldConfig, ComposedFieldConfig } from "components/FieldComponent";

export type DatasourceProviderType = "geocoding";
export interface DatasourceProviderField {
  provider: DatasourceProviderType;
  value: string;
  label?: string;
  helperText?: string;
}
export interface DatasourceProviderValues {
  datasourceProvider?: DatasourceProviderField;
}
const geoServiceProvider = {
  props: { label: "Provider", helperText: "Geo service provider" },
  values: [
    { label: "Google Maps", value: "google" },
    { label: "Mapbox", value: "mapbox" },
    { label: "Yandex Maps", value: "yandex" },
  ],
};

export const datasourceProvider = (name: DatasourceProviderType) => {
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
  ...datasourceProvider(
    field.datasourceProvider?.provider as DatasourceProviderType
  ),
});
