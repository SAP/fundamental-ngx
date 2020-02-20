import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FdDate } from './models/fd-date';

@Injectable()
export class CalendarService {

    /** Event thrown, when the element is selected by space or enter keys */
    public onKeySelect: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus goes after list of elements */
    public onListEndApproach: Subject<void> = new Subject<void>();

    /** Event thrown, when the focus goes before list of elements */
    public onListStartApproach: Subject<void> = new Subject<void>();

    /** Event thrown, when the focus is changed. */
    public onFocusIdChange: Subject<number> = new Subject<number>();

    /** Function that is called when the focus would escape the element. */
    focusEscapeFunction: Function;

    /**
     * Method that provides, amount of day depending on month and year passed
     * @param month which is number 1-12
     * @param year which is number
     */
    static getDaysInMonth(month: number, year: number): number {

        const isLeapYear = (_year: number): boolean => {
            if (_year % 4 !== 0) {
                return false;
            } else if (_year % 400 === 0) {
                return true;
            } else {
                return _year % 100 !== 0;
            }
        };

        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        } else if ((month % 2 === 0 && month < 8) || (month % 2 === 1 && month > 8)) {
            return 30;
        } else {
            return 31;
        }
    }

    /**
     * Method that check equality of 2 dates.
     */
    static datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        } else {
            return date1.toDateString() === date2.toDateString();
        }
    }

    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - 11)
     */
    public onKeydownHandler(event: KeyboardEvent, index: number): void {
        switch (event.key) {
            case 'Enter':
            case ' ': {
                event.preventDefault();
                this.onKeySelect.next(index);
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                if (index === 0) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(11)
                } else {
                    this.onFocusIdChange.next(index - 1)
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                if (index === 11) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(0)
                } else {
                    this.onFocusIdChange.next(index + 1)
                }
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= 3) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(index + 8);
                } else {
                    this.onFocusIdChange.next(index - 4);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= 8) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(index - 8);
                } else {
                    this.onFocusIdChange.next(index + 4);
                }
                break;
            }
            case 'Tab': {
                if (this.focusEscapeFunction && !event.shiftKey) {
                    event.preventDefault();
                    this.focusEscapeFunction();
                }
                break;
            }
        }
    }

}
