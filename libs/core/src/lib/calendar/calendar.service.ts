import { Subject } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
import { FdDate } from './models/fd-date';
import { FdRangeDate } from './models/fd-range-date';
import { RtlService } from '../utils/services/rtl.service';

@Injectable()
export class CalendarService {

    rowAmount: number = 3;
    colAmount: number = 4;

    /** Event thrown, when the element is selected by space or enter keys */
    onKeySelect: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus goes after list of elements */
    onListEndApproach: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus goes before list of elements */
    onListStartApproach: Subject<number> = new Subject<number>();

    /** Event thrown, when the focus is changed. */
    onFocusIdChange: Subject<number> = new Subject<number>();

    /** Left Arrow Id, which will be focused by default on focus escape */
    leftArrowId: string;

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
     * Method that check equality of 2 range dates.
     */
    static rangeDatesEqual(dateRange1: FdRangeDate, dateRange2: FdRangeDate): boolean {
        if (!dateRange1 || !dateRange2) {
            return false;
        }

        return this.datesEqual(dateRange1.start, dateRange2.start) && this.datesEqual(dateRange1.end, dateRange2.end);
    }

    /**
     * Method to check if date is betweeen 2 dates
     */
    static isBetween(dateToCheck: FdDate, dateRange: FdRangeDate): boolean {
        return (
            (dateRange.start && (dateRange.start.getTimeStamp() < dateToCheck.getTimeStamp())) &&
            (dateRange.end && (dateRange.end.getTimeStamp() > dateToCheck.getTimeStamp()))
        );
    }

    constructor(
        @Optional() private _rtlService: RtlService
    ) {}

    /**
     * Standardized method to calculate grid [x][y] to index number
     */
    getId(row: number, col: number): number {
        return row * this.colAmount + col;
    }

    /**
     * Method that handles keydown events, dedicated for All Calendar views, which have a list with row x col elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - (rowAmount * colAmount))
     */
    onKeydownHandler(event: KeyboardEvent, index: number): void {
        const rtl: boolean = this._rtlService && this._rtlService.rtl.getValue();

        switch (event.key) {
            case 'Spacebar':
            case 'Enter':
            case ' ': {
                event.preventDefault();
                this.onKeySelect.next(index);
                break;
            }
            case 'Left':
            case 'ArrowLeft': {
                event.preventDefault();
                if (!rtl) {
                    this.focusLeftElement(index);
                } else {
                    this.focusRightElement(index);
                }
                break;
            }
            case 'Right':
            case 'ArrowRight': {
                event.preventDefault();
                if (!rtl) {
                    this.focusRightElement(index);
                } else {
                    this.focusLeftElement(index);
                }
                break;
            }
            case 'Up':
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= this.colAmount - 1) {
                    this.onListStartApproach.next(this.getId(this.rowAmount - 1, 0) + index);
                } else {
                    this.onFocusIdChange.next(index - this.colAmount);
                }
                break;
            }
            case 'Down':
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= this.getId(this.rowAmount - 1, 0)) {
                    this.onListEndApproach.next(index - this.getId(this.rowAmount - 1, 0));
                } else {
                    this.onFocusIdChange.next(index + this.colAmount);
                }
                break;
            }
            case 'Tab': {
                if (!event.shiftKey) {
                    if (this.focusEscapeFunction) {
                        this.focusEscapeFunction();
                    } else {
                        const element: HTMLElement = document.getElementById(this.leftArrowId);
                        if (element) {
                            element.focus();
                        }
                    }
                    event.preventDefault();
                    break;
                }
            }
        }
    }

    /**
     * @hidden
     * Right Element focus trigger
     */
    focusRightElement(index: number): void {
        if (index === this.getId(this.rowAmount, 0) - 1) {
            this.onListEndApproach.next(0);
        } else {
            this.onFocusIdChange.next(index + 1)
        }
    }

    /**
     * @hidden
     * Left Element focus trigger
     */
    focusLeftElement(index: number): void {
        if (index === 0) {
            this.onListStartApproach.next(this.getId(this.rowAmount, 0) - 1);
        } else {
            this.onFocusIdChange.next(index - 1)
        }
    }
}
