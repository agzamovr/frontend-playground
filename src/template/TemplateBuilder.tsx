import React, { FunctionComponent, useState, useRef } from "react";
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
import { CardSettings } from "components/Settings/CardSettings";
import { SettingsFormValues } from "components/Settings/settingsUtils";
import { FormikProps } from "formik";

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
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [card, setCard] = useState<CardConfig | null>(null);
  const classes = useStyles();
  const cards = useSelector(({ template }: Store) => template.cards);
  const formRef = useRef<FormikProps<SettingsFormValues>>(null);

  const handleFabClick = () => {
    if (drawer === "cards") {
      dispatcher(templateActions.addSelectedCards());
      setDrawer(null);
    } else if (drawer === "settings" && cardIndex !== null) {
      formRef.current?.submitForm().then((v) => setDrawer(null));
    }
  };

  const handleApplySettings = (values: SettingsFormValues) => {
    if (cardIndex !== null)
      dispatcher(templateActions.applyCardSettings([cardIndex, values]));
  };

  const handleCardRemove = (index: number) =>
    dispatcher(templateActions.removeCard(index));

  const handleCardSettingsClick = (index: number, card: CardConfig) => {
    setCardIndex(index);
    setCard(card);
    setDrawer("settings");
  };
  const closeDrawer = () => {
    setDrawer(null);
    setCardIndex(null);
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
                onSettingsClicked={() => handleCardSettingsClick(index, card)}
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
          <CardSettings
            ref={formRef}
            card={card}
            onSubmit={handleApplySettings}
          />
        ) : null}
        <Fab color="primary" className={classes.fab} onClick={handleFabClick}>
          <CheckIcon />
        </Fab>
      </Drawer>
    </>
  );
};
