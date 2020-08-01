import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePickerProps,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
type KeyboardDatePickerPropKeys =
  | "placeholder"
  | "ampm"
  | "disabled"
  | "disablePast"
  | "disableFuture"
  | "variant"
  | "format"
  | "mask"
  | "autoOk";
export interface DatetimeProps {
  props: Pick<KeyboardDateTimePickerProps, KeyboardDatePickerPropKeys> & {
    label?: string;
    helperText?: string;
    required?: boolean;
  };
}
export const Datetime = (props: DatetimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        {...props.props}
      />
    </MuiPickersUtilsProvider>
  );
};
