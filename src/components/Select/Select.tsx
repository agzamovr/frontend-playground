import React, { FunctionComponent, Fragment, forwardRef } from "react";
import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  ListSubheader,
} from "@material-ui/core";
import { Styled } from "components/FieldComponent";
import { TextfieldProps, TextField } from "components/TextField/TextField";

type MenuItemProps = {
  group?: string;
  label: string;
  value: NonNullable<MuiMenuItemProps["value"]>;
};

type SubMenuItemProps = Pick<MenuItemProps, "label" | "value">;

export interface SelectProps extends Styled {
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

const GroupedList = forwardRef<HTMLLIElement, Pick<SelectProps, "values">>(
  ({ values }, ref) => (
    <>
      {Object.entries(groupBy(values)).map(([key, values], index) => (
        <Fragment key={index}>
          <ListSubheader ref={ref}>{key}</ListSubheader>
          {values.map(({ label, value }: SubMenuItemProps, index) => (
            <MuiMenuItem value={value} key={index}>
              {label}
            </MuiMenuItem>
          ))}
        </Fragment>
      ))}
    </>
  )
);

const FlatList = forwardRef<HTMLLIElement, Pick<SelectProps, "values">>(
  ({ values }, ref) => (
    <>
      {values.map(({ label, value }, index) => (
        <MuiMenuItem ref={ref} value={value} key={index}>
          {label}
        </MuiMenuItem>
      ))}
    </>
  )
);

export const Select: FunctionComponent<SelectProps> = ({
  props,
  groupBy = false,
  values,
}) => (
  <TextField props={{ ...props, select: true }}>
    {groupBy ? <GroupedList values={values} /> : <FlatList values={values} />}
  </TextField>
);
