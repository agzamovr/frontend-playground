import React, { FunctionComponent, useState, ChangeEvent } from "react";
import {
  TabsProps as MuiTabsProps,
  Tabs as MuiTabs,
  TabProps as MuiTabProps,
  Tab as MuiTab,
  Grid as MuiGrid,
} from "@material-ui/core";
import { FieldConfig, Fields } from "components/FieldComponent";

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

export interface TabsProps {
  props: Pick<MuiTabsProps, TabsKeys>;
  tabs: {
    tab: Pick<MuiTabProps, TabKeys>;
    panel: FieldConfig[];
  }[];
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
        <Fields fields={tabs[value].panel} />
      </MuiGrid>
    </>
  );
};