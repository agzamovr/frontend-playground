import React, { useState, forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FieldConfig } from "components/FieldComponent";
import { Grid, Box, Typography, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  fieldSettingsLabel,
  fieldSettings,
} from "components/Settings/settingsUtils";
import { FormFields } from "components/Form/FormField";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grey from "@material-ui/core/colors/grey";

export interface FieldSettingsProps {
  classes: Record<"root" | "tabs" | "tab", string>;
  namePrefix?: string;
  field: FieldConfig;
}

export const FieldSettings = forwardRef<SVGSVGElement, FieldSettingsProps>(
  ({ classes, namePrefix = "", field }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = () => setIsExpanded(!isExpanded);
    return (
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Box display="flex" alignItems="center" onClick={handleClick}>
            <Typography
              color="textPrimary"
              variant="h6"
              style={{ flexGrow: 1 }}
            >
              {fieldSettingsLabel(field)}
            </Typography>
            {isExpanded ? (
              <ExpandLessIcon style={{ color: Grey[500] }} />
            ) : (
              <ExpandMoreIcon style={{ color: Grey[500] }} />
            )}
            <DragIndicatorIcon style={{ color: Grey[500] }} ref={ref} />
          </Box>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Grid container spacing={2} direction="column">
              <FormFields
                fields={fieldSettings({ classes, namePrefix, field })}
              />
            </Grid>
          </Collapse>
        </CardContent>
      </Card>
    );
  }
);
