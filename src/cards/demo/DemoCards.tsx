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

export interface CardConfig {
  title: string;
  fields: FieldConfig[];
}

const cards: CardConfig[] = [
  HeaderDescriptionCardConfig,
  ChecklistCardConfig,
  CustomerCardConfig,
  VenueCardConfig,
  ProductCardConfig,
];

export const DemoCards = () => (
  <Box p={1}>
    <Grid container spacing={1} direction="column">
      <Grid item>
        <SearchInput />
      </Grid>
      {cards.map(({ title, fields }, index) => (
        <Grid item key={index}>
          <SelectableCard title={title} fields={fields} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
