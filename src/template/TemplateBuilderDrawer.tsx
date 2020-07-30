import React, { FunctionComponent, useRef, useCallback } from "react";
import { makeStyles, createStyles, Theme, Fab } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CheckIcon from "@material-ui/icons/Check";
import { DemoCards } from "cards/demo/DemoCards";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { templateActions } from "template/redux/templateReducer";
import { CardSettings } from "components/Settings/CardSettings";
import { SettingsFormValues } from "components/Settings/settingsUtils";
import { FormikProps } from "formik";
import { Store } from "redux/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);
interface TemplateBuilderDrawerProps {}
export const TemplateBuilderDrawer: FunctionComponent<TemplateBuilderDrawerProps> = () => {
  const dispatcher = useDispatch();
  const classes = useStyles();
  const drawer = useSelector(
    ({ template }: Store) => template.drawer,
    shallowEqual
  );
  const cardConfig = useSelector(
    ({ template }: Store) => template.cardConfig,
    shallowEqual
  );

  const formRef = useRef<FormikProps<SettingsFormValues>>(null);

  const handleFabClick = () => {
    if (drawer === "cards") {
      dispatcher(templateActions.addSelectedCards());
    } else if (drawer === "settings") {
      formRef.current
        ?.submitForm()
        .then((v) => dispatcher(templateActions.closeDrawer()));
    }
  };

  const handleApplySettings = useCallback(
    (values: SettingsFormValues, fieldsOrder: number[]) => {
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
          ref={formRef}
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
