/** Calendar helpers shared by components that pick or display dates (the
 *  offer form's move-in date field). All helpers work in local time, treat
 *  ISO strings as "YYYY-MM-DD" and take zero-based months, matching
 *  `Date.getMonth()`. */

export const MONTHS = [
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

export const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Day number with its ordinal suffix: 1 → "1st", 12 → "12th", 23 → "23rd". */
export function ordinal(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

/** ISO date string ("2026-07-04") for a local year/month/day triple. */
export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** "2026-07-04" → "4th July 2026". */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${ordinal(day)} ${MONTHS[month - 1]} ${year}`;
}

/** Whether two dates fall on the same calendar day (local time). */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export interface MonthCell {
  /** Calendar day number — out-of-month cells carry the neighbouring
   *  month's numbering. */
  day: number;
  /** Whether the cell belongs to the requested month. */
  inMonth: boolean;
}

/** The 42 cells (six fixed Monday–Sunday rows) of a month grid, padded with
 *  the neighbouring months' days so the row count never shifts between
 *  months. */
export function buildMonthCells(year: number, month: number): MonthCell[] {
  // Monday-first offset of the 1st.
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  return Array.from({ length: 42 }, (_, i) => {
    const d = i - startOffset + 1;
    const inMonth = d >= 1 && d <= daysInMonth;
    return {
      day: d < 1 ? daysInPrev + d : inMonth ? d : d - daysInMonth,
      inMonth,
    };
  });
}
