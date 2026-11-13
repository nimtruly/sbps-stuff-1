/**
 * Short reference numbers parents and staff can quote on the phone,
 * derived from content so they never need to be maintained by hand.
 * Notices: N-YYMMDD (a same-day second notice gets a letter suffix).
 */
export function noticeRef(date: string, sameDayIndex = 0): string {
  const d = date.replace(/-/g, '').slice(2, 8);
  return `N-${d}${sameDayIndex ? String.fromCharCode(96 + sameDayIndex + 1) : ''}`;
}

/** Assign refs to a list sorted in any order, stable for same-day notices. */
export function withNoticeRefs<T extends { date: string; id: string }>(list: T[]): (T & { ref: string })[] {
  const byDay = new Map<string, T[]>();
  [...list]
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((n) => byDay.set(n.date, [...(byDay.get(n.date) ?? []), n]));
  return list.map((n) => ({ ...n, ref: noticeRef(n.date, byDay.get(n.date)!.indexOf(n)) }));
}

export function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
