import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRangePicker.css'

const DateRangePickerComponent = ({selectDateRange}) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    // range is an object with start and end dates
    setSelectionRange(ranges.selection);
    selectDateRange(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={2} // Show two months in the calendar
        direction="horizontal"
        showMonthAndYearPickers={false}
        minDate={new Date()}
      />
    </div>
  );
};

export default DateRangePickerComponent;