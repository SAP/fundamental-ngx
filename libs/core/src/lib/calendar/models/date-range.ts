/** A class representing a range of dates. */
export class DateRange<D> {
    /**
     * Date range.
     * @param start
     * @param end
     */
    constructor(
        /** The start date of the range. */
        readonly start: D | null,
        /** The end date of the range. */
        readonly end: D | null
    ) {}
}
