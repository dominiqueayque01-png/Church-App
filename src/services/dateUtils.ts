// ─── DATE UTILITIES FOR CHURCH SERVICE GATHERINGS ────────

/**
 * Normalizes a date to local midnight (00:00:00.000).
 */
export function toMidnight(d: Date): Date {
  const res = new Date(d);
  res.setHours(0, 0, 0, 0);
  return res;
}

/**
 * Formats a Date to YYYY-MM-DD.
 */
export function formatDateISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a Date to a human readable string: e.g. "Saturday, Sep 19, 2026".
 */
export function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats a week range: e.g. "Week of Sep 14 – Sep 20, 2026".
 */
export function formatWeekRange(saturday: Date, sunday: Date): string {
  const satStr = saturday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const sunStr = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${satStr} – ${sunStr}`;
}

/**
 * Computes Saturday and Sunday dates for a given week offset from today.
 * weekOffset = 0 -> This Weekend
 * weekOffset = -1 -> Last Weekend
 * weekOffset = -2 -> 2 Weeks Ago
 */
export function getWeekendDates(weekOffset: number = 0, refDate: Date = new Date()): { saturday: Date; sunday: Date } {
  const current = toMidnight(refDate);
  const day = current.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // In church gatherings:
  // If today is Sunday (0): Saturday was yesterday (-1 day), Sunday is today (0 days).
  // If today is Mon-Sat (1-6): Saturday is (6 - day) days away, Sunday is (7 - day) days away.
  const daysToSaturday = day === 0 ? -1 : 6 - day;
  const daysToSunday = day === 0 ? 0 : 7 - day;

  const saturday = new Date(current);
  saturday.setDate(current.getDate() + daysToSaturday + (weekOffset * 7));

  const sunday = new Date(current);
  sunday.setDate(current.getDate() + daysToSunday + (weekOffset * 7));

  return { saturday, sunday };
}

/**
 * Base Event UUIDs for Courtyard Church:
 * Saturday Ministry Gathering: 33333333-3333-3333-3333-333333333301
 * Sunday Fellowship Gathering: 33333333-3333-3333-3333-333333333302
 */
export const SATURDAY_BASE_ID = '33333333-3333-3333-3333-333333333301';
export const SUNDAY_BASE_ID = '33333333-3333-3333-3333-333333333302';

/**
 * Generates an RFC4122 v4-compliant deterministic UUID scoped to a gathering date.
 * Format: 33333333-3333-4333-YYYY-MMDD0000000X (36 characters)
 */
export function getDateScopedEventId(isSaturday: boolean, dateStr?: string): string {
  const suffix = isSaturday ? '1' : '2';
  if (!dateStr) {
    return isSaturday ? SATURDAY_BASE_ID : SUNDAY_BASE_ID;
  }

  // Parse YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return isSaturday ? SATURDAY_BASE_ID : SUNDAY_BASE_ID;
  }

  const [year, month, day] = parts;
  const yearPart = year.padStart(4, '0').slice(-4);
  const dateSuffix = `${month}${day}`.padStart(4, '0') + `0000000${suffix}`;

  // Lengths: 8 - 4 - 4 - 4 - 12 = 36 chars
  return `33333333-3333-4333-${yearPart}-${dateSuffix}`;
}

/**
 * Calendar day representation for the monthly calendar picker.
 */
export type CalendarDay = {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isPast: boolean;
};

/**
 * Builds the calendar grid for a given year and month (0-indexed).
 */
export function getMonthCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const todayStr = formatDateISO(new Date());

  const days: CalendarDay[] = [];

  // Start on Monday (1) or Sunday (0). We'll start on Sunday.
  const startDayOfWeek = firstDay.getDay(); // 0 = Sun

  // Leading days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    const dateString = formatDateISO(d);
    days.push({
      date: d,
      dateString,
      dayNumber: d.getDate(),
      isCurrentMonth: false,
      isToday: dateString === todayStr,
      isSaturday: d.getDay() === 6,
      isSunday: d.getDay() === 0,
      isPast: d < toMidnight(new Date()),
    });
  }

  // Days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    const dateString = formatDateISO(d);
    days.push({
      date: d,
      dateString,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: dateString === todayStr,
      isSaturday: d.getDay() === 6,
      isSunday: d.getDay() === 0,
      isPast: d < toMidnight(new Date()),
    });
  }

  // Trailing days from next month to complete the row
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      const dateString = formatDateISO(d);
      days.push({
        date: d,
        dateString,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: dateString === todayStr,
        isSaturday: d.getDay() === 6,
        isSunday: d.getDay() === 0,
        isPast: d < toMidnight(new Date()),
      });
    }
  }

  return days;
}
