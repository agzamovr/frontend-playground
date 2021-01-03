import React, { useState } from "react";
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
import Grey from "@material-ui/core/colors/grey";
import { useDataBlockId } from "components/DataBlockID";
import { DragHandle } from "dnd/v2/Draggable";
import { DnDCardSettingType } from "components/Settings/dndCardSettingsHooks";
import { DropPlaceholder } from "dnd/v2/DnDPlaceholder";

export interface FieldSettingsProps {
  classes: Record<"root" | "tabs" | "tab", string>;
  namePrefix?: string;
  field: FieldConfig;
}

type FieldSettingsComponentProps = FieldSettingsProps & {
  blockId: string;
};

export const FieldSettings = ({
  classes,
  blockId,
  namePrefix = "",
  field,
}: FieldSettingsComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => setIsExpanded(!isExpanded);
  const { id, setRef } = useDataBlockId(blockId);
  return (
    <Grid item>
      <Card
        variant="outlined"
        className={classes.root}
        ref={setRef}
        data-droppable="true"
      >
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
            <DragHandle draggableId={id} />
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
      <DropPlaceholder id={id} dndItemType={DnDCardSettingType} />
    </Grid>
  );
};
