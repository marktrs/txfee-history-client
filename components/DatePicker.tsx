"use client";

import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({
  dateRange,
  handleDateChange,
}: {
  dateRange: any;
  handleDateChange: (date: any) => void;
}) => {
  return (
    <Datepicker
      value={dateRange}
      onChange={handleDateChange}
      showShortcuts={true}
      readOnly={true}
      popoverDirection="down"
      maxDate={dayjs().toDate()}
    />
  );
};
export default DatePicker;
