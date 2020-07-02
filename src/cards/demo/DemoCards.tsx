import React from "react";
import { SelectableCard } from "cards/SelectableCard";
import { FieldConfig } from "cards/FieldComponent";
import { CustomerCardConfig } from "cards/demo/CustomerCard";
import { HeaderDescriptionCardConfig } from "cards/demo/HeaderDescriptionCard";
import { Grid, Box } from "@material-ui/core";
import SearchInput from "cards/SearchInput";
import { ChecklistCardConfig } from "cards/demo/ChecklistCard";
import { VenueCardConfig } from "cards/demo/VenueCard";
import { ProductCardConfig } from "cards/demo/ProductCard";
import { templateActions } from "template/redux/templateReducer";
import { useDispatch } from "react-redux";

export interface CardConfig {
  title: string;
  fields: FieldConfig[];
}
export type DemoCardKeys =
  | "description"
  | "checklist"
  | "customer"
  | "venue"
  | "product";
export const DemoCardList: Record<DemoCardKeys, CardConfig> = {
  description: HeaderDescriptionCardConfig,
  checklist: ChecklistCardConfig,
  customer: CustomerCardConfig,
  venue: VenueCardConfig,
  product: ProductCardConfig,
} as const;

export const DemoCards = () => {
  const dispatcher = useDispatch();
  const handleSelect = (key: DemoCardKeys, selected: boolean) => {
    selected
      ? dispatcher(templateActions.addCard(key))
      : dispatcher(templateActions.removeCard(key));
  };
  return (
    <Box p={1}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <SearchInput />
        </Grid>
        {Object.entries(DemoCardList).map(([key, { title, fields }], index) => (
          <Grid item key={index}>
            <SelectableCard
              title={title}
              fields={fields}
              onSelect={(selected) =>
                handleSelect(key as DemoCardKeys, selected)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
