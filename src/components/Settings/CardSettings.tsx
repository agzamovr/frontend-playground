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
import arrayMutators from "final-form-arrays";
import { useRegisterDraggables } from "components/Settings/dndCardSettingsHooks";
import { FormApi, MutableState, Mutator } from "final-form";

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
const dndMutator: Mutator<SettingsFormValues> = (
  [fieldNames, api]: [Record<string, string>, FormApi],
  state,
  { getIn, setIn }
) => {
  type FormFields = MutableState<SettingsFormValues>["fields"];
  type FieldSubscribers = MutableState<SettingsFormValues>["fieldSubscribers"];
  const oldFields: FormFields = {};
  const oldSubscribers: FieldSubscribers = {};
  for (const key in fieldNames) {
    oldFields[key] = state.fields[key];
    oldSubscribers[key] = state.fieldSubscribers[key];
  }
  Object.entries(fieldNames).forEach(([oldName, newName]) => {
    state.fields[newName] = {
      ...oldFields[oldName],
      name: newName,
      blur: () => api.blur(newName),
      change: (value) => api.change(newName, value),
      focus: () => api.focus(newName),
      lastFieldState: undefined,
    };
    state.fieldSubscribers[newName] = oldSubscribers[oldName];
    const value = getIn(state.formState.values, oldName);
    state.formState.values =
      setIn(state.formState.values, oldName, undefined) || {};
    state.formState.values = setIn(state.formState.values, newName, value);
  });
  delete state.lastFormState;
};

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
      mutators={{
        dndMutator,
        ...arrayMutators,
      }}
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
