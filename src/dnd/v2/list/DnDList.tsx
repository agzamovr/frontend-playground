import React, { Fragment, FunctionComponent } from "react";
import { DragHandle } from "dnd/v2/Draggable";
import { Box } from "@material-ui/core";
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
  useDnDItemPlaceholder,
  useRegisterDraggables,
} from "dnd/v2/list/dndListHooks";
import { DataBlockIdProps, useDataBlockId } from "components/DataBlockID";
import { DropPlaceholder } from "dnd/v2/DnDPlaceholder";

type ItemPropsKeys = "disabled" | "dense" | "selected";
type ItemProps = Pick<MuiListItemProps, ItemPropsKeys>;
export type ListItemProp = DataBlockIdProps & {
  props?: ItemProps;
  control: CheckboxConfig | TextFieldConfig;
  subList?: ListProps;
};
export interface ListProps {
  items: ListItemProp[];
}
const DnDListItem = ({ blockId, control, subList, props }: ListItemProp) => {
  const { id, setRef } = useDataBlockId(blockId);
  const {
    showDividerTop,
    showDividerBottom,
    showDividerChild,
  } = useDnDItemPlaceholder(id);
  return (
    <MuiListItem
      {...props}
      ref={setRef}
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
        <Box>
          <DragHandle draggableId={id} />
        </Box>
        <DropPlaceholder show={showDividerChild} isChild={true} />
      </Grid>
      <DropPlaceholder
        show={showDividerTop || showDividerBottom}
        isTop={showDividerTop}
      />
      {subList && subList.items && <DnDListComponent {...subList} />}
    </MuiListItem>
  );
};

const DnDListComponent: FunctionComponent<ListProps> = (props) =>
  props.items.length > 0 ? (
    <MuiList>
      {props.items.map((item, index) => (
        <Fragment key={index}>
          <DnDListItem {...item} />
        </Fragment>
      ))}
    </MuiList>
  ) : null;

export const DnDList: FunctionComponent<ListProps> = (props) => {
  useRegisterDraggables(props);
  return <DnDListComponent {...props} />;
};
