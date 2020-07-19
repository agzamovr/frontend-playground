import React, { FunctionComponent, Fragment } from "react";

import {
  CheckboxProps,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  FormControlLabelProps,
  useTheme,
} from "@material-ui/core";

type CheckboxPropKeys = "indeterminate" | "checked" | "color" | "disabled";
export interface ChecklistProps {
  items: {
    // itemProps?: ListItemProps<"li", { button?: false }> &
    //   ListItemProps<"div", { button?: true }>;
    formControlProps: Pick<FormControlLabelProps, "label">;
    checkboxProps: Pick<CheckboxProps, CheckboxPropKeys>;
    subChecklist?: ChecklistProps;
  }[];
}

const ChecklistComponent: FunctionComponent<
  ChecklistProps & { level: number }
> = (props) => {
  const theme = useTheme();
  const isNested = props.level > 0;
  const paddingLeft = isNested ? theme.spacing(4) : 0;
  return (
    <List disablePadding={isNested} style={{ paddingLeft }}>
      {props.items.map((item, index) => (
        <Fragment key={index}>
          <ListItem>
            <FormControlLabel
              {...item.formControlProps}
              control={<Checkbox {...item.checkboxProps} />}
            />
          </ListItem>
          {item.subChecklist && (
            <ChecklistComponent
              {...item.subChecklist}
              level={props.level + 1}
            ></ChecklistComponent>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export const Checklist: FunctionComponent<ChecklistProps> = (props) => (
  <ChecklistComponent {...props} level={0} />
);
