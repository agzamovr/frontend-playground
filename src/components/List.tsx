import React, { FunctionComponent, Fragment } from "react";

import {
  List as MuiList,
  ListItem as MuiListItem,
  useTheme,
} from "@material-ui/core";
import { SimpleFieldConfig, Field } from "components/FieldComponent";

export interface ListProps {
  items: {
    // itemProps?: MuiListItemProps<"li", { button?: false }> &
    //   MuiListItemProps<"div", { button?: true }>;
    control: SimpleFieldConfig;
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
          <MuiListItem>
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
