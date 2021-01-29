import React, { Fragment, FunctionComponent } from "react";
import { DragHandle } from "dnd/v2/Draggable";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  List as MuiList,
  ListItem as MuiListItem,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import {
  DnDListItemType,
  useRegisterDraggables,
} from "components/List/dndListHooks";
import { useDataBlockId } from "components/DataBlockID";
import {
  StyledDropPlaceholder,
  useDnDItemPlaceholder,
} from "dnd/v2/DnDPlaceholder";
import { FormField } from "components/Form/FormField";
import {
  ListProps,
  ListItemComponentProps,
  ListItems,
} from "components/List/List";

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
  const {
    showTopPlaceholder,
    showBottomPlaceholder,
    showNestedPlaceholder,
  } = useDnDItemPlaceholder(id, DnDListItemType, true);
  return (
    <MuiListItem
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
          {listType === "checklist" && <MuiCheckbox />}
          <FormField
            component="textfield"
            name={name}
            props={{ value: label }}
          />
        </Box>

        <Box>
          <DragHandle draggableId={id} />
        </Box>

        <DropPlaceholder show={showNestedPlaceholder} isNested={true} />
      </Grid>
      <DropPlaceholder
        show={showTopPlaceholder || showBottomPlaceholder}
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

export const EditableList: FunctionComponent<ListProps> = (props) => {
  useRegisterDraggables(props);
  return <ListComponent {...props} />;
};
