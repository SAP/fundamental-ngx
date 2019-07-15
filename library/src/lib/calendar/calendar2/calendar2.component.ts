import {
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar2DayViewComponent } from './calendar2-views/calendar2-day-view/calendar2-day-view.component';
import { DateFormatParser } from '../format/date-parser';
import { Calendar2Service } from './calendar2.service';
import { FdRangeDate } from './models/fd-range-date';

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
    ],
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-has-display-block]': 'true',
        '[attr.id]': 'id'
    }
})
export class Calendar2Component implements OnInit, ControlValueAccessor {

    @ViewChild('dayViewComponent') dayViewComponent: Calendar2DayViewComponent;

    invalidDate: boolean = false;

    /** The currently selected FdDate model in single mode. */
    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    public selectedRangeDate: FdRangeDate;

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    @Input()
    public activeView: FdCalendarView = 'day';

    /** The day of the week the calendar should start on. 0 represents Sunday, 1 is Monday, 2 is Tuesday, and so on. */
    @Input()
    public startingDayOfWeek: DaysOfWeek = 1;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    public calType: CalendarType = 'single';

    /** @hidden */
    @HostBinding('class.fd-calendar')
    private fdCalendarClass: boolean = true;

    currentlyDisplayed: CalendarCurrent;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    /** Event thrown every time active view is changed */
    @Output()
    public readonly activeViewChange = new EventEmitter<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    public readonly selectedDateChange = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    public readonly selectedRangeDateChange = new EventEmitter<FdRangeDate>();

    /** Event thrown every time when value is overwritten from outside and throw back isValid */
    @Output()
    public readonly isValidDateChange = new EventEmitter<boolean>();

    /** Event thrown every time when calendar should be closed */
    @Output()
    public readonly closeCalendar = new EventEmitter<void>();

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
    onChange: Function = () => {
    };
    /** @hidden */
    onTouched: Function = () => {
    };

    /** That allows to define function that should happen, when focus should normally escape of component */
    @Input()
    escapeFocusFunction: Function = () => {
        if (document.getElementById(this.id + '-left-arrow')) {
            document.getElementById(this.id + '-left-arrow').focus();
        }
    };

    /** @hidden */
    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    /** @hidden */
    ngOnInit(): void {
        this.prepareDisplayedView();
    }

    /** Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms */
    writeValue(selected: { date?: FdDate, start?: FdDate, end?: FdDate }): void {
        let valid: boolean = true;
        if (selected) {
            if (selected.date && this.calType === 'single') {
                valid = selected.date.isDateValid();
                if (selected.date.isDateValid()) {
                    this.selectedDate = selected.date;
                    this.prepareDisplayedView();
                }
            }
            if ((selected.start || selected.end) && this.calType === 'range') {
                if (selected.start && !selected.start.isDateValid()) {
                    valid = false;
                }
                if (selected.end && !selected.end.isDateValid()) {
                    valid = false;
                }
                if (valid) {
                    this.selectedRangeDate = { start: selected.start, end: selected.end };
                    this.prepareDisplayedView();
                }
            }
        }
        this.invalidDate = !valid;
        this.isValidDateChange.emit(valid);
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState?(isDisabled: boolean): void {
        // Not needed
    }

    /** @hidden */
    public selectedDateChanged(date: FdDate) {
        this.selectedDate = date;
        this.onChange({ date: date });
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }

    /** @hidden */
    public selectedRangeDateChanged(dates: FdRangeDate): void {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    }

    /** Function that allows to switch actual view to next month */
    public displayNextMonth(): void {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
        this.onTouched();
    }

    /** Function that allows to switch actual view to previous month */
    public displayPreviousMonth(): void {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
        this.onTouched();
    }

    public setCurrentlyDisplayed(fdDate: FdDate): void {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }

    private prepareDisplayedView(): void {
        if (this.calType === 'single' && this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
        } else if (this.selectedRangeDate && this.selectedRangeDate.start) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.start.month,
                year: this.selectedRangeDate.start.year
            };
        } else if (this.selectedRangeDate && this.selectedRangeDate.end) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.end.month,
                year: this.selectedRangeDate.end.year
            };
        } else {
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    }

}
