import React, { Fragment, FunctionComponent } from "react";
import { DataBlockIdProps, useDataBlockId } from "../DataBlockID";
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
type DropPlaceholderProps = {
  show: boolean;
  isTop?: boolean;
  isChild?: boolean;
};

const DropPlaceholder = ({ show, isTop, isChild }: DropPlaceholderProps) => {
  const styles = isTop ? { top: 0 } : { bottom: "-4px" };
  return show ? (
    <Box
      flexGrow={1}
      style={{
        pointerEvents: "none",
        background: "rgba(46, 170, 220, 0.5)",
        height: "4px",
        position: "absolute",
        left: isChild ? "4px" : 0,
        right: isChild ? "10px" : 0,
        ...styles,
      }}
    ></Box>
  ) : null;
};
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
      <DropPlaceholder show={showDividerTop} isTop={true} />
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
      <DropPlaceholder show={showDividerBottom} />
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
