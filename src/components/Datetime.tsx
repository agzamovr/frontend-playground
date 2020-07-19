import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
type KeyboardDateTimePickerPropKeys = "disabled" | "disablePast";
export interface DatetimeProps {
  props?: Pick<KeyboardDateTimePickerProps, KeyboardDateTimePickerPropKeys>;
}
export const Datetime = (props: DatetimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        ampm={false}
        variant="inline"
        label="Date & time"
        value={selectedDate}
        onChange={handleDateChange}
        format="yyyy/MM/dd HH:mm"
        {...props.props}
      />
    </MuiPickersUtilsProvider>
  );
};
