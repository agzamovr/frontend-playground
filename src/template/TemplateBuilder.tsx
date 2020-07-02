import React, { FunctionComponent, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Fab,
  Grid,
  Box,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CheckIcon from "@material-ui/icons/Check";
import { DemoCards } from "cards/demo/DemoCards";
import { AddNewCard } from "cards/AddNewCard";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { Store } from "redux/store";
import { TemplateCard } from "template/TemplateCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export const TemplateBuilder: FunctionComponent = () => {
  const dispatcher = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const cards = useSelector(({ template }: Store) => template.cards);

  const handleFabClick = () => {
    setOpen(false);
    dispatcher(templateActions.addSelectedCards());
  };

  return (
    <>
      <Box p={2}>
        <Grid container spacing={2}>
          {cards.map(({ title, fields }, index) => (
            <Grid item key={index}>
              <TemplateCard title={title} fields={fields} />
            </Grid>
          ))}
          <Grid item>
            <AddNewCard onClick={() => setOpen(true)} />
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor="right" open={isOpen} onClose={() => setOpen(false)}>
        <DemoCards />
        <Fab color="primary" className={classes.fab} onClick={handleFabClick}>
          <CheckIcon />
        </Fab>
      </Drawer>
    </>
  );
};
