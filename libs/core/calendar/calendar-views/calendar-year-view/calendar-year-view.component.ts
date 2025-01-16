import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { DATE_TIME_FORMATS, DateTimeFormats, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarService } from '../../calendar.service';
import { CalendarYear, CalendarYearGrid } from '../../models/calendar-year-grid';
import { DefaultCalendarActiveCellStrategy, EscapeFocusFunction, FocusableCalendarView } from '../../models/common';
import { DateRange } from '../../models/date-range';

/** Component representing the YearView of the Calendar Component. */
@Component({
    selector: 'fd-calendar-year-view',
    templateUrl: './calendar-year-view.component.html',
    styleUrl: './calendar-year-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'viewId'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class CalendarYearViewComponent<D> implements OnInit, OnChanges, FocusableCalendarView {
    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: EscapeFocusFunction;

    /** Parameter holding the year that is currently selected. */
    @Input()
    yearSelected: number;

    /**
     * Object to customize year grid
     */
    @Input()
    yearViewGrid: CalendarYearGrid;

    /** Whether the date range is year format only excluding month and day */
    @Input()
    isDateRangeYearFormat: boolean;

    /**
     * Whether user wants to mark year cells on hover.
     * Works only on range mode, when start year is selected.
     */
    @Input()
    rangeHoverEffect = false;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearClicked: EventEmitter<number> = new EventEmitter<number>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /**
     * @hidden
     * This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    _activeYear: number;

    /**
     * @hidden
     * Parameter that stores the dozen of years that are currently being displayed.
     */
    _calendarYearListGrid: CalendarYear<D>[][];

    /**
     * @hidden
     * Parameter storing the year of the present day.
     */
    _currentYear: number;

    /**
     * @hidden
     * Parameter storing first shown year on list
     */
    _firstYearInList: number;

    /** View ID */
    get viewId(): string {
        return this.id + '-year-view';
    }

    /**
     * @hidden
     * Today cell label ID
     */
    get _todayLabelId(): string {
        return this.viewId + '-today-label';
    }

    /**
     * @hidden
     * Selected date label ID
     */
    get _selectedDateLabelId(): string {
        return this.viewId + '-selected-date-label';
    }

    /**
     * @hidden
     */
    private readonly _destroyRef = inject(DestroyRef);
    /** @hidden */
    private _initiated = false;

    /** @hidden */
    private _selectedRangeDate: DateRange<D>;

    /** @hidden */
    private _isOnRangePick = false;

    /** @hidden */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        // default values
        this._currentYear = _dateTimeAdapter.getYear(_dateTimeAdapter.today());
        this._firstYearInList = this._currentYear;
    }

    /** @hidden */
    ngOnInit(): void {
        this._initiated = true;

        this._setupKeyboardService();
        this._firstYearInList = this.yearSelected;
        this._constructYearGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._constructYearGrid();
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._initiated && ('yearViewGrid' in changes || 'yearSelected' in changes || 'id' in changes)) {
            this._constructYearGrid();
        }
    }

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    set selectedRangeDate(dateRange: DateRange<D>) {
        if (
            dateRange &&
            this.selectedRangeDate &&
            this._isSameDate(dateRange.start, this.selectedRangeDate.start) &&
            this._isSameDate(dateRange.end, this.selectedRangeDate.end)
        ) {
            return;
        }
        this._selectedRangeDate = dateRange;
        if (this._calendarYearListGrid) {
            this._changeSelectedRangeYears(dateRange, this._getYearList());
        }
    }

    get selectedRangeDate(): DateRange<D> {
        return this._selectedRangeDate;
    }

    /**
     * @hidden
     *  Amount of selected years
     *  0, when there is no year selected, or start year is invalid,
     *  1, when there is only valid start year, or end year is same as start year,
     *  2, when both dates are valid
     */
    get _selectCounter(): number {
        if (!this.selectedRangeDate || !this._dateTimeAdapter.isValid(this.selectedRangeDate.start)) {
            return 0;
        }
        if (
            this.selectedRangeDate.start &&
            (!this._dateTimeAdapter.isValid(this.selectedRangeDate.end) ||
                this._isSameDate(this.selectedRangeDate.start, this.selectedRangeDate.end))
        ) {
            return 1;
        }
        if (
            this._dateTimeAdapter.isValid(this.selectedRangeDate.start) &&
            this._dateTimeAdapter.isValid(this.selectedRangeDate.end)
        ) {
            return 2;
        }
        return 0;
    }

    /** Method used to load the previous {{col * row}} years to be displayed. */
    loadNextYearList(): void {
        this._firstYearInList += this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method used to load the next {{col * row}} years to be displayed. */
    loadPreviousYearList(): void {
        this._firstYearInList -= this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: CalendarYear<D>, event?: MouseEvent | KeyboardEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear.year;
        this.yearClicked.emit(this.yearSelected);

        if (this.isDateRangeYearFormat) {
            this._selectRangeDate(selectedYear);
            this._handleRangeHoverEffect(event);
        }
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
    setFocusOnCell(): void {
        const cellToFocus = new DefaultCalendarActiveCellStrategy().getActiveCell(this._getYearList());
        if (!cellToFocus?.id) {
            return;
        }
        this._focusElementBySelector(`#${cellToFocus.id}`);
    }

    /**
     * @hidden
     * Method for handling the keyboard navigation.
     */
    _onKeydownYearHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /**
     * @hidden
     * Method that allows to focus elements inside this component
     */
    _focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * @hidden
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    _getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /**
     * @hidden
     * Get grid cell id be index
     * @param index
     */
    _getId(index: number): string {
        return this.viewId + '-year-' + index;
    }

    /**
     * @hidden
     * Handles hover effect for range selection mode.
     * @param year The calendar year that is hovered.
     */
    _handleRangeHover(year: CalendarYear<D>): void {
        // Handle range hover
        const start = this.selectedRangeDate?.start;
        if (this._isOnRangePick && start) {
            if (this._dateTimeAdapter.compareDate(year.date, start) < 0) {
                this._getYearList().forEach((_year) => {
                    _year.hoverRange =
                        this._dateTimeAdapter.compareDate(_year.date, year.date) > 0 &&
                        this._dateTimeAdapter.compareDate(_year.date, start) < 0;
                });
            } else {
                this._getYearList().forEach((_year) => {
                    _year.hoverRange =
                        this._dateTimeAdapter.compareDate(_year.date, year.date) < 0 &&
                        this._dateTimeAdapter.compareDate(_year.date, start) > 0;
                });
            }
        }
    }

    /**
     * @hidden
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): number {
        const selectedYearCell = this._getYearList().find(({ year }) => year === this.yearSelected);
        if (selectedYearCell) {
            return selectedYearCell.year;
        }

        const currentYearCell = this._getYearList().find(({ year }) => year === this._currentYear);
        if (currentYearCell) {
            return currentYearCell.year;
        }

        return this._calendarYearListGrid[0][0].year;
    }

    /** @hidden */
    private _constructYearGrid(): void {
        const displayedYearsAmount: number = this.yearViewGrid.cols * this.yearViewGrid.rows;
        const calendarYearList: CalendarYear<D>[] = [];
        this._calendarYearListGrid = [];

        for (let x = 0; x < displayedYearsAmount; ++x) {
            const year = this._firstYearInList + x;
            calendarYearList.push({
                date: this._dateTimeAdapter.createDate(year),
                year,
                label: this._getYearName(year),
                ariaLabel: this._getAriaYearName(year),
                selected: year === this.yearSelected,
                current: year === this._currentYear,
                index: x
            });
        }

        // if the date range is selected
        if (this.isDateRangeYearFormat) {
            this._changeSelectedRangeYears(this._selectedRangeDate, calendarYearList);
        }

        /** Creating 2d grid */
        while (calendarYearList.length) {
            this._calendarYearListGrid.push(calendarYearList.splice(0, this.yearViewGrid.cols));
        }

        this._activeYear = this._getActiveYear();

        this._calendarYearListGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cell.id = this._getId(this._getIndex(rowIndex, colIndex));
                cell.tabIndex = cell.year === this._activeYear ? 0 : -1;
            });
        });

        this._changeDetectorRef.markForCheck();
    }

    /**
     * @hidden
     * Handles the hover effect for range selection.
     * Toggles the hover effect based on the selection state and event.
     * @param event Optional mouse event for handling hover effect.
     */
    private _handleRangeHoverEffect(event?: MouseEvent | KeyboardEvent): void {
        if (this.isDateRangeYearFormat && this.rangeHoverEffect && this._selectCounter === 1 && event) {
            this._isOnRangePick = !this._isOnRangePick;
        } else {
            this._isOnRangePick = false;
        }
    }

    /**
     * @hidden
     * Change properties of range years, this method is called, to not rebuild whole grid from scratch,
     * it just changes properties of newly selected/unselected years.
     */
    private _changeSelectedRangeYears(dates: DateRange<D>, calendar: CalendarYear<D>[]): void {
        /** Pull list of calendar year */
        const calendarList = calendar;

        /** Reset changing properties */
        calendarList.forEach(
            (_year) =>
                (_year.selectedFirst =
                    _year.selectedLast =
                    _year.selected =
                    _year.disabled =
                    _year.hoverRange =
                    _year.selectedRange =
                        false)
        );

        if (dates) {
            let startYear: CalendarYear<D> | undefined;
            let endYear: CalendarYear<D> | undefined;
            if (dates.start) {
                /** Find start year and mark it as selected */
                startYear = calendarList.find((_year) => this._isSameDate(_year.date, dates.start));
                if (startYear) {
                    startYear.selected = true;
                    startYear.selectedFirst = true;
                }
            }
            if (dates.end) {
                /** Find end year and mark it as selected */
                endYear = calendarList.find((_year) => this._isSameDate(_year.date, dates.end));
                if (endYear) {
                    endYear.selected = true;
                    endYear.selectedLast = true;
                }
            }

            /** Verify if start year and end year is valid, otherwise don't put range selection */
            if (dates.start && dates.end) {
                /** Mark all years, which are between start and end date */
                calendarList
                    .filter(
                        (_year) =>
                            (_year.selectedRange = this._dateTimeAdapter.isBetween(
                                _year.date,
                                dates.start!,
                                dates.end!
                            ))
                    )
                    .forEach((_year) => (_year.selectedRange = true));
            }
        }
    }

    /**
     * @hidden
     * Check if dates are equal
     */
    private _isSameDate(date1: Nullable<D>, date2: Nullable<D>): boolean {
        return this._dateTimeAdapter.datesEqual(date1, date2);
    }

    /**
     * @hidden
     * Selects or updates the range of years in range mode.
     * Handles the start and end years and updates the selected range.
     * @param year The calendar year to be selected or updated in the range.
     */
    private _selectRangeDate(year: CalendarYear<D>): void {
        if (this._selectCounter === 0 || this._selectCounter === 2) {
            this._selectedRangeDate = { start: year.date, end: null };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        } else if (this._selectCounter === 1) {
            this._selectedRangeDate = this._getOrderedRange(this.selectedRangeDate.start!, year.date);
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        }
        this._changeSelectedRangeYears(this._selectedRangeDate, this._getYearList());
    }

    /**
     * @hidden
     * Orders the start and end dates for the range selection.
     * Ensures the start date is before or equal to the end date.
     * @param date1 The first date.
     * @param date2 The second date.
     * @returns An object containing the ordered start and end dates.
     */
    private _getOrderedRange(date1: D, date2: D): { start: D; end: D } {
        return this._dateTimeAdapter.compareDate(date1, date2) < 0
            ? { start: date1, end: date2 }
            : { start: date2, end: date1 };
    }

    /**
     * @hidden
     * Returns year name as a string.
     */
    private _getYearName(year: number): string {
        const formatted = this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
        return this._getYearString(year, formatted);
    }

    /**
     * @hidden
     * Returns aria year name as a string.
     */
    private _getAriaYearName(year: number): string {
        const formatted = this._dateTimeAdapter.format(
            this._dateTimeAdapter.createDate(year, 1, 1),
            this._dateTimeFormats.display.yearA11yLabel
        );
        return this._getYearString(year, formatted);
    }

    /**
     * @hidden
     * Returns year name taking into account yearMapping.
     */
    private _getYearString(year: number, defaultStr: string): string {
        if (typeof this.yearViewGrid.yearMapping === 'function') {
            return this.yearViewGrid.yearMapping(year);
        }
        return defaultStr;
    }

    /**
     * @hidden
     * Returns transformed 1d array from 2d year grid.
     */
    private _getYearList(): CalendarYear<D>[] {
        return (<CalendarYear<D>[]>[]).concat(...this._calendarYearListGrid);
    }

    /**
     * @hidden
     * Amount of years displayed in year view
     */
    private _getAmountOfYearsShownAtOnce(): number {
        return this.yearViewGrid.rows * this.yearViewGrid.cols;
    }

    /**
     * @hidden
     * Method to put configuration and listeners on calendar keyboard service
     */
    private _setupKeyboardService(): void {
        this._calendarService.colAmount = this.yearViewGrid.cols;
        this._calendarService.rowAmount = this.yearViewGrid.rows;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._handleRangeHover(this._getYearList()[index]);
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onKeySelect.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(({ index, event }) => {
            this.selectYear(this._getYearList()[index], event);
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onListStartApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this.loadPreviousYearList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onListEndApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this.loadNextYearList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });
    }

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this._focusElementBySelector(`#${this._getId(index)}`);
    }
}
