import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
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

import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FD_LANGUAGE } from '@fundamental-ngx/i18n';
import { createMissingDateImplementationError } from './calendar-errors';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarAggregatedYearViewComponent } from './calendar-views/calendar-aggregated-year-view/calendar-aggregated-year-view.component';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarService } from './calendar.service';
import { AggregatedYear } from './models/aggregated-year';
import { CalendarCurrent } from './models/calendar-current';
import { CalendarYearGrid } from './models/calendar-year-grid';
import { DisableDateFunction, EscapeFocusFunction, FocusableCalendarView } from './models/common';
import { DateRange } from './models/date-range';
import { patchDeprecatedI18nLabels } from './patch-deprecated-i18n-labels';
import {
    CalendarType,
    CalendarTypeEnum,
    DaysOfWeek,
    FdCalendarView,
    FdCalendarViewEnum,
    NavigationButtonDisableFunction
} from './types';

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
    styleUrl: './calendar.component.scss',
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
        contentDensityObserverProviders(),
        {
            provide: FD_LANGUAGE,
            useFactory: patchDeprecatedI18nLabels
        }
    ],
    host: {
        '[attr.id]': 'id',
        class: 'fd-calendar fd-has-display-block'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ContentDensityModule,
        CalendarHeaderComponent,
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

    /** The currently selected date model in multiple mode. */
    @Input()
    selectedMultipleDates: Array<D>;

    /** The currently selected date model with start and end in range mode. */
    @Input()
    selectedRangeDate: DateRange<D>;

    /** The currently selected date model with multiple ranges. */
    @Input()
    selectedMultipleDateRanges: Array<DateRange<D>> = [];

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

    /**
     * Whether the user wants to select multiple days or multiple range dates.
     * If `displayWeekNumbers` is true, the user can click on the week number to mark the related row.
     * The user can click on week days to mark the related column.
     * Note: Clickable selection for week row or column does not work for range selections.
     */
    @Input()
    allowMultipleSelection = false;

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    @Input()
    @HostBinding('class.fd-calendar--mobile-landscape')
    mobileLandscape = false;

    /** Whether calendar is used inside mobile in portrait mode */
    @Input()
    @HostBinding('class.fd-calendar--mobile-portrait')
    mobilePortrait = false;

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    @Input()
    activeView: FdCalendarView = FdCalendarViewEnum.Day;

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek;

    /**
     * The type of calendar
     * 'single' for single date selection
     * 'range' for a range of dates.
     */
    @Input()
    calType: CalendarType = CalendarTypeEnum.Single;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
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

    /** Whether to pick the date range in month or year or days format
     * Day format will have a month and year including day
     * Month format will have year including month
     * Year format will have just year
     * Values can be 'month' for Month format, 'year' for Year format or nothing for day format
     */
    @Input()
    dateRangeFormat = '';

    /** Event thrown every time active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event thrown every time the selected dates in multiple mode are changed. */
    @Output()
    readonly selectedMultipleDatesChange: EventEmitter<Array<D>> = new EventEmitter<Array<D>>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event thrown every time the first or last date in multiple range mode is changed. */
    @Output()
    readonly selectedMultipleDateRangesChange: EventEmitter<Array<DateRange<D>>> = new EventEmitter<
        Array<DateRange<D>>
    >();

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

    /** The unique ID of the calendar legend, if the calendar is to display a legend. */
    @Input()
    associatedLegendId: string;

    /**
     * @hidden
     * Currently displayed days depending on month and year
     */
    _currentlyDisplayed: CalendarCurrent;

    /** @hidden */
    previousButtonDisabled: boolean;

    /** @hidden */
    nextButtonDisabled: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _adapterStartingDayOfWeek: DaysOfWeek;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        _contentDensityObserver: ContentDensityObserver,
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

    /** That allows to define function that should happen, when focus should normally escape of component */
    @Input()
    escapeFocusFunction: EscapeFocusFunction = (event?: KeyboardEvent): void => {
        event?.preventDefault();
        this._calendarHeaderComponent?.focus();
    };

    /**
     * Function used to disable certain dates in the calendar.
     */
    @Input()
    disableFunction: DisableDateFunction<D> = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     */
    @Input()
    disableRangeStartFunction: DisableDateFunction<D> = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     */
    @Input()
    disableRangeEndFunction: DisableDateFunction<D> = () => false;

    /** @hidden */
    @HostListener('focusout', ['$event'])
    focusOut(event: FocusEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }

    /** @hidden */
    onChange: (_: D | Array<D> | DateRange<D> | Array<DateRange<D>>) => void = () => {};

    /** @hidden */
    onTouched: () => void = () => {};

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
    writeValue(selected: D | Array<D> | DateRange<D> | Array<DateRange<D>>): void {
        let valid = true;

        const isValidDate = (date: D | null): boolean => date != null && this._dateTimeAdapter.isValid(date);
        const isValidRange = (range: DateRange<D>): boolean =>
            range != null && isValidDate(range.start) && isValidDate(range.end);

        if (this.allowMultipleSelection) {
            if (this.calType === CalendarTypeEnum.Single) {
                const dates = Array.isArray(selected) ? (selected as Array<D>) : [selected as D];
                valid = dates.every(isValidDate);
                this.selectedMultipleDates = dates;
            } else if (this.calType === CalendarTypeEnum.Range) {
                const ranges = Array.isArray(selected) ? (selected as Array<DateRange<D>>) : [];
                valid = ranges.every(isValidRange);
                this.selectedMultipleDateRanges = ranges.map((range) => ({
                    start: range?.start || null,
                    end: range?.end || null
                }));
            }
        } else {
            if (this.calType === CalendarTypeEnum.Single) {
                valid = isValidDate(selected as D);
                this.selectedDate = selected as D;
            } else if (this.calType === CalendarTypeEnum.Range) {
                const range = selected as DateRange<D>;
                valid = range && isValidRange(range);
                this.selectedRangeDate = range
                    ? { start: range.start || null, end: range.end || null }
                    : {
                          start: null,
                          end: null
                      };
            }
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

        if (activeView === FdCalendarViewEnum.Month) {
            this.onMonthViewSelected();
        }
        if (activeView === FdCalendarViewEnum.Year) {
            this.onYearViewSelected();
        }
        if (activeView === FdCalendarViewEnum.AggregatedYear) {
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
     * Method that is triggered by events from day view component, when there is selected multi date changed
     */
    selectedMultipleDatesChanged(date: Array<D>): void {
        this.selectedMultipleDates = date;
        this._setNavigationButtonsStates();
        this.onChange(date);
        this.selectedMultipleDatesChange.emit(date);
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

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    selectedMultipleDateRangesChanged(dates: Array<DateRange<D>>): void {
        if (dates) {
            this.selectedMultipleDateRanges = dates;
            this.selectedMultipleDateRangesChange.emit(this.selectedMultipleDateRanges);
            this.onChange(this.selectedMultipleDateRanges);
            this.closeCalendar.emit();
        }
    }

    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    handleNextArrowClick(): void {
        switch (this.activeView) {
            case FdCalendarViewEnum.Day:
                this.displayNextMonth();
                break;
            case FdCalendarViewEnum.Month:
                this.displayNextYear();
                break;
            case FdCalendarViewEnum.Year:
                this.displayNextYearList();
                break;
            case FdCalendarViewEnum.AggregatedYear:
                this.displayNextYearsList();
                break;
        }
        this._setNavigationButtonsStates();
    }

    /** Function that handles previous arrow icon click, depending on current view it changes month, year or list of years */
    handlePreviousArrowClick(): void {
        switch (this.activeView) {
            case FdCalendarViewEnum.Day:
                this.displayPreviousMonth();
                break;
            case FdCalendarViewEnum.Month:
                this.displayPreviousYear();
                break;
            case FdCalendarViewEnum.Year:
                this.displayPreviousYearList();
                break;
            case FdCalendarViewEnum.AggregatedYear:
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
        // if mm/yyyy format date is not enabled then only show days view
        if (!this.isDateRangeMonthFormat()) {
            this.activeView = FdCalendarViewEnum.Day;
            this.onDaysViewSelected();
        }

        this.activeViewChange.emit(this.activeView);
    }

    /** Select year */
    selectedYear(yearSelected: number): void {
        this._currentlyDisplayed.year = yearSelected;

        // if month format date range is enabled then on selecting year show month view else show days view
        // if year format date range is enabled then view remains same on selecting year
        if (this.isDateRangeMonthFormat()) {
            this.activeView = FdCalendarViewEnum.Month;
            this.onMonthViewSelected();
        } else if (this.isDateRangeYearFormat()) {
            this.activeView = FdCalendarViewEnum.Year;
            this.onYearViewSelected();
        } else {
            this.activeView = FdCalendarViewEnum.Day;
            this.onDaysViewSelected();
        }
    }

    /** Select year range */
    selectedYears(yearsSelected: AggregatedYear): void {
        this.activeView = FdCalendarViewEnum.Year;
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
        if (this.allowMultipleSelection) {
            if (this.calType === CalendarTypeEnum.Single) {
                return (
                    this.selectedMultipleDates &&
                    this.selectedMultipleDates.every((d) => this._dateTimeAdapter.isValid(d))
                );
            }
            if (this.calType === CalendarTypeEnum.Range) {
                return (
                    this.selectedMultipleDateRanges &&
                    this.selectedMultipleDateRanges.every((dr) => this._dateTimeAdapter.isValid(dr.start)) &&
                    this.selectedMultipleDateRanges.every((dr) => this._dateTimeAdapter.isValid(dr.end))
                );
            }
        } else {
            if (this.calType === CalendarTypeEnum.Single) {
                return this._dateTimeAdapter.isValid(this.selectedDate);
            }
            if (this.calType === CalendarTypeEnum.Range) {
                return (
                    this.selectedRangeDate &&
                    this._dateTimeAdapter.isValid(this.selectedRangeDate.start) &&
                    this._dateTimeAdapter.isValid(this.selectedRangeDate.end)
                );
            }
        }
        return false;
    }

    /** Whether the date range format is month */
    isDateRangeMonthFormat(): boolean {
        return this.dateRangeFormat === 'month';
    }

    /** Whether the date range format is year */
    isDateRangeYearFormat(): boolean {
        return this.dateRangeFormat === 'year';
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
        const { selectedDate, selectedRangeDate, selectedMultipleDates, selectedMultipleDateRanges } = this;

        if (
            this.calType === CalendarTypeEnum.Single &&
            this._dateTimeAdapter.isValid(selectedDate) &&
            !this.allowMultipleSelection
        ) {
            this._setCurrentlyDisplayed(selectedDate as D);
        } else if (selectedMultipleDates?.length > 0 && this.allowMultipleSelection) {
            this._setCurrentlyDisplayed(selectedMultipleDates[0]);
        } else if (selectedRangeDate?.start && !this.allowMultipleSelection) {
            this._setCurrentlyDisplayed(selectedRangeDate.start);
        } else if (selectedRangeDate?.end && !this.allowMultipleSelection) {
            this._setCurrentlyDisplayed(selectedRangeDate.end);
        } else if (
            selectedMultipleDateRanges?.length > 0 &&
            selectedMultipleDateRanges[0].start &&
            this.allowMultipleSelection
        ) {
            this._setCurrentlyDisplayed(selectedMultipleDateRanges[0].start);
        } else if (
            selectedMultipleDateRanges?.length > 0 &&
            selectedMultipleDateRanges[0].end &&
            this.allowMultipleSelection
        ) {
            this._setCurrentlyDisplayed(selectedMultipleDateRanges[0].end);
        } else {
            const today = this._dateTimeAdapter.today();
            this._setCurrentlyDisplayed(today);
        }
    }

    /** @hidden */
    private _setCurrentlyDisplayed(date: D): void {
        this._currentlyDisplayed = {
            year: this._dateTimeAdapter.getYear(date),
            month: this._dateTimeAdapter.getMonth(date)
        };
    }

    /** @hidden */
    private _getActiveFocusableView(): FocusableCalendarView | null {
        switch (this.activeView) {
            case FdCalendarViewEnum.Day:
                return this._dayViewComponent;
            case FdCalendarViewEnum.Month:
                return this._monthViewComponent;
            case FdCalendarViewEnum.Year:
                return this._yearViewComponent;
            case FdCalendarViewEnum.AggregatedYear:
                return this._aggregatedYearViewComponent;
            default:
                return null;
        }
    }

    /** @hidden */
    private _setNavigationButtonsStates(): void {
        this.previousButtonDisabled = this._isNavigationButtonDisabled(this.previousButtonDisableFunction);
        this.nextButtonDisabled = this._isNavigationButtonDisabled(this.nextButtonDisableFunction);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _isNavigationButtonDisabled(disableFunction?: NavigationButtonDisableFunction<D>): boolean {
        return (
            typeof disableFunction === 'function' &&
            disableFunction(this.selectedDate, this._currentlyDisplayed, this.activeView)
        );
    }
}
