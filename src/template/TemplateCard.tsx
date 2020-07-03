import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Field, FieldConfig } from "cards/FieldComponent";
import {
  Grid,
  CardHeader,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import DeleteIcon from "@material-ui/icons/Delete";

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
  title: string;
  fields: FieldConfig[];
  onCardRemove: () => void;
}

export const TemplateCard: FunctionComponent<TemplateCardProps> = (props) => {
  const classes = useStyles();
  const { title, fields, onCardRemove } = props;
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={title}
        titleTypographyProps={{
          color: "textPrimary",
          variant: "h5",
          gutterBottom: true,
        }}
      />
      <CardContent className={classes.content}>
        {fields.map((field, index) => (
          <Grid key={index} item>
            <Field {...field} />
          </Grid>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <Grid container justify="flex-end">
          <Tooltip title="Remove card">
            <IconButton onClick={onCardRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Card settings">
            <IconButton>
              <TuneIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};
