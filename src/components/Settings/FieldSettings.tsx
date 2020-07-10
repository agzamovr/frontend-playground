import React, { FunctionComponent, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Fields, FieldConfig } from "components/FieldComponent";
import { Grid, Box, Typography, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  fieldSettingsLabel,
  fieldSettings,
} from "components/Settings/settingsUtils";

export interface FieldSettingsProps {
  classes: Record<"root" | "tabs" | "tab", string>;
  field: FieldConfig;
}

export const FieldSettings: FunctionComponent<FieldSettingsProps> = ({
  classes,
  field,
}) => {
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
