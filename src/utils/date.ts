export const generateYear = (date_start: number, date_end: number) => {
  let years: string[] = [];
  for (let year = date_start; year <= date_end; year++) {
    years.push(year.toString());
  }
  return years;
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const getFullDays = () => {
  let days: string[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i.toString());
  }
  return days;
};

const monthInYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (string?: string) => {
  const date = string === undefined ? new Date() : new Date(string);
  return {
    defaultDate: () => date,
    getDay: () => date.getDate(),
    getMonth: () => date.getMonth(),
    getFullYear: () => date.getFullYear(),
    toISOString: () => date.toISOString(),
  };
};

export const getMonths = () => {
  return monthInYear;
};
