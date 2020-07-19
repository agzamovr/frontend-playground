import React, { FunctionComponent } from "react";
import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  ListSubheader,
  FormControl as MuiFormControl,
} from "@material-ui/core";
import { TextfieldProps, TextField } from "components/TextField/TextField";

type MenuItemProps = {
  group?: string;
  label: string;
  value: NonNullable<MuiMenuItemProps["value"]>;
};

type SubMenuItemProps = Pick<MenuItemProps, "label" | "value">;

export interface SelectProps {
  props: TextfieldProps["props"];
  groupBy?: boolean;
  values: MenuItemProps[];
}

const groupBy = (
  values: MenuItemProps[]
): Record<string, SubMenuItemProps[]> => {
  const map: Record<string, SubMenuItemProps[]> = {};
  values.forEach(({ group, label, value }) => {
    const key = group || "";
    const collection = map[key];
    if (!collection) {
      map[key] = [{ label, value }];
    } else {
      collection.push({ label, value });
    }
  });
  return map;
};

const flatList = (values: SelectProps["values"]) =>
  values.map(({ label, value }) => (
    <MuiMenuItem value={value} key={label}>
      {label}
    </MuiMenuItem>
  ));

const groupedList = (values: SelectProps["values"]) =>
  Object.entries(groupBy(values))
    .map(([key, values]) => [
      <ListSubheader key={key}>{key}</ListSubheader>,
      flatList(values),
    ])
    .flat(Infinity);

export const Select: FunctionComponent<SelectProps> = ({
  props,
  groupBy = false,
  values,
}) => (
  <MuiFormControl>
    <TextField props={{ ...props, select: true }}>
      {groupBy ? groupedList(values) : flatList(values)}
    </TextField>
  </MuiFormControl>
);
