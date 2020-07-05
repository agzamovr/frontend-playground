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
import { DemoCards, CardConfig } from "cards/demo/DemoCards";
import { AddNewCard } from "cards/AddNewCard";
import { useDispatch, useSelector } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { Store } from "redux/store";
import { TemplateCard } from "template/TemplateCard";
import { Settings } from "components/Settings";

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
  const [drawer, setDrawer] = useState<null | "cards" | "settings">(null);
  const [card, setCard] = useState<CardConfig | null>(null);
  const classes = useStyles();
  const cards = useSelector(({ template }: Store) => template.cards);

  const handleFabClick = () => {
    setDrawer(null);
    dispatcher(templateActions.addSelectedCards());
  };

  const handleCardRemove = (index: number) =>
    dispatcher(templateActions.removeCard(index));

  const handleCardSettingsClick = (card: CardConfig) => {
    setCard(card);
    setDrawer("settings");
  };
  const closeDrawer = () => {
    setDrawer(null);
    setCard(null);
  };

  return (
    <>
      <Box p={2}>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item key={index}>
              <TemplateCard
                title={card.title}
                fields={card.fields}
                onCardRemove={() => handleCardRemove(index)}
                onSettingsClicked={() => handleCardSettingsClick(card)}
              />
            </Grid>
          ))}
          <Grid item>
            <AddNewCard onClick={() => setDrawer("cards")} />
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor="right" open={drawer !== null} onClose={closeDrawer}>
        {drawer === "cards" ? (
          <DemoCards />
        ) : drawer === "settings" && card ? (
          <Settings card={card} />
        ) : null}
        <Fab color="primary" className={classes.fab} onClick={handleFabClick}>
          <CheckIcon />
        </Fab>
      </Drawer>
    </>
  );
};
