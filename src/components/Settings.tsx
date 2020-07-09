import React, { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Fields, FieldConfig } from "components/FieldComponent";
import { textFieldSettings } from "components/TextField/TextFieldSettings";
import { Grid, Box, Typography, Collapse } from "@material-ui/core";
import { CardConfig } from "cards/demo/DemoCards";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme) => ({
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
  tab: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "min-content",
    },
  },
}));

interface SettingsProps {
  card: CardConfig;
}

interface FieldSettingsProps {
  classes: Record<"root" | "tab", string>;
  field: FieldConfig;
}
const fieldSettingsLabel = (field: FieldConfig) =>
  field.type === "composed"
    ? field.name
    : field.type === "textfield"
    ? field.props.label || field.props.placeholder
    : null;

const fieldSettings = ({ classes, field }: FieldSettingsProps): FieldConfig[] =>
  field.type === "composed"
    ? [
        {
          type: "tabs",
          props: {
            value: 0,
            indicatorColor: "primary",
            scrollButtons: "off",
            variant: "scrollable",
          },
          tabs: field.fields.map((subField) => ({
            tab: {
              label: fieldSettingsLabel(subField),
              className: classes.tab,
            },
            panel: fieldSettings({ classes, field: subField }),
          })),
        },
      ]
    : field.type === "textfield"
    ? textFieldSettings(field.props)
    : [];

const FieldSettings = ({ classes, field }: FieldSettingsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleClick = () => setIsExpanded(!isExpanded);
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center" onClick={handleClick}>
          <Typography color="textPrimary" variant="h6" style={{ flexGrow: 1 }}>
            {fieldSettingsLabel(field)}
          </Typography>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Grid container spacing={2} direction="column">
            <Fields fields={fieldSettings({ classes, field })} />
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
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
        {card.fields.map((field, index) => (
          <Grid item key={index}>
            <FieldSettings classes={classes} field={field} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
