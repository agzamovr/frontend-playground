import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 0",
      display: "flex",
      alignItems: "center",
      maxWidth: 345,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

export default function SearchInput() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <InputBase
        className={classes.input}
        placeholder="Search Cards"
        type="search"
        inputMode="search"
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Card>
  );
}
