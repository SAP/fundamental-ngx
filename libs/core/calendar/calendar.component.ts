import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    input,
    model,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    output,
    SimpleChanges,
    viewChild,
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
import { CalendarType, CalendarTypeEnum, DaysOfWeek, FdCalendarView, NavigationButtonDisableFunction } from './types';

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
        '(focusout)': '_focusOut($event)',
        '[attr.id]': 'id',
        class: 'fd-calendar fd-has-display-block'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
    selectedDate = model<Nullable<D>>();

    /** The currently selected date model in multiple mode. */
    selectedMultiDate = model<Array<D>>();

    /** The currently selected FdDates model start and end in range mode. */
    selectedRangeDate = model<DateRange<D>>();

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    markWeekends = input(true);

    /**
     * Whether user wants to show week numbers next to days
     */
    showWeekNumbers = input(false);

    /**
     * Whether user wants to select multiple days
     * If showWeekNumbers is true user can click on week number, and it will mark related row
     * User can click weekDays, and it will mark related column
     */
    multiSelectable = input(false);

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    mobileLandscape = input(false);

    /** Whether calendar is used inside mobile in portrait mode */
    mobilePortrait = input(false);

    /** Actually shown active view one of 'day' | 'month' | 'year' */
    activeView = model<FdCalendarView>('day');

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    startingDayOfWeek = input<DaysOfWeek>();

    /**
     * The type of calendar
     * 'single' for single date selection
     * 'multi' for multiple date selection
     * 'range' for a range of dates.
     */
    calType = model<CalendarType>('single');

    /** Id of the calendar. If none is provided, one will be generated. */
    id = input('fd-calendar-' + calendarUniqueId++);

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with D object as a parameter. ex:
     * `rule: (fdDate: D) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /**
     * Object to customize year grid,
     * Row, Columns and method to display year can be modified
     */
    yearGrid = input<CalendarYearGrid>({
        rows: 4,
        cols: 5
    });

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    aggregatedYearGrid = input<CalendarYearGrid>({
        rows: 4,
        cols: 3
    });

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    rangeHoverEffect = input(false);

    /** That allows to define function that should happen, when focus should normally escape of component */
    escapeFocusFunction = input<EscapeFocusFunction>((event?: KeyboardEvent): void => {
        event?.preventDefault();
        this._calendarHeaderComponent()?.focus();
    });

    /**
     * Function used to disable certain dates in the calendar.
     * @param date date
     */
    disableFunction = input<DisableDateFunction<D>>(() => false);

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param date date
     */
    disableRangeStartFunction = input<DisableDateFunction<D>>(() => false);

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param date date
     */
    disableRangeEndFunction = input<DisableDateFunction<D>>(() => false);

    /** Event thrown every time active view is changed */
    readonly activeViewChange = output<FdCalendarView>();

    /** Event thrown every time selected date in single mode is changed */
    readonly selectedDateChange = output<D>();

    /** Event thrown every time selected date in single mode is changed */
    readonly selectedMultiDateChange = output<Array<D>>();

    /** Event thrown every time selected first or last date in range mode is changed */
    readonly selectedRangeDateChange = output<DateRange<D>>();

    /** Event thrown every time when value is overwritten from outside and throw back isValid */
    readonly isValidDateChange = output<boolean>();

    /** Event thrown every time when calendar should be closed */
    readonly closeCalendar = output<void>();

    /** Event thrown, when close button is clicked */
    readonly closeClicked = output<void>();

    /** @hidden */
    _dayViewComponent = viewChild<CalendarDayViewComponent<D>>(CalendarDayViewComponent);

    /** @hidden */
    _monthViewComponent = viewChild<CalendarMonthViewComponent<D>>(CalendarMonthViewComponent);

    /** @hidden */
    _yearViewComponent = viewChild<CalendarYearViewComponent<D>>(CalendarYearViewComponent);

    /** @hidden */
    _aggregatedYearViewComponent = viewChild<CalendarAggregatedYearViewComponent<D>>(
        CalendarAggregatedYearViewComponent
    );

    /** @hidden */
    _calendarHeaderComponent = viewChild<CalendarHeaderComponent<D>>(CalendarHeaderComponent);

    /**
     * Function used to disable previous button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     */
    previousButtonDisableFunction = input<NavigationButtonDisableFunction<D>>();

    /**
     * Function used to disable next button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     */
    nextButtonDisableFunction = input<NavigationButtonDisableFunction<D>>();

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
        this.selectedDate.set(this._dateTimeAdapter.today());
        this._changeDetectorRef.markForCheck();
        this._listenToLocaleChanges();
    }

    /** @hidden */
    onChange: (_: D | Array<D> | DateRange<D>) => void = () => {};

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
        const startingDayOfWeek = this.startingDayOfWeek();
        return startingDayOfWeek === undefined ? this._adapterStartingDayOfWeek : startingDayOfWeek;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    writeValue(selected: D | Array<D> | DateRange<D>): void {
        let valid = true;

        if (this.calType() === CalendarTypeEnum.Single) {
            selected = <D>selected;

            valid = this._dateTimeAdapter.isValid(selected);

            this.selectedDate.set(selected);
        }

        if (this.calType() === CalendarTypeEnum.Multi && selected) {
            if (!Array.isArray(selected)) {
                selected = <Array<D>>[selected];
            }

            selected = <Array<D>>selected;

            valid = selected.every((d) => this._dateTimeAdapter.isValid(d));

            this.selectedMultiDate.set(selected);
        }

        if (this.calType() === CalendarTypeEnum.Range && selected) {
            selected = <DateRange<D>>selected;

            if (!this._dateTimeAdapter.isValid(selected.start) || !this._dateTimeAdapter.isValid(selected.end)) {
                valid = false;
            }

            this.selectedRangeDate.set({
                start: selected.start,
                end: selected.end
            });
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
    handleActiveViewChange(activeView: Nullable<FdCalendarView>): void {
        if (activeView) {
            if (activeView === this.activeView()) {
                return;
            }

            this.activeView.set(activeView);

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
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    selectedDateChanged(date: D): void {
        this.selectedDate.set(date);
        this._setNavigationButtonsStates();
        this.onChange(date);
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected multi date changed
     */
    selectedMultiDateChanged(date: Array<D>): void {
        this.selectedMultiDate.set(date);
        this._setNavigationButtonsStates();
        this.onChange(date);
        this.selectedMultiDateChange.emit(date);
        this.closeCalendar.emit();
    }

    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    selectedRangeDateChanged(dates: DateRange<D>): void {
        if (dates) {
            this.selectedRangeDate.set({ start: dates.start, end: dates.end });
            const selectedRangeDate = this.selectedRangeDate();
            if (selectedRangeDate) {
                this.selectedRangeDateChange.emit(selectedRangeDate);
                this.onChange(selectedRangeDate);
                this.closeCalendar.emit();
            }
        }
    }

    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    handleNextArrowClick(): void {
        switch (this.activeView()) {
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
        switch (this.activeView()) {
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
        const yearViewComponent = this._yearViewComponent();
        if (yearViewComponent) {
            yearViewComponent.loadNextYearList();
            this._currentlyDisplayed = {
                month: this._currentlyDisplayed.month,
                year: yearViewComponent._firstYearInList
            };
        }
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearList(): void {
        const yearViewComponent = this._yearViewComponent();
        if (yearViewComponent) {
            yearViewComponent.loadPreviousYearList();
            this._currentlyDisplayed = {
                month: this._currentlyDisplayed.month,
                year: yearViewComponent._firstYearInList
            };
        }
    }

    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearsList(): void {
        const aggregatedYearViewComponent = this._aggregatedYearViewComponent();
        if (aggregatedYearViewComponent) {
            aggregatedYearViewComponent.loadNextYearsList();
        }
    }

    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearsList(): void {
        const aggregatedYearViewComponent = this._aggregatedYearViewComponent();
        if (aggregatedYearViewComponent) {
            aggregatedYearViewComponent.loadPreviousYearsList();
        }
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
        this.activeView.set('day');
        this.onDaysViewSelected();
        this.activeViewChange.emit(this.activeView());
    }

    /** Select year */
    selectedYear(yearSelected: number): void {
        this.activeView.set('day');
        this._currentlyDisplayed.year = yearSelected;
        this.onDaysViewSelected();
    }

    /** Select year range */
    selectedYears(yearsSelected: AggregatedYear): void {
        this.activeView.set('year');
        this._currentlyDisplayed = {
            ...this._currentlyDisplayed,
            year: yearsSelected.startYear
        };
        this.onYearViewSelected();
    }

    /** @hidden */
    onDaysViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        const dayViewComponent = this._dayViewComponent();
        if (dayViewComponent) {
            dayViewComponent.setFocusOnCell();
        }
    }

    /** @hidden */
    onMonthViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        const monthViewComponent = this._monthViewComponent();
        if (monthViewComponent) {
            monthViewComponent.setFocusOnCell();
        }
    }

    /** @hidden */
    onYearViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        const yearViewComponent = this._yearViewComponent();
        if (yearViewComponent) {
            yearViewComponent.setFocusOnCell();
        }
    }

    /** @hidden */
    onYearsRangeViewSelected(): void {
        this._changeDetectorRef.detectChanges();
        const aggregatedYearViewComponent = this._aggregatedYearViewComponent();
        if (aggregatedYearViewComponent) {
            aggregatedYearViewComponent.setFocusOnCell();
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean {
        if (this.calType() === CalendarTypeEnum.Single) {
            return this._dateTimeAdapter.isValid(this.selectedDate());
        }
        if (this.calType() === CalendarTypeEnum.Range) {
            const selectedRangeDate = this.selectedRangeDate();
            if (selectedRangeDate) {
                return (
                    this._dateTimeAdapter.isValid(selectedRangeDate.start) &&
                    this._dateTimeAdapter.isValid(selectedRangeDate.end)
                );
            }
        }
        const selectedMultiDate = this.selectedMultiDate();
        if (this.calType() === CalendarTypeEnum.Multi && selectedMultiDate) {
            return selectedMultiDate && selectedMultiDate.every((d) => this._dateTimeAdapter.isValid(d));
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
        const selectedDate = this.selectedDate();
        const selectedMultiDate = this.selectedMultiDate();
        const selectedRangeDate = this.selectedRangeDate();

        if (this.calType() === CalendarTypeEnum.Single && this._dateTimeAdapter.isValid(selectedDate)) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(selectedDate),
                month: this._dateTimeAdapter.getMonth(selectedDate)
            };
        } else if (selectedMultiDate && selectedMultiDate.length > 0) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(selectedMultiDate[0]),
                month: this._dateTimeAdapter.getMonth(selectedMultiDate[0])
            };
        } else if (selectedRangeDate && selectedRangeDate.start) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(selectedRangeDate.start),
                month: this._dateTimeAdapter.getMonth(selectedRangeDate.start)
            };
        } else if (selectedRangeDate && selectedRangeDate.end) {
            this._currentlyDisplayed = {
                year: this._dateTimeAdapter.getYear(selectedRangeDate.end),
                month: this._dateTimeAdapter.getMonth(selectedRangeDate.end)
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
    private _getActiveFocusableView(): Nullable<FocusableCalendarView> {
        switch (this.activeView()) {
            case 'day':
                return this._dayViewComponent();
            case 'month':
                return this._monthViewComponent();
            case 'year':
                return this._yearViewComponent();
            case 'aggregatedYear':
                return this._aggregatedYearViewComponent();
            default:
                return null;
        }
    }

    /** @hidden */
    private _setNavigationButtonsStates(): void {
        const previousButtonDisableFunction = this.previousButtonDisableFunction();
        if (previousButtonDisableFunction) {
            this.previousButtonDisabled = previousButtonDisableFunction(
                this.selectedDate(),
                this._currentlyDisplayed,
                this.activeView()
            );
        }
        const nextButtonDisableFunction = this.nextButtonDisableFunction();
        if (nextButtonDisableFunction) {
            this.nextButtonDisabled = nextButtonDisableFunction(
                this.selectedDate(),
                this._currentlyDisplayed,
                this.activeView()
            );
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _focusOut(event: FocusEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }
}
