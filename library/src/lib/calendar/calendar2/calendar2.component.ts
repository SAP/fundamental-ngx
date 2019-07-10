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
export class Calendar2Component implements OnInit, ControlValueAccessor, OnChanges {

    @ViewChild('dayViewComponent') dayViewComponent: Calendar2DayViewComponent;

    invalidDate: boolean = false;

    /** The currently selected FdDate model in single mode. */
    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    /** The currently selected FdDates model start date in range mode. */
    @Input()
    public selectedRangeFirst: FdDate;

    /** The currently selected FdDates model end date in range mode. */
    @Input()
    public selectedRangeLast: FdDate;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    public selectedRangeDate: { start: FdDate, end: FdDate };

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    @Input()
    public activeView: FdCalendarView = 'day';

    /** The day of the week the calendar should start on. 0 represents Sunday, 1 is Monday, 2 is Tuesday, and so on. */
    @Input()
    public startingDayOfWeek: DaysOfWeek = 1;

    /** String date which can be interpreted by calendar and shown in grid */
    @Input()
    public stringDate: string;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    public calType: CalendarType = 'single';

    /** @hidden */
    @HostBinding('class.fd-calendar')
    private fdCalendarClass: boolean = true;

    /** @hidden */
    @HostBinding('style.display')
    private displayStyle: string = 'block';


    currentlyDisplayed: CalendarCurrent;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    /** Event thrown every time active view is changed */
    @Output()
    public readonly activeViewChange = new EventEmitter<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    selectedDateChange = new EventEmitter<FdDate>();

    /** Event thrown every time selected first date in range mode is changed */
    @Output()
    selectedRangeFirstChange = new EventEmitter<FdDate>();

    /** Event thrown every time selected last date in range mode is changed */
    @Output()
    selectedRangeLastChange = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    selectedRangeDateChange = new EventEmitter<{ start: FdDate, end: FdDate }>();

    /** Event thrown every time when value is overwritten from outside and throw back isValid */
    @Output()
    dateValidityChange = new EventEmitter<{ isValid: boolean }>();

    /** Event thrown every time when calendar should be closed */
    @Output()
    closeCalendar = new EventEmitter();

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
                public calendarI18n: CalendarI18n,
                public dateAdapter: DateFormatParser,
                private service: Calendar2Service) {
    }

    /** @hidden */
    ngOnInit() {
        this.prepareDisplayedView();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.stringDate) {
            if (changes.stringDate.currentValue !== changes.stringDate.previousValue) {
                this.dateStringUpdate(changes.stringDate.currentValue);
            }
        }
    }

    /** Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms */
    writeValue(selected: { date?: FdDate, start?: FdDate, end?: FdDate }): void {
        let valid: boolean = true;
        if (selected) {
            if (selected.date && this.calType === 'single') {
                valid = this.validateDateFromDatePicker(selected.date);
                if (valid) {
                    this.selectedDate = selected.date;
                    this.prepareDisplayedView();
                }
            }
            if ((selected.start || selected.end) && this.calType === 'range') {
                valid = !
                    (!selected.start || !this.validateDateFromDatePicker(selected.start) ||
                        (!selected.end || !this.validateDateFromDatePicker(selected.end))
                    );
                if (valid) {
                    this.selectedRangeDate = { start: selected.start, end: selected.end };
                    this.prepareDisplayedView();
                }
            }
        }
        this.invalidDate = !valid;
        this.dateValidityChange.emit({isValid: valid});
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
    public selectedRangeDateChanged(dates: { start: FdDate, end: FdDate }) {
        if (dates) {
            if (dates.start && !this.service.datesEqual(dates.start, this.selectedRangeFirst)) {
                this.selectedRangeFirst = dates.start;
                this.selectedRangeFirstChange.emit(dates.start);
            }
            if (dates.end && !this.service.datesEqual(dates.end, this.selectedRangeLast)) {
                this.selectedRangeLast = dates.end;
                this.selectedRangeLastChange.emit(dates.end);
            }
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    }

    /** Function that allows to switch actual view to next month */
    public displayNextMonth() {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
        this.onTouched();
    }

    /** Function that allows to switch actual view to previous month */
    public displayPreviousMonth() {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
        this.onTouched();
    }

    /** @hidden */
    dateStringUpdate(date: string) {
        if (date) {
            if (this.calType === 'single') {
                const fdDate = this.dateAdapter.parse(date);
                this.invalidDate = !this.validateDateFromDatePicker(fdDate);
                if (!this.invalidDate) {
                    this.selectedDate = fdDate;
                    this.setCurrentlyDisplayed(fdDate);
                    this.onChange({ date: this.selectedDate });
                    this.selectedDateChange.emit(this.selectedDate);
                } else {
                    this.selectedDate = FdDate.getToday();
                    this.setCurrentlyDisplayed(this.selectedDate);
                }
            } else {
                const currentDates = date.split(this.dateAdapter.rangeDelimiter);
                const firstDate = this.dateAdapter.parse(currentDates[0]);
                const secondDate = this.dateAdapter.parse(currentDates[1]);
                this.invalidDate =
                    !this.validateDateFromDatePicker(firstDate) || !this.validateDateFromDatePicker(secondDate);

                if (!this.invalidDate) {
                    if (firstDate.toDate().getTime() > secondDate.toDate().getTime()) {
                        this.selectedRangeLast = firstDate;
                        this.selectedRangeFirst = secondDate;
                    } else {
                        this.selectedRangeLast = secondDate;
                        this.selectedRangeFirst = firstDate;
                    }
                    this.selectedRangeDate = {
                        start: this.selectedRangeFirst,
                        end: this.selectedRangeLast ? this.selectedRangeLast : this.selectedRangeFirst
                    };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.onChange(this.selectedRangeDate);
                    this.setCurrentlyDisplayed(this.selectedRangeFirst);
                }
            }

            this.dateValidityChange.emit({ isValid: !this.invalidDate });
        }
    }

    private setCurrentlyDisplayed(fdDate: FdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }

    private validateDateFromDatePicker(date: FdDate): boolean {
        if (!date) {
            return false;
        }

        if (!date.year || !date.month || !date.day) {
            return false;
        }

        if (date.year < 1000 || date.year > 3000 || date.month < 1 || date.month > 12) {
            return false;
        }

        if (date.day < 1 || date.day > this.service.getDaysInMonth(date.month, date.year)) {
            return false;
        }

        return true;
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
