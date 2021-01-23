import React, { Fragment, FunctionComponent, useContext } from "react";
import { DragHandle } from "dnd/v2/Draggable";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  List as MuiList,
  ListItemProps as MuiListItemProps,
  ListItem as MuiListItem,
} from "@material-ui/core";
import {
  CheckboxConfig,
  Field,
  TextFieldConfig,
} from "components/FieldComponent";
import {
  DnDListItemType,
  ListDnDContext,
  useRegisterDraggables,
} from "components/List/dndListHooks";
import { DataBlockIdProps, useDataBlockId } from "components/DataBlockID";
import {
  StyledDropPlaceholder,
  useDnDItemPlaceholder,
} from "dnd/v2/DnDPlaceholder";

type ItemPropsKeys = "disabled" | "dense" | "selected";
type ItemProps = Pick<MuiListItemProps, ItemPropsKeys>;
export type ListItemProps = Required<DataBlockIdProps> & {
  props?: ItemProps;
  control: CheckboxConfig | TextFieldConfig;
  subList?: ListItems;
};
interface ListItems {
  items: ListItemProps[];
}

export type ListProps = ListItems & {
  dndEnabled: boolean;
};

type DropPlaceholderProps = {
  show: boolean;
  isTop?: boolean;
  isNested?: boolean;
};
const DropPlaceholder = ({ show, isTop, isNested }: DropPlaceholderProps) =>
  show ? <StyledDropPlaceholder isTop={isTop} isNested={isNested} /> : null;

const ListItem = ({ blockId, control, subList, props }: ListItemProps) => {
  const { id, setRef } = useDataBlockId(blockId);
  const listDndContext = useContext(ListDnDContext);
  const {
    showTopPlaceholder,
    showBottomPlaceholder,
    showNestedPlaceholder,
  } = useDnDItemPlaceholder(id, DnDListItemType, true);
  return (
    <MuiListItem
      {...props}
      ref={(element) => listDndContext && setRef(element)}
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
          <Field {...control} />
        </Box>
        {listDndContext && (
          <Box>
            <DragHandle draggableId={id} />
          </Box>
        )}
        <DropPlaceholder
          show={listDndContext && showNestedPlaceholder}
          isNested={true}
        />
      </Grid>
      <DropPlaceholder
        show={listDndContext && (showTopPlaceholder || showBottomPlaceholder)}
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
          <ListItem {...item} />
        </Fragment>
      ))}
    </MuiList>
  ) : null;

export const List: FunctionComponent<ListProps> = (props) => {
  useRegisterDraggables(props);
  return (
    <ListDnDContext.Provider value={props.dndEnabled}>
      <ListComponent {...props} />
    </ListDnDContext.Provider>
  );
};
