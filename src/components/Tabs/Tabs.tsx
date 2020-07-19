import React, { FunctionComponent, useState, ChangeEvent } from "react";
import {
  TabsProps as MuiTabsProps,
  Tabs as MuiTabs,
  TabProps as MuiTabProps,
  Tab as MuiTab,
  Grid as MuiGrid,
} from "@material-ui/core";
import { FieldConfig } from "components/FieldComponent";
import { FormFields } from "components/Form/FormField";

type TabsKeys =
  | "color"
  | "textColor"
  | "indicatorColor"
  | "value"
  | "centered"
  | "scrollButtons"
  | "indicatorColor"
  | "variant"
  | "className";

type TabKeys = "label" | "disabled" | "className";

interface TabProps {
  tab: Pick<MuiTabProps, TabKeys>;
  panel: FieldConfig[];
}

export interface TabsProps {
  props: Pick<MuiTabsProps, TabsKeys>;
  tabs: TabProps[];
}

export const Tabs: FunctionComponent<TabsProps> = ({ props, tabs }) => {
  const [value, setValue] = useState(props.value || 0);
  const handleChange = (_event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <MuiTabs {...props} value={value} onChange={handleChange}>
        {tabs.map(({ tab }, index) => (
          <MuiTab key={index} value={index} {...tab} />
        ))}
      </MuiTabs>
      <MuiGrid container item spacing={2} direction="column">
        <FormFields fields={tabs[value].panel} />
      </MuiGrid>
    </>
  );
};
