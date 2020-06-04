import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarI18n } from './i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { FdRangeDate } from './models/fd-range-date';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { SpecialDayRule } from './models/special-day-rule';
import { CalendarService } from './calendar.service';
import { CalendarYearGrid } from './models/calendar-year-grid';
import { AggregatedYear } from './models/aggregated-year';
import { CalendarAggregatedYearViewComponent } from './calendar-views/calendar-aggregated-year-view/calendar-aggregated-year-view.component';

let calendarUniqueId: number = 0;

/** Type of calendar */
export type CalendarType = 'single' | 'range';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year' | 'aggregatedYear';

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 *
 * Calendar component used for selecting dates, typically used by the DatePicker and DateTimePicker components.
 * Supports the Angular forms module, enabling form validity, ngModel, etc.
 * ```html
 * <fd-calendar></fd-calendar>
 * ```
 */
@Component({
    selector: 'fd-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        },
        CalendarService
    ],
    host: {
        '(blur)': 'onTouched()',
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, ControlValueAccessor, Validator {
    /** @hidden */
    @ViewChild(CalendarDayViewComponent) dayViewComponent: CalendarDayViewComponent;

    /** @hidden */
    @ViewChild(CalendarYearViewComponent) yearViewComponent: CalendarYearViewComponent;

    /** @hidden */
    @ViewChild(CalendarAggregatedYearViewComponent) aggregatedYearViewComponent: CalendarAggregatedYearViewComponent;

    /** @hidden */
    @HostBinding('class.fd-calendar')
    fdCalendarClass: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-has-display-block')
    fdHasDisplayBlockClass: boolean = true;

    /** Currently displayed days depending on month and year */
    currentlyDisplayed: CalendarCurrent;

    /** The currently selected FdDate model in single mode. */
    @Input()
    selectedDate: FdDate = FdDate.getToday();

    /** Whether compact mode should be included into calendar */
    @Input()
    @HostBinding('class.fd-calendar--compact')
    compact: boolean = false;

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends: boolean = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers: boolean = false;

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    @Input()
    @HostBinding('class.fd-calendar--mobile-landscape')
    mobileLandscape: boolean = false;

    /** Whether calendar is used inside mobile in portrait mode */
    @Input()
    @HostBinding('class.fd-calendar--mobile-portrait')
    mobilePortrait: boolean = false;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    selectedRangeDate: FdRangeDate;

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    @Input()
    activeView: FdCalendarView = 'day';

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__special-day--{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with FdDate object as a parameter. ex:
     * `rule: (fdDate: FdDate) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule[] = [];

    /**
     * Object to customize year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    yearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 5,
        yearMapping: (num: number) => num.toString()
    };

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    aggregatedYearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 3,
        yearMapping: (num: number) => num.toString()
    };

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect: boolean = false;

    /** Event thrown every time active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<FdDate> = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<FdRangeDate> = new EventEmitter<FdRangeDate>();

    /** Event thrown every time when value is overwritten from outside and throw back isValid */
    @Output()
    readonly isValidDateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown every time when calendar should be closed */
    @Output()
    readonly closeCalendar: EventEmitter<void> = new EventEmitter<void>();

    /** Event thrown, when close button is clicked */
    @Output()
    readonly closeClicked: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeStartFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeEndFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /** That allows to define function that should happen, when focus should normally escape of component */
    @Input()
    escapeFocusFunction: Function = (): void => {
        if (document.getElementById(this.id + '-left-arrow')) {
            document.getElementById(this.id + '-left-arrow').focus();
        }
    };

    /** @hidden */
    constructor(calendarI18n: CalendarI18n, private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._prepareDisplayedView();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    writeValue(selected: FdRangeDate | FdDate): void {
        let valid: boolean = true;
        if (selected) {
            if (this.calType === 'single') {
                selected = <FdDate>selected;

                valid = selected.isDateValid();
                this.selectedDate = selected;

                if (selected.isDateValid()) {
                    this._prepareDisplayedView();
                }
            } else if (this.calType === 'range') {
                selected = <FdRangeDate>selected;

                if (!selected.start || !selected.end) {
                    valid = false;
                }
                if (selected.start && !selected.start.isDateValid()) {
                    valid = false;
                }
                if (selected.end && !selected.end.isDateValid()) {
                    valid = false;
                }
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                if (valid) {
                    this._prepareDisplayedView();
                }
            }
        }
        this._changeDetectorRef.detectChanges();
        this.isValidDateChange.emit(valid);
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(
        control: AbstractControl
    ): {
        [key: string]: any;
    } {
        return this.isModelValid()
            ? null
            : {
                  dateValidation: {
                      valid: false
                  }
              };
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

    /**
     * Method that handle active view change and throws event.
     */
    handleActiveViewChange(activeView: FdCalendarView): void {
        this.activeView = activeView;
        this.activeViewChange.emit(activeView);
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    selectedDateChanged(date: FdDate): void {
        this.selectedDate = date;
        this.onChange(date);
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    selectedRangeDateChanged(dates: FdRangeDate): void {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    }

    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    handleNextArrowClick(): void {
        switch (this.activeView) {
            case 'day':
                this.displayNextMonth();
                break;
            case 'month':
                this.displayNextYear();
                break;
            case 'year':
                this.displayNextYearList();
                break;
            case 'aggregatedYear':
                this.displayNextYearsList();
                break;
        }
        this.onTouched();
    }

    /** Function that handles previous arrow icon click, depending on current view it changes month, year or list of years */
    handlePreviousArrowClick(): void {
        switch (this.activeView) {
            case 'day':
                this.displayPreviousMonth();
                break;
            case 'month':
                this.displayPreviousYear();
                break;
            case 'year':
                this.displayPreviousYearList();
                break;
            case 'aggregatedYear':
                this.displayPreviousYearsList();
                break;
        }
        this.onTouched();
    }

    /** Function that allows to switch actual view to next month */
    displayNextMonth(): void {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    }

    /** Function that allows to switch actual view to previous month */
    displayPreviousMonth(): void {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    }

    /** Function that allows to switch actual view to next year */
    displayNextYear(): void {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year + 1 };
    }

    /** Function that allows to switch actual view to previous year */
    displayPreviousYear(): void {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year - 1 };
    }

    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearList(): void {
        this.yearViewComponent.loadNextYearList();
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearList(): void {
        this.yearViewComponent.loadPreviousYearList();
    }

    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearsList(): void {
        this.aggregatedYearViewComponent.loadNextYearsList();
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearsList(): void {
        this.aggregatedYearViewComponent.loadPreviousYearsList();
    }

    /** Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     */
    setCurrentlyDisplayed(fdDate: FdDate): void {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }

    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     */
    handleMonthViewChange(month: number): void {
        this.currentlyDisplayed = { month: month, year: this.currentlyDisplayed.year };
        this.activeView = 'day';
        this.activeViewChange.emit(this.activeView);
        this._changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }

    selectedYear(yearSelected: number): void {
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
        this._changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }

    selectedYears(yearsSelected: AggregatedYear): void {
        this.activeView = 'year';
        this.currentlyDisplayed.year = yearsSelected.startYear;
        this._changeDetectorRef.detectChanges();
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean {
        if (this.calType === 'single') {
            return this.selectedDate && this.selectedDate instanceof FdDate && this.selectedDate.isDateValid();
        } else {
            return (
                this.selectedRangeDate &&
                this.selectedRangeDate.start &&
                this.selectedRangeDate.start instanceof FdDate &&
                this.selectedRangeDate.start.isDateValid() &&
                this.selectedRangeDate.end &&
                this.selectedRangeDate.end instanceof FdDate &&
                this.selectedRangeDate.start.isDateValid()
            );
        }
    }

    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     */
    private _prepareDisplayedView(): void {
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
