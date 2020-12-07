import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AlbumIcon from "@material-ui/icons/Album";
import StarBorder from "@material-ui/icons/StarBorder";
import { DnDContext } from "dnd/v1/DnDContext";
import { Draggable } from "dnd/v1/Draggable";
import { Droppable } from "dnd/v1/Droppable";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grey from "@material-ui/core/colors/grey";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <DnDContext onDragEnd={() => {}}>
      <Droppable droppableId="0">
        {(innerRef, placeholder) => (
          <List
            ref={innerRef}
            component="nav"
            style={{ display: "flex", flexDirection: "column" }}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
            className={classes.root}
          >
            <Draggable draggableId="0">
              {(innerRef) => (
                <ListItem button>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sent mail" />
                  <DragIndicatorIcon
                    style={{ color: Grey[500] }}
                    ref={innerRef}
                  />
                </ListItem>
              )}
            </Draggable>
            <Draggable draggableId="2">
              {(innerRef) => (
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                  <DragIndicatorIcon
                    style={{ color: Grey[500] }}
                    ref={innerRef}
                  />
                </ListItem>
              )}
            </Draggable>
            <Draggable draggableId="3">
              {(innerRef) => (
                <>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <DragIndicatorIcon
                      style={{ color: Grey[500] }}
                      ref={innerRef}
                    />
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Droppable droppableId="1">
                      {(innerRef, placeholder) => (
                        <List
                          ref={innerRef}
                          component="div"
                          disablePadding
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Draggable draggableId="0">
                            {(innerRef) => (
                              <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                                <DragIndicatorIcon
                                  style={{ color: Grey[500] }}
                                  ref={innerRef}
                                />
                              </ListItem>
                            )}
                          </Draggable>
                          <Draggable draggableId="1">
                            {(innerRef) => (
                              <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                  <AlbumIcon />
                                </ListItemIcon>
                                <ListItemText primary="Album" />
                                <DragIndicatorIcon
                                  style={{ color: Grey[500] }}
                                  ref={innerRef}
                                />
                              </ListItem>
                            )}
                          </Draggable>
                          {placeholder}
                        </List>
                      )}
                    </Droppable>
                  </Collapse>
                </>
              )}
            </Draggable>
            {placeholder}
          </List>
        )}
      </Droppable>
    </DnDContext>
  );
}
