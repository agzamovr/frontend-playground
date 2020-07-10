import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import { FieldSettings } from "components/Settings/FieldSettings";

const useStyles = makeStyles((theme) => ({
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
  tabs: {
    maxWidth: 250,
  },
  tab: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "min-content",
    },
  },
}));

interface SettingsProps {
  card: CardConfig;
}

export const CardSettings: FunctionComponent<SettingsProps> = (props) => {
  const classes = useStyles();
  const { card } = props;
  return (
    <Box p={1}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h5">{card.title}</Typography>
        </Grid>
        {card.fields.map((field, index) => (
          <Grid item key={index}>
            <FieldSettings classes={classes} field={field} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
