import React, { FunctionComponent, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Fields } from "components/FieldComponent";
import {
  Grid,
  CardHeader,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import DeleteIcon from "@material-ui/icons/Delete";
import { templateActions } from "template/redux/templateReducer";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "redux/store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    minWidth: 300,
    width: "100%",
    height: "100%",
    flex: "0 0 auto",
    overflowY: "auto",
  },
  content: {
    flexGrow: 1,
  },
});

interface TemplateCardProps {
  cardIndex: number;
  onCardRemove: () => void;
}

export const TemplateCard: FunctionComponent<TemplateCardProps> = (props) => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const { cardIndex, onCardRemove } = props;
  const card = useSelector(
    ({ template }: Store) => template.cards[cardIndex],
    shallowEqual
  );
  const handleCardSettingsClick = useCallback(() => {
    dispatcher(templateActions.openCardConfig([cardIndex, card]));
  }, [dispatcher, cardIndex, card]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={card.title}
        titleTypographyProps={{
          color: "textPrimary",
          variant: "h5",
          gutterBottom: true,
        }}
      />
      <CardContent className={classes.content}>
        <Fields fields={card.fields} />
      </CardContent>
      <CardActions disableSpacing>
        <Grid container justify="flex-end">
          <Tooltip title="Remove card">
            <IconButton onClick={onCardRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Card settings">
            <IconButton onClick={handleCardSettingsClick}>
              <TuneIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};
