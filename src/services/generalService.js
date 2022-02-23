export const capitalize = (string) => {
  const words = string.split(" ");
  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

export const concatLowerString = (string) => {
  const newString = string.replace(/\s/g, "");
  return newString.toLowerCase();
};

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const getNextDayOfWeek = (date, dayOfWeek) => {
  let resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));
  let formatDate = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
  }).format(resultDate);
  return formatDate;
};

export const wedOrSun = (date) => {
  let nextDate;
  let day;
  // console.log(date.getDay());
  if (date.getDay() > 0 && date.getDay() <= 3) {
    nextDate = getNextDayOfWeek(date, 3);
    day = "Mi";
  } else {
    nextDate = getNextDayOfWeek(date, 7);
    day = "So";
  }
  return { nextDate, day };
};
