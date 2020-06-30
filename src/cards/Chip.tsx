import React from "react";
import { Styled } from "./FieldComponent";
import { ChipProps as MuiChipProps, Chip as MuiChip } from "@material-ui/core";

export interface ChipProps extends Styled {
  props: Pick<MuiChipProps, "label" | "className">;
}

export const Chip = (props: ChipProps) => <MuiChip {...props.props} />;
