import React, { FunctionComponent, useState } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import {
  ListProps,
  CheckboxProps,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  FormControlLabelProps,
  Collapse,
  useTheme,
} from "@material-ui/core";
import { Styled } from "./FieldComponent";

export interface ChecklistProps extends Styled {
  props?: ListProps;
  items: {
    // itemProps?: ListItemProps<"li", { button?: false }> &
    //   ListItemProps<"div", { button?: true }>;
    formControlProps: Omit<FormControlLabelProps, "control">;
    checkboxProps: CheckboxProps;
    subChecklist?: ChecklistProps;
  }[];
}

const ChecklistComponent: FunctionComponent<
  ChecklistProps & { level: number }
> = (props) => {
  const theme = useTheme();
  const isNested = props.level > 0;
  const [isExpanded, setIsExpanded] = useState(true);
  const paddingLeft = isNested ? theme.spacing(4) : 0;
  return (
    <List {...props.props} disablePadding={isNested} style={{ paddingLeft }}>
      {props.items.map((item) => (
        <>
          <ListItem onClick={() => setIsExpanded(!isExpanded)}>
            <FormControlLabel
              {...item.formControlProps}
              control={<Checkbox {...item.checkboxProps} />}
            />
            {item.subChecklist &&
              (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {item.subChecklist && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <ChecklistComponent
                {...item.subChecklist}
                level={props.level + 1}
              ></ChecklistComponent>
            </Collapse>
          )}
        </>
      ))}
    </List>
  );
};

export const Checklist: FunctionComponent<ChecklistProps> = (props) => (
  <ChecklistComponent {...props} level={0} />
);
