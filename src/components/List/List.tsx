import React, { Fragment, FunctionComponent, useContext } from "react";
import { DragHandle } from "dnd/v2/Draggable";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  List as MuiList,
  ListItemProps as MuiListItemProps,
  ListItem as MuiListItem,
  Typography as MuiTypography,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import {
  DnDListItemType,
  useRegisterDraggables,
} from "components/List/dndListHooks";
import { DataBlockIdProps, useDataBlockId } from "components/DataBlockID";
import {
  StyledDropPlaceholder,
  useDnDItemPlaceholder,
} from "dnd/v2/DnDPlaceholder";
import { FormField } from "components/Form/FormField";

type ListTypes = "checklist" | "ordered" | "unordered";
export type ListItemProps = Required<DataBlockIdProps> & {
  name: string;
  label: string;
  subList?: ListItems;
};
export interface ListItems {
  listType: ListTypes;
  items: ListItemProps[];
}

type ListItemComponentProps = ListItems & ListItemProps;

export type ListProps = ListItems & {
  editable: boolean;
};

type DropPlaceholderProps = {
  show: boolean;
  isTop?: boolean;
  isNested?: boolean;
};
const DropPlaceholder = ({ show, isTop, isNested }: DropPlaceholderProps) =>
  show ? <StyledDropPlaceholder isTop={isTop} isNested={isNested} /> : null;

const ListItem = ({
  blockId,
  label,
  name,
  listType,
  subList,
}: ListItemComponentProps) => {
  const { id, setRef } = useDataBlockId(blockId);
  const editable = useContext(ListContext);
  const {
    showTopPlaceholder,
    showBottomPlaceholder,
    showNestedPlaceholder,
  } = useDnDItemPlaceholder(id, DnDListItemType, true);
  return (
    <MuiListItem
      ref={(element) => editable && setRef(element)}
      style={{
        display: "block",
        paddingRight: 0,
        position: "relative",
      }}
    >
      <Grid
        container
        alignItems="center"
        wrap="nowrap"
        data-droppable="true"
        style={{ position: "relative" }}
      >
        <Box flexGrow={1}>
          {listType === "checklist" && <MuiCheckbox />}
          {editable ? (
            <FormField
              component="textfield"
              name={name}
              props={{ value: label }}
            />
          ) : (
            <MuiTypography component="span">{label}</MuiTypography>
          )}
        </Box>
        {editable && (
          <Box>
            <DragHandle draggableId={id} />
          </Box>
        )}
        <DropPlaceholder
          show={editable && showNestedPlaceholder}
          isNested={true}
        />
      </Grid>
      <DropPlaceholder
        show={editable && (showTopPlaceholder || showBottomPlaceholder)}
        isTop={showTopPlaceholder}
      />
      {subList && <ListComponent {...subList} />}
    </MuiListItem>
  );
};

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

const ListContext = React.createContext<boolean>(false);
export const List: FunctionComponent<ListProps> = (props) => {
  useRegisterDraggables(props);
  return (
    <ListContext.Provider value={props.editable}>
      <ListComponent {...props} />
    </ListContext.Provider>
  );
};
