import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    inject,
    input,
    model,
    output
} from '@angular/core';

import { DATE_TIME_FORMATS, DateTimeFormats, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarService } from '../../calendar.service';
import { AggregatedYear, CalendarAggregatedYear } from '../../models/aggregated-year';
import { CalendarYearGrid } from '../../models/calendar-year-grid';
import { DefaultCalendarActiveCellStrategy, EscapeFocusFunction, FocusableCalendarView } from '../../models/common';

@Component({
    selector: 'fd-calendar-aggregated-year-view',
    templateUrl: './calendar-aggregated-year-view.component.html',
    styleUrl: './calendar-aggregated-year-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.id]': 'viewId'
    },
    standalone: true,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class CalendarAggregatedYearViewComponent<D> implements OnInit, OnChanges, FocusableCalendarView {
    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    id = input<string>();

    /** Function that is called when the focus would escape the element. */
    focusEscapeFunction = input<EscapeFocusFunction>();

    /** Parameter holding the year that is currently selected. */
    yearSelected = model<number>();

    /**
     * Object to customize aggregated year grid
     */
    aggregatedYearsViewGrid = model<CalendarYearGrid>();

    /**
     * Object to customize year grid
     */
    yearViewGrid = model<CalendarYearGrid>();

    /** Event fired when a year is selected. */
    readonly yearsClicked = output<AggregatedYear>();

    /**
     * View ID
     */
    get viewId(): string {
        return this.id() + '-years-range-view';
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
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    _activeYear: AggregatedYear;

    /**
     * @hidden
     *  Parameter that stores the dozen of years that are currently being displayed.
     */
    _calendarYearListGrid: CalendarAggregatedYear[][];

    /**
     * @hidden
     * Current period of years selected
     */
    _yearsSelected: AggregatedYear | null;

    /**
     * @hidden
     * Parameter storing the year of the present day.
     */
    _currentYear: number;

    /**
     * @hidden
     * Parameter storing first shown year on list
     */
    private _firstYearInList: number;

    /**
     * @hidden
     */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _initiated = false;

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
    }

    /** @hidden */
    ngOnInit(): void {
        this._initiated = true;

        this._setupKeyboardService();

        const yearSelected = this.yearSelected();
        if (yearSelected) {
            this._firstYearInList = yearSelected - this._yearsInOnePeriod();
        }

        this._constructYearsGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._constructYearsGrid();
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            this._initiated &&
            ('yearSelected' in changes ||
                'aggregatedYearsViewGrid' in changes ||
                'yearViewGrid' in changes ||
                'id' in changes)
        ) {
            this._constructYearsGrid();
        }
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: CalendarAggregatedYear, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this._yearsSelected = selectedYear.years;
        this.yearsClicked.emit(this._yearsSelected);
    }

    /** Method used to load the previous 12 years to be displayed. */
    loadNextYearsList(): void {
        const periodsAmount = this._periodsAmount();
        if (periodsAmount) {
            this._firstYearInList += periodsAmount * this._yearsInOnePeriod();
            this._constructYearsGrid();
        }
    }

    /** Method used to load the next 12 years to be displayed. */
    loadPreviousYearsList(): void {
        const periodsAmount = this._periodsAmount();
        if (periodsAmount) {
            this._firstYearInList -= periodsAmount * this._yearsInOnePeriod();
            this._constructYearsGrid();
        }
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
    setFocusOnCell(): void {
        const cellToFocus = new DefaultCalendarActiveCellStrategy().getActiveCell(this._getYearsList());
        if (!cellToFocus?.id) {
            return;
        }
        this._focusElementBySelector(`#${cellToFocus.id}`);
    }

    /** Method for handling the keyboard navigation. */
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
     * Method returning index of aggregated year index cell
     */
    _getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /**
     * @hidden
     * Get id of calendar's aggregated year item
     */
    _getId(index: number): string {
        return this.viewId + '-aggregated-years-' + index;
    }

    /**
     * @hidden
     * Check if specified year is between start year and end year)
     */
    _isBetween(aggregatedYear: AggregatedYear, yearToCheck: number): boolean {
        return aggregatedYear.endYear >= yearToCheck && aggregatedYear.startYear <= yearToCheck;
    }

    /** @hidden */
    private _constructYearsGrid(): void {
        const aggregatedYearsViewGrid = this.aggregatedYearsViewGrid();
        if (aggregatedYearsViewGrid) {
            const displayedYearsAmount: number = aggregatedYearsViewGrid.cols * aggregatedYearsViewGrid.rows;
            const calendarYearList: CalendarAggregatedYear[] = [];
            this._calendarYearListGrid = [];

            for (let index = 0; index < displayedYearsAmount; ++index) {
                /**
                 * Generates object with certain period of years,
                 * which depends on amount of years displayed in year view
                 */

                const years: AggregatedYear = {
                    startYear: this._firstYearInList + this._yearsInOnePeriod() * index,
                    endYear: this._firstYearInList + this._yearsInOnePeriod() * (index + 1) - 1
                };

                calendarYearList.push({
                    years,
                    label: this._getYearsName(years),
                    ariaLabel: this._getAriaYearsName(years),
                    selected: this._isBetween(years, this.yearSelected()!),
                    current: this._isBetween(years, this._currentYear),
                    index
                });
            }

            /** Creating 2d grid */
            while (calendarYearList.length) {
                this._calendarYearListGrid.push(calendarYearList.splice(0, aggregatedYearsViewGrid.cols));
            }

            const yearSelected = this.yearSelected();
            if (yearSelected) {
                const yearsCellSelected = calendarYearList.find((cell) =>
                    this._isBetween(cell.years, this.yearSelected()!)
                );
                this._yearsSelected = yearsCellSelected ? yearsCellSelected.years : null;
            }
            this._activeYear = this._getActiveYear();

            this._calendarYearListGrid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    cell.id = this._getId(this._getIndex(rowIndex, colIndex));
                    cell.tabIndex = cell.years === this._activeYear ? 0 : -1;
                });
            });
        }

        this._changeDetectorRef.detectChanges();
    }

    /**
     * @hidden
     * Returns year name as a string.
     */
    private _getYearsName(years: AggregatedYear): string {
        const startYearFormatted = this._dateTimeAdapter.getYearName(
            this._dateTimeAdapter.createDate(years.startYear, 1, 1)
        );
        const endYearFormatted = this._dateTimeAdapter.getYearName(
            this._dateTimeAdapter.createDate(years.endYear, 1, 1)
        );
        return `${this._getYearString(years.startYear, startYearFormatted)} - ${this._getYearString(
            years.endYear,
            endYearFormatted
        )}`;
    }

    /**
     * @hidden
     * Returns aria year name as a string.
     */
    private _getAriaYearsName(years: AggregatedYear): string {
        const startYearFormatted = this._dateTimeAdapter.format(
            this._dateTimeAdapter.createDate(years.startYear, 1, 1),
            this._dateTimeFormats.display.yearA11yLabel
        );
        const endYearFormatted = this._dateTimeAdapter.format(
            this._dateTimeAdapter.createDate(years.endYear, 1, 1),
            this._dateTimeFormats.display.yearA11yLabel
        );
        return `${this._getYearString(years.startYear, startYearFormatted)} - ${this._getYearString(
            years.endYear,
            endYearFormatted
        )}`;
    }

    /**
     * @hidden
     * Returns year name taking into account yearMapping.
     */
    private _getYearString(year: number, defaultStr: string): string {
        const aggregatedYearsViewGrid = this.aggregatedYearsViewGrid();
        if (aggregatedYearsViewGrid && typeof aggregatedYearsViewGrid.yearMapping === 'function') {
            return aggregatedYearsViewGrid.yearMapping(year);
        }
        return defaultStr;
    }

    /**
     * @hidden
     * Amount of years displayed in year view
     */
    private _yearsInOnePeriod(): number {
        if (this.yearViewGrid()) {
            return this.yearViewGrid()!.cols * this.yearViewGrid()!.rows;
        } else {
            return 12;
        }
    }

    /**
     * @hidden
     * Amount of years displayed in aggregated year view
     */
    private _periodsAmount(): Nullable<number> {
        const aggregatedYearsViewGrid = this.aggregatedYearsViewGrid();
        if (aggregatedYearsViewGrid) {
            return aggregatedYearsViewGrid.cols * aggregatedYearsViewGrid.rows;
        }
    }

    /**
     * @hidden
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): AggregatedYear {
        const selectedYearCell = this._getYearsList().find(({ years }) => this._isBetween(years, this.yearSelected()!));
        if (selectedYearCell) {
            return selectedYearCell.years;
        }

        const currentYearCell = this._getYearsList().find(({ years }) => this._isBetween(years, this._currentYear));
        if (currentYearCell) {
            return currentYearCell.years;
        }

        return this._calendarYearListGrid[0][0].years;
    }

    /**
     * @hidden
     * Returns transformed 1d array from 2d year grid.
     */
    private _getYearsList(): CalendarAggregatedYear[] {
        return (<CalendarAggregatedYear[]>[]).concat(...this._calendarYearListGrid);
    }

    /**
     * @hidden
     * Method to put configuration and listeners on calendar keyboard service
     */
    private _setupKeyboardService(): void {
        const aggregatedYearsViewGrid = this.aggregatedYearsViewGrid();
        if (aggregatedYearsViewGrid) {
            this._calendarService.rowAmount = aggregatedYearsViewGrid.rows;
            this._calendarService.colAmount = aggregatedYearsViewGrid.cols;
        }

        this._calendarService.focusEscapeFunction = this.focusEscapeFunction();

        this._calendarService.onFocusIdChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onKeySelect
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((index) => this.selectYear(this._getYearsList()[index]));

        this._calendarService.onListStartApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this.loadPreviousYearsList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onListEndApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this.loadNextYearsList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });
    }

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this._focusElementBySelector(`#${this._getId(index)}`);
    }
}
