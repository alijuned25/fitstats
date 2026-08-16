export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function getMonthName(month) {
  const date = new Date(2000, month, 1);

  return date.toLocaleString("default", {
    month: "long",
  });
}