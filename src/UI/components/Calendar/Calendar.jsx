import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ year, month }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(year, month);
    const startDay = startDayOfMonth(year, month);
    const calendar = [];

    // Render empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Render days of the month
    for (let day = 1; day <= totalDays; day++) {
      const classNames = ['day-cell'];
      if (selectedDate === day) {
        classNames.push('selected');
      }
      calendar.push(
        <div key={day} className={classNames.join(' ')} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">{`${year}/${month + 1}`}</div>
      <div className="calendar-grid">
        <div className="day-header">Sun</div>
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;