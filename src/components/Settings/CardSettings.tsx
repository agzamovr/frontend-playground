import React, { FunctionComponent } from "react";
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
import { useRegisterDraggables } from "components/Settings/dndCardSettingsHooks";

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
  const fields = useRegisterDraggables(card);
  return (
    <Form<SettingsFormValues>
      initialValues={fieldsSettingsInitialValues(card.fields)}
      subscription={{ submitting: true }}
      onSubmit={(values) => {
        onSubmit(
          values,
          fields.map(({ field }) => field.name)
        );
      }}
    >
      {({ form, handleSubmit }) => {
        setFormApi(form);
        return (
          <form onSubmit={handleSubmit} noValidate>
            <Box p={1}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Typography variant="h5">{card.title}</Typography>
                </Grid>

                {fields.map(({ blockId, field }) => (
                  <FieldSettings
                    classes={classes}
                    blockId={blockId}
                    field={field}
                    key={blockId}
                  />
                ))}
              </Grid>
            </Box>
          </form>
        );
      }}
    </Form>
  );
};
