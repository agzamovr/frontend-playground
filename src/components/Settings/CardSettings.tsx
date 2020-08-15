import React, { useRef, useCallback, FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import { FieldSettings } from "components/Settings/FieldSettings";
import {
  fieldsSettingsInitialValues,
  SettingsFormValues,
} from "components/Settings/settingsUtils";
import { Form } from "react-final-form";
import { FormApi } from "final-form";
import { DnDContext } from "dnd/DnDContext";
import { Draggable } from "dnd/Draggable";
import { Droppable } from "dnd/Droppable";

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
  onSubmit: (values: SettingsFormValues, fieldsOrder: string[]) => void;
  setFormApi: (formApi: FormApi) => void;
}

export const CardSettings: FunctionComponent<SettingsProps> = ({
  card,
  onSubmit,
  setFormApi,
}) => {
  const classes = useStyles();
  const fieldsOrder = useRef(card.fields.map((field) => field.name));
  const setFieldsOrder = useCallback(
    (newOrder: string[]) => (fieldsOrder.current = newOrder),
    []
  );
  return (
    <Form<SettingsFormValues>
      initialValues={fieldsSettingsInitialValues(card.fields)}
      subscription={{ submitting: true }}
      onSubmit={(values) => {
        console.log(values);
        onSubmit(values, fieldsOrder.current);
      }}
    >
      {({ form, handleSubmit }) => {
        setFormApi(form);
        return (
          <form onSubmit={handleSubmit} noValidate>
            <Box p={1}>
              <DnDContext onDragEnd={setFieldsOrder}>
                <Droppable droppableId="0">
                  {(innerRef, placeholder) => (
                    <Grid
                      container
                      spacing={1}
                      direction="column"
                      ref={innerRef}
                    >
                      <Grid item>
                        <Typography variant="h5">{card.title}</Typography>
                      </Grid>

                      {card.fields.map((field, index) => (
                        <Draggable key={index} draggableId={field.name}>
                          {(innerRef) => (
                            <FieldSettings
                              classes={classes}
                              field={field}
                              ref={innerRef}
                            />
                          )}
                        </Draggable>
                      ))}
                      {placeholder}
                    </Grid>
                  )}
                </Droppable>
              </DnDContext>
            </Box>
          </form>
        );
      }}
    </Form>
  );
};
