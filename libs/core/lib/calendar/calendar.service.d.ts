import { FdDate } from './models/fd-date';
import { Subject } from 'rxjs';
export declare class CalendarService {
    /** Event thrown, when the element is selected by space or enter keys */
    onKeySelect: Subject<number>;
    /** Event thrown, when the focus goes after list of elements */
    onListEndApproach: Subject<void>;
    /** Event thrown, when the focus goes before list of elements */
    onListStartApproach: Subject<void>;
    /** Event thrown, when the focus is changed. */
    onFocusIdChange: Subject<number>;
    /** Function that is called when the focus would escape the element. */
    focusEscapeFunction: Function;
    /**
     * Method that provides, amount of day depending on month and year passed
     * @param month which is number 1-12
     * @param year which is number
     */
    static getDaysInMonth(month: number, year: number): number;
    /**
     * Method that check equality of 2 dates.
     */
    static datesEqual(date1: FdDate, date2: FdDate): boolean;
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - 11)
     */
    onKeydownHandler(event: KeyboardEvent, index: number): void;
}
