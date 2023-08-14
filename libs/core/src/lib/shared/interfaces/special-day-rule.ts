/**
 * Special days mark, it can be used by passing array of object with
 * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
 * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
 * Rule accepts method with FdDate object as a parameter. ex:
 * `rule: (fdDate: FdDate) => fdDate.getDay() === 1`, which will mark all sundays as special day.
 */
export interface SpecialDayRule<D> {
    specialDayNumber: number;
    rule: (date: D) => boolean;
}
