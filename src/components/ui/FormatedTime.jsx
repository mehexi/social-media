import React from 'react';

const FormattedDate = ({ timestamp, showDate = true, showTime = true }) => {
  const date = new Date(timestamp);

  // Format the date part (weekday, month, day, year)
  const formattedDate = showDate
    ? date.toLocaleDateString('en-US', {
        month: 'short', // "November"
        day: 'numeric', // "27"
      })
    : '';

  // Format the time part (hour, minute, second)
  const formattedTime = showTime
    ? date.toLocaleTimeString('en-US', {
        hour: '2-digit', // "04"
        minute: '2-digit', // "10"
        second: '2-digit', // "04"
        hour12: true, // 12-hour format
      })
    : '';

  // Combine date and time
  const fullFormattedDate = `${formattedDate}${formattedDate && formattedTime ? ' ' : ''}${formattedTime}`;

  return <span>{fullFormattedDate}</span>;
};

export default FormattedDate;
