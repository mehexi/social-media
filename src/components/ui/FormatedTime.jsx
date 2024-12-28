import React from 'react';

const FormattedDate = ({ timestamp, showDate = true, showTime = true }) => {
  const date = new Date(timestamp);

  const formattedDate = showDate
    ? date.toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric',
      })
    : '';

  const formattedTime = showTime
    ? date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit', 
        hour12: true, 
      })
    : '';

  // Combine date and time
  const fullFormattedDate = `${formattedDate}${formattedDate && formattedTime ? ' ' : ''}${formattedTime}`;

  return <span>{fullFormattedDate}</span>;
};

export default FormattedDate;
