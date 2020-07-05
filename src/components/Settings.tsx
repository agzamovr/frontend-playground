import React, { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Field, FieldConfig } from "components/FieldComponent";
import { textFieldSettings } from "components/TextField/TextFieldSettings";
import { Grid, Box, Typography, Collapse } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    minWidth: 300,
    width: "100%",
    height: "100%",
    flex: "0 0 auto",
    overflowY: "auto",
  },
  content: {
    flexGrow: 1,
  },
});

interface SettingsProps {
  card: CardConfig;
}

interface FieldSettingsProps {
  classes: Record<"root", string>;
  field: FieldConfig;
}

const FieldSettings = ({ classes, field }: FieldSettingsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleClick = () => setIsExpanded(!isExpanded);
  return field.name === "textfield" ? (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center" onClick={handleClick}>
          <Typography color="textPrimary" variant="h6" style={{ flexGrow: 1 }}>
            {field.props.label || field.props.placeholder}
          </Typography>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Grid container spacing={2} direction="column">
            {textFieldSettings(field.props).map((field, index) => (
              <Grid key={index} item>
                <Field {...field} />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  ) : null;
};

export const Settings: FunctionComponent<SettingsProps> = (props) => {
  const classes = useStyles();
  const { card } = props;
  return (
    <Box p={1}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h5">{card.title}</Typography>
        </Grid>
        {card.fields.map((field) => (
          <Grid item>
            <FieldSettings classes={classes} field={field} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
