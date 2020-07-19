import React from "react";

import { TypographyProps, Typography } from "@material-ui/core";

export interface HeaderProps<C extends React.ElementType = "h1"> {
  props: Pick<TypographyProps<C, { component?: C }>, "color"> & {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };
}

export const Header = (props: HeaderProps) => (
  <Typography {...props.props}>{props.props.text}</Typography>
);
