import React, { FunctionComponent, useCallback } from "react";
import { Grid, Box } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import { AddNewCard } from "cards/AddNewCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { Store } from "redux/store";
import { TemplateCard } from "template/TemplateCard";
import { TemplateBuilderDrawer } from "template/TemplateBuilderDrawer";

export const TemplateBuilder: FunctionComponent = () => {
  const dispatcher = useDispatch();
  const cards = useSelector(
    ({ template }: Store) => template.cards,
    shallowEqual
  );
  const handleAddCard = useCallback(() => {
    dispatcher(templateActions.openAddNewCardDrawer());
  }, [dispatcher]);
  const handleCardRemove = useCallback(
    (index: number) => dispatcher(templateActions.removeCard(index)),
    [dispatcher]
  );

  const handleCardSettingsClick = useCallback(
    (index: number, card: CardConfig) => {
      dispatcher(templateActions.openCardConfig([index, card]));
    },
    [dispatcher]
  );

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
            <AddNewCard onClick={handleAddCard} />
          </Grid>
        </Grid>
      </Box>
      <TemplateBuilderDrawer />
    </>
  );
};
