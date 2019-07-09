import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let calendarUniqueId: number = 0;

/** Type of calendar */
export type CalendarType = 'single' | 'range';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year';

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 */
@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Calendar2Component),
            multi: true
        }
    ]
})
export class Calendar2Component implements OnInit, ControlValueAccessor {

    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    @Input()
    public selectedRangeDate: { start: FdDate, end: FdDate };

    @Input()
    public activeView: FdCalendarView = 'day';

    @Input()
    public startingDayOfWeek: DaysOfWeek = 1;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    @HostBinding('class.fd-calendar')
    private fdCalendarClass: boolean = true;

    @HostBinding('style.display')
    private displayStyle: string = 'block';

    currentlyDisplayed: CalendarCurrent;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView>
        = new EventEmitter<FdCalendarView>();

    @Output()
    selectedDateChange = new EventEmitter<FdDate>();

    @Output()
    selectedRangeDateChange = new EventEmitter<{ start: FdDate, end: FdDate }>();

    /**
     * Function used to disable certain dates in the calendar.
     * @param d Date
     */
    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    disableRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    disableRangeEndFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    blockRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    blockRangeEndFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar.
     * @param d Date
     */
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    /** @hidden */
    onChange: Function = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
        this.prepareDisplayedView();
    }

    /** Function that provides  */
    writeValue(selected: { date?: FdDate, start?: FdDate, end?: FdDate }): void {
        if (selected) {
            console.log(selected);
            if (selected.date && this.calType === 'single') {
                this.selectedDate = selected.date;
            }
            if ((selected.start || selected.end) && this.calType === 'range') {
                this.selectedRangeDate = { start: selected.start, end: selected.end };
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Not needed
    }

    public selectedDateChanged(date: FdDate) {
        this.selectedDate = date;
        this.onChange({date: date});
        this.selectedDateChange.emit(date);
    }

    public selectedRangeDateChanged(dates: { start: FdDate, end: FdDate }) {
        this.selectedRangeDate = dates;
        this.onChange(dates);
        this.selectedRangeDateChange.emit(dates);
    }

    public displayNextMonth() {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    }

    public displayPreviousMonth() {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    }

    private prepareDisplayedView(): void {
        if (this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
        } else {
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    }

}
