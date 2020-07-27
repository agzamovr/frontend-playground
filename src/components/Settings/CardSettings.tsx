import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import { FieldSettings } from "components/Settings/FieldSettings";
import {
  fieldsSettingsInitialValues,
  SettingsFormValues,
} from "components/Settings/settingsUtils";
import { Formik, Form, FormikProps } from "formik";
import { DnDContext } from "dnd/DnDContext";
import { Draggable } from "dnd/Draggable";

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
  onSubmit: (values: SettingsFormValues) => void;
}

export const CardSettings = forwardRef<
  FormikProps<SettingsFormValues>,
  SettingsProps
>(({ card, onSubmit }, ref) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={fieldsSettingsInitialValues(card.fields)}
      innerRef={ref}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Box p={1}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5">{card.title}</Typography>
            </Grid>
            <DnDContext>
              {card.fields.map((field, index) => (
                <Draggable key={index} originalOrder={index}>
                  {(innerRef) => (
                    <FieldSettings
                      classes={classes}
                      field={field}
                      ref={innerRef}
                    />
                  )}
                </Draggable>
              ))}
            </DnDContext>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
});
