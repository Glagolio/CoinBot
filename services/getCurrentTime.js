const getMonth = (month) => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};

const getCurrentTime = (unixTime) => {
  const date = new Date(unixTime);
  const month = getMonth(date.getMonth());
  const day = date.getDay();
  const year = date.getUTCFullYear();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  return {
    month,
    day,
    year,
    minutes,
    hours,
  };
};

module.exports = { getCurrentTime };
