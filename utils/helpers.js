//Creat time middleware 
const format_date = (date) => {
  if (!date) {
      return ''; 
  }

  const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
  };
  const formattedDate = new Date(date).toLocaleString('en-GB', options);
  
  const [datePart, timePart] = formattedDate.split(', ');

  return `${datePart}<br>${timePart}`;
};

module.exports = { format_date };
