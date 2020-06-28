import React, { FunctionComponent, MouseEvent, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles<Theme, { selected: boolean }>((theme: Theme) =>
  createStyles({
    root: (props) => ({
      maxWidth: 360,
      minWidth: 300,
      borderColor: props.selected ? theme.palette.primary.main : undefined,
    }),
    title: {
      flexGrow: 1,
      userSelect: "none",
    },
  })
);

interface SelectableTitleProps {
  title: string;
  selected: boolean;
  onClick?: (event: MouseEvent) => void;
}

interface SelectableCardProps {
  title: string;
}

export const SelectableTitle: FunctionComponent<SelectableTitleProps> = ({
  title,
  selected,
  onClick,
}) => {
  const classes = useStyles({ selected });
  return (
    <Box display="flex" flexDirection="row" onClick={onClick}>
      <Typography
        color="textPrimary"
        variant="h5"
        gutterBottom
        className={classes.title}
      >
        {title}
      </Typography>
      {selected ? (
        <CheckCircleRoundedIcon color="primary" />
      ) : (
        <RadioButtonUncheckedRoundedIcon color="primary" />
      )}
    </Box>
  );
};

export const SelectableCard: FunctionComponent<SelectableCardProps> = (
  props
) => {
  const [selected, setSelected] = useState(false);
  const classes = useStyles({ selected });
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => setSelected(!selected)}
    >
      <CardContent>
        <SelectableTitle title={props.title} selected={selected} />
        {props.children}
      </CardContent>
    </Card>
  );
};
