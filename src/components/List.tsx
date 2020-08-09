import React, { FunctionComponent, Fragment } from "react";

import {
  List as MuiList,
  ListItemProps as MuiListItemProps,
  ListItem as MuiListItem,
  useTheme,
} from "@material-ui/core";
import {
  Field,
  CheckboxConfig,
  TextFieldConfig,
} from "components/FieldComponent";

type ItemPropsKeys = "disabled" | "dense" | "selected";
type ItemProps = Pick<MuiListItemProps, ItemPropsKeys>;
export interface ListProps {
  items: {
    props?: ItemProps;
    control: CheckboxConfig | TextFieldConfig;
    subList?: ListProps;
  }[];
}
type ListComponentProps = ListProps & { level: number };

const ListComponent: FunctionComponent<ListComponentProps> = (props) => {
  const theme = useTheme();
  const isNested = props.level > 0;
  const paddingLeft = isNested ? theme.spacing(4) : 0;
  return (
    <MuiList disablePadding={isNested} style={{ paddingLeft }}>
      {props.items.map((item, index) => (
        <Fragment key={index}>
          <MuiListItem {...item.props}>
            <Field {...item.control} />
          </MuiListItem>
          {item.subList && (
            <ListComponent
              {...item.subList}
              level={props.level + 1}
            ></ListComponent>
          )}
        </Fragment>
      ))}
    </MuiList>
  );
};

export const List: FunctionComponent<ListProps> = (props) => (
  <ListComponent {...props} level={0} />
);
