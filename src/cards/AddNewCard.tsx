import React, { MouseEventHandler, FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#0075FF",
    maxWidth: 360,
    minWidth: 300,
    minHeight: 150,
    border: "1px dashed #C4CDD5",
    borderRadius: 4,
  },
});

export interface AddNewCardProps {
  onClick: MouseEventHandler;
}

export const AddNewCard: FunctionComponent<AddNewCardProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="outlined" onClick={onClick}>
      <AddIcon /> Add Card
    </Button>
  );
};
