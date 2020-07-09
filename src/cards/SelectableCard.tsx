import React, { FunctionComponent, MouseEvent, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Fields, FieldConfig } from "components/FieldComponent";

const useStyles = makeStyles<Theme, { selected: boolean }>((theme) =>
  createStyles({
    root: (props) => ({
      display: "flex",
      flexDirection: "column",
      maxWidth: 345,
      minWidth: 300,
      width: "100%",
      // maxHeight: 250,
      height: "100%",
      overflowY: "auto",
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
  fields: FieldConfig[];
  onSelect?: (selected: boolean) => void;
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
  const { title, fields } = props;
  const handleSelect = () => {
    setSelected(!selected);
    props.onSelect && props.onSelect(!selected);
  };
  return (
    <Card className={classes.root} variant="outlined" onClick={handleSelect}>
      <CardContent>
        <SelectableTitle title={title} selected={selected} />
        <Fields fields={fields} />
      </CardContent>
    </Card>
  );
};
