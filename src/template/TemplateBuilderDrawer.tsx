import React, { FunctionComponent, useRef, useCallback } from "react";
import { makeStyles, createStyles, Theme, Fab } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CheckIcon from "@material-ui/icons/Check";
import { DemoCards } from "cards/demo/DemoCards";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { CardSettings } from "components/Settings/CardSettings";
import { SettingsFormValues } from "components/Settings/settingsUtils";
import { Store } from "redux/store";
import { FormApi } from "final-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export const TemplateBuilderDrawer: FunctionComponent = () => {
  const dispatcher = useDispatch();
  const classes = useStyles();
  const drawer = useSelector(
    ({ template }: Store) => template.drawer,
    shallowEqual
  );
  const cardConfig = useSelector(({ template }: Store) => template.cardConfig);

  const formRef = useRef<FormApi>();

  const setFormApi = useCallback((formApi) => {
    formRef.current = formApi;
  }, []);

  const handleFabClick = () => {
    if (drawer === "cards") {
      dispatcher(templateActions.addSelectedCards());
    } else if (drawer === "settings") {
      formRef.current?.submit();
      dispatcher(templateActions.closeDrawer());
    }
  };

  const handleApplySettings = useCallback(
    (values: SettingsFormValues, fieldsOrder: string[]) => {
      dispatcher(templateActions.applyCardSettings([values, fieldsOrder]));
    },
    [dispatcher]
  );

  const closeDrawer = useCallback(() => {
    dispatcher(templateActions.closeDrawer());
  }, [dispatcher]);

  return (
    <Drawer anchor="right" open={drawer !== null} onClose={closeDrawer}>
      {drawer === "cards" ? (
        <DemoCards />
      ) : drawer === "settings" && cardConfig ? (
        <CardSettings
          setFormApi={setFormApi}
          card={cardConfig}
          onSubmit={handleApplySettings}
        />
      ) : null}
      <Fab color="primary" className={classes.fab} onClick={handleFabClick}>
        <CheckIcon />
      </Fab>
    </Drawer>
  );
};
