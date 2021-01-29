import React, { Fragment, FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  List as MuiList,
  ListItem as MuiListItem,
  Typography as MuiTypography,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import { DataBlockIdProps } from "components/DataBlockID";
import { EditableList } from "components/List/EditableList";

export type ListTypes = "checklist" | "ordered" | "unordered";
export type ListItemProps = Required<DataBlockIdProps> & {
  name: string;
  label: string;
  subList?: ListItems;
};
export interface ListItems {
  listType: ListTypes;
  items: ListItemProps[];
}

export type ListItemComponentProps = ListItems & ListItemProps;

export type ListProps = ListItems & {
  editable: boolean;
};

const ListItem = ({ label, listType, subList }: ListItemComponentProps) => (
  <MuiListItem
    style={{
      display: "block",
      paddingRight: 0,
    }}
  >
    <Grid container alignItems="center" wrap="nowrap">
      <Box flexGrow={1}>
        {listType === "checklist" && <MuiCheckbox />}
        <MuiTypography component="span">{label}</MuiTypography>
      </Box>
    </Grid>
    {subList && <ListComponent {...subList} />}
  </MuiListItem>
);

const ListComponent: FunctionComponent<ListItems> = (props) =>
  props.items.length > 0 ? (
    <MuiList disablePadding={true}>
      {props.items.map((item, index) => (
        <Fragment key={index}>
          <ListItem {...props} {...item} />
        </Fragment>
      ))}
    </MuiList>
  ) : null;

export const List: FunctionComponent<ListProps> = (props) =>
  props.editable ? <EditableList {...props} /> : <ListComponent {...props} />;
