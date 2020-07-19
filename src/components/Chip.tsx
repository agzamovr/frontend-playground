import React from "react";
import { ChipProps as MuiChipProps, Chip as MuiChip } from "@material-ui/core";

export interface ChipProps {
  props: Pick<MuiChipProps, "label" | "className">;
}

export const Chip = (props: ChipProps) => <MuiChip {...props.props} />;
