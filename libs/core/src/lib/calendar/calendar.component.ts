import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

import { DateRange } from './models/date-range';
import { CalendarCurrent } from './models/calendar-current';
import { CalendarYearGrid } from './models/calendar-year-grid';
import { AggregatedYear } from './models/aggregated-year';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarService } from './calendar.service';
import { createMissingDateImplementationError } from './calendar-errors';
import { CalendarAggregatedYearViewComponent } from './calendar-views/calendar-aggregated-year-view/calendar-aggregated-year-view.component';
import { DisableDateFunction, EscapeFocusFunction, FocusableCalendarView } from './models/common';
import { CalendarType, DaysOfWeek, FdCalendarView, NavigationButtonDisableFunction } from './types';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

let calendarUniqueId = 0;

/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 *
 * Calendar component used for selecting dates, typically used by the DatePicker and DateTimePicker components.
 * Supports the Angular forms module, enabling form validity, ngModel, etc.
 * ```html
 * <fd-calendar></fd-calendar>
 * ```
 *
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
        CalendarService,
        contentDensityObserverProviders()
    ],
    host: {
        '(focusout)': '_focusOut($event)',
        '[attr.id]': 'id',
        class: 'fd-calendar fd-has-display-block'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CalendarHeaderComponent,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        CalendarDayViewComponent,
        CalendarMonthViewComponent,
        CalendarYearViewComponent,
        CalendarAggregatedYearViewComponent
    ]
})
export class CalendarComponent<D> implements OnInit, OnChanges, ControlValueAccessor, Validator, OnDestroy {
    /** The currently selected date model in single mode. */
    @Input()
    selectedDate: Nullable<D>;

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = false;

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    @Input()
    @HostBinding('class.fd-calendar--mobile-landscape')
    mobileLandscape = false;

    /** Whether calendar is used inside mobile in portrait mode */
    @Input()
    @HostBinding('class.fd-calendar--mobile-portrait')
    mobilePortrait = false;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    selectedRangeDate: DateRange<D>;

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    @Input()
    activeView: FdCalendarView = 'day';

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek;

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
     * Rule accepts method with D object as a parameter. ex:
     * `rule: (fdDate: D) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule<D>[] = [];

    /**
     * Object to customize year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    yearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 5
    };

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    aggregatedYearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 3
    };

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect = false;

    /** Event thrown every time active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

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
    @ViewChild(CalendarDayViewComponent)
    _dayViewComponent: CalendarDayViewComponent<D>;

    /** @hidden */
    @ViewChild(CalendarMonthViewComponent)
    _monthViewComponent: CalendarMonthViewComponent<D>;

    /** @hidden */
    @ViewChild(CalendarYearViewComponent)
    _yearViewComponent: CalendarYearViewComponent<D>;

    /** @hidden */
    @ViewChild(CalendarAggregatedYearViewComponent)
    _aggregatedYearViewComponent: CalendarAggregatedYearViewComponent<D>;

    /** @hidden */
    @ViewChild(CalendarHeaderComponent)
    _calendarHeaderComponent: CalendarHeaderComponent<D>;

    /**
     * Function used to disable previous button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     */
    @Input()
    previousButtonDisableFunction: NavigationButtonDisableFunction<D>;

    /**
     * Function used to disable next button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     */
    @Input()
    nextButtonDisableFunction: NavigationButtonDisableFunction<D>;

    /**
     * @hidden
     * Currently displayed days depending on month and year
     */
    _currentlyDisplayed: CalendarCurrent;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _adapterStartingDayOfWeek: DaysOfWeek;

    /** @hidden */
    previousButtonDisabled: boolean;

    /** @hidden */
    nextButtonDisabled: boolean;

    /** That allows to define function that should happen, when focus should normally escape of component */
    @Input()
    escapeFocusFunction: EscapeFocusFunction = (event?: KeyboardEvent): void => {
        event?.preventDefault();
        this._calendarHeaderComponent?.focus();
    };

    /**
     * Function used to disable certain dates in the calendar.
     * @param date date
     */
    @Input()
    disableFunction: DisableDateFunction<D> = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param date date
     */
    @Input()
    disableRangeStartFunction: DisableDateFunction<D> = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param date date
     */
    @Input()
    disableRangeEndFunction: DisableDateFunction<D> = () => false;

    /** @hidden */
    onChange: (_: D | DateRange<D>) => void = () => {};

    /** @hidden */
    onTouched: () => void = () => {};

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contentDensityObserver: ContentDensityObserver,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
        _contentDensityObserver.subscribe();
        // set default value
        this._adapterStartingDayOfWeek = (this._dateTimeAdapter.getFirstDayOfWeek() + 1) as DaysOfWeek;
        this.selectedDate = this._dateTimeAdapter.today();
        this._changeDetectorRef.markForCheck();
        this._listenToLocaleChanges();
    }

    /** @hidden */
    ngOnInit(): void {
        this._prepareDisplayedView();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            'nextButtonDisableFunction' in changes ||
            'previousButtonDisableFunction' in changes ||
            '_currentlyDisplayed' in changes
        ) {
            this._setNavigationButtonsStates();
        }
    }

    /** @hidden */
    getWeekStartDay(): DaysOfWeek {
        return this.startingDayOfWeek === undefined ? this._adapterStartingDayOfWeek : this.startingDayOfWeek;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    writeValue(selected: DateRange<D> | D): void {
        let valid = true;

        if (this.calType === 'single') {
            selected = <D>selected;

            valid = this._dateTimeAdapter.isValid(selected);

            this.selectedDate = selected;
        }

        if (this.calType === 'range' && selected) {
            selected = <DateRange<D>>selected;

            if (!this._dateTimeAdapter.isValid(selected.start) || !this._dateTimeAdapter.isValid(selected.end)) {
                valid = false;
            }

            this.selectedRangeDate = {
                start: selected.start,
                end: selected.end
            };
        }

        if (valid) {
            this._prepareDisplayedView();
        }

        this._changeDetectorRef.detectChanges();

        this.isValidDateChange.emit(valid);
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(): { [key: string]: any } | null {
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

    /**
     * Method that handle active view change and throws event.
     *
     * Fired by calendar header component.
     */
    handleActiveViewChange(activeView: FdCalendarView): void {
        if (activeView === this.activeView) {
            return;
        }

        this.activeView = activeView;

        this.activeViewChange.emit(activeView);

        if (activeView === 'month') {
            this.onMonthViewSelected();
        }
        if (activeView === 'year') {
            this.onYearViewSelected();
        }
        if (activeView === 'aggregatedYear') {
            this.onYearsRangeViewSelected();
        }

        this._setNavigationButtonsStates();
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    selectedDateChanged(date: D): void {
        this.selectedDate = date;
        this._setNavigationButtonsStates();
        this.onChange(date);
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    selectedRangeDateChanged(dates: DateRange<D>): void {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
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
        this._setNavigationButtonsStates();
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
        this._setNavigationButtonsStates();
    }

    /** Function that allows to switch actual view to next month */
    displayNextMonth(): void {
        if (this._currentlyDisplayed.month === 12) {
            this._currentlyDisplayed = { year: this._currentlyDisplayed.year + 1, month: 1 };
        } else {
            this._currentlyDisplayed = {
                year: this._currentlyDisplayed.year,
                month: this._currentlyDisplayed.month + 1
            };
        }
    }

    /** Function that allows to switch actual view to previous month */
    displayPreviousMonth(): void {
        if (this._currentlyDisplayed.month <= 1) {
            this._currentlyDisplayed = { year: this._currentlyDisplayed.year - 1, month: 12 };
        } else {
            this._currentlyDisplayed = {
                year: this._currentlyDisplayed.year,
                month: this._currentlyDisplayed.month - 1
            };
        }
    }

    /** Function that allows to switch actual view to next year */
    displayNextYear(): void {
        this._currentlyDisplayed = { month: this._currentlyDisplayed.month, year: this._currentlyDisplayed.year + 1 };
    }

    /** Function that allows to switch actual view to previous year */
    displayPreviousYear(): void {
        this._currentlyDisplayed = { month: this._currentlyDisplayed.month, year: this._currentlyDisplayed.year - 1 };
    }

    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearList(): void {
        this._yearViewComponent.loadNextYearList();
        this._currentlyDisplayed = {
            month: this._currentlyDisplayed.month,
            year: this._yearViewComponent._firstYearInList
        };
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearList(): void {
        this._yearViewComponent.loadPreviousYearList();
        this._currentlyDisplayed = {
            month: this._currentlyDisplayed.month,
            year: this._yearViewComponent._firstYearInList
        };
    }

    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearsList(): void {
        this._aggregatedYearViewComponent.loadNextYearsList();
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearsList(): void {
        this._aggregatedYearViewComponent.loadPreviousYearsList();
    }

    /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     */
    setCurrentlyDisplayed(date: Nullable<D>): void {
        if (this._dateTimeAdapter.isValid(date)) {
            this._currentlyDisplayed = {
                month: this._dateTimeAdapter.getMonth(date!),
                year: this._dateTimeAdapter.getYear(date!)
            };
        }
    }

    /**
     * Set initial focus on one of the calendar's element
     */
    initialFocus(): void {
        this._getActiveFocusableView()?.setFocusOnCell();
    }

    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     */
    handleMonthViewChange(month: number): void {
        this._currentlyDisplayed = { month, year: this._currentlyDisplayed.year };
        this.activeView = 'day';
        this.onDaysViewSelected();
        this.activeViewChange.emit(this.activeView);
    }

    /** Select year */
    selectedYear(yearSelected: number): void {
        this.activeView = 'day';
        this._currentlyDisplayed.year = yearSelected;
        this.onDaysViewSelected();
    }

    /** Select year range */
    selectedYears(yearsSelected: AggregatedYear): void {
        this.activeView = 'year';
        this._currentlyDisplayed = {
            ...this._currentlyDisplayed,
            year: yearsSelected.startYear
        };
        this.onYearViewSelected();
    }

    /** @hidden */
    onDaysViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        this._dayViewComponent?.setFocusOnCell();
    }

    /** @hidden */
    onMonthViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        this._monthViewComponent?.setFocusOnCell();
    }

    /** @hidden */
    onYearViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        this._yearViewComponent?.setFocusOnCell();
    }

    /** @hidden */
    onYearsRangeViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        this._aggregatedYearViewComponent?.setFocusOnCell();
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean {
        if (this.calType === 'single') {
            return this._dateTimeAdapter.isValid(this.selectedDate);
        }
        if (this.calType === 'range') {
            return (
                this.selectedRangeDate &&
                this._dateTimeAdapter.isValid(this.selectedRangeDate.start) &&
                this._dateTimeAdapter.isValid(this.selectedRangeDate.end)
            );
        }
        return false;
    }

    /** @hidden */
    private _listenToLocaleChanges(): void {
        this._subscriptions.add(
            this._dateTimeAdapter.localeChanges.subscribe(() => {
                this._adapterStartingDayOfWeek = (this._dateTimeAdapter.getFirstDayOfWeek() + 1) as DaysOfWeek;
                this._changeDetectorRef.markForCheck();
            })
        );
    }

    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     */
    private _prepareDisplayedView(): void {
        if (this.calType === 'single' && this._dateTimeAdapter.isValid(this.selectedDate)) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(this.selectedDate),
                month: this._dateTimeAdapter.getMonth(this.selectedDate)
            };
        } else if (this.selectedRangeDate && this.selectedRangeDate.start) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(this.selectedRangeDate.start),
                month: this._dateTimeAdapter.getMonth(this.selectedRangeDate.start)
            };
        } else if (this.selectedRangeDate && this.selectedRangeDate.end) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(this.selectedRangeDate.end),
                month: this._dateTimeAdapter.getMonth(this.selectedRangeDate.end)
            };
        } else {
            const today = this._dateTimeAdapter.today();
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(today),
                month: this._dateTimeAdapter.getMonth(today)
            };
        }
    }

    /** @hidden */
    private _getActiveFocusableView(): FocusableCalendarView | null {
        switch (this.activeView) {
            case 'day':
                return this._dayViewComponent;
            case 'month':
                return this._monthViewComponent;
            case 'year':
                return this._yearViewComponent;
            case 'aggregatedYear':
                return this._aggregatedYearViewComponent;
            default:
                return null;
        }
    }

    /** @hidden */
    private _setNavigationButtonsStates(): void {
        this.previousButtonDisabled =
            typeof this.previousButtonDisableFunction === 'function' &&
            this.previousButtonDisableFunction(this.selectedDate, this._currentlyDisplayed, this.activeView);
        this.nextButtonDisabled =
            typeof this.nextButtonDisableFunction === 'function' &&
            this.nextButtonDisableFunction(this.selectedDate, this._currentlyDisplayed, this.activeView);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _focusOut(event: FocusEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }
}
