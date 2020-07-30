import React, { FunctionComponent, useCallback } from "react";
import { Grid, Box } from "@material-ui/core";
import { AddNewCard } from "cards/AddNewCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { Store } from "redux/store";
import { TemplateCard } from "template/TemplateCard";
import { TemplateBuilderDrawer } from "template/TemplateBuilderDrawer";

const indexes = (length: number) => {
  const indexes = [];
  for (let i = 0; i < length; i++) indexes.push(i);
  return indexes;
};

export const TemplateBuilder: FunctionComponent = () => {
  const dispatcher = useDispatch();
  const cardsLength = useSelector(
    ({ template }: Store) => template.cards.length,
    shallowEqual
  );
  const cardIndexes = indexes(cardsLength);
  const handleAddCard = useCallback(() => {
    dispatcher(templateActions.openAddNewCardDrawer());
  }, [dispatcher]);
  const handleCardRemove = useCallback(
    (index: number) => dispatcher(templateActions.removeCard(index)),
    [dispatcher]
  );

  return (
    <>
      <Box p={2}>
        <Grid container spacing={2}>
          {cardIndexes.map((index) => (
            <Grid item key={index}>
              <TemplateCard
                cardIndex={index}
                onCardRemove={() => handleCardRemove(index)}
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
