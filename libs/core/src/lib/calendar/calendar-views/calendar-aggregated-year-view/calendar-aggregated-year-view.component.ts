import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DateTimeFormats, DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { CalendarService } from '../../calendar.service';
import { AggregatedYear, CalendarAggregatedYear } from '../../models/aggregated-year';
import { CalendarYearGrid } from '../../models/calendar-year-grid';
import { DefaultActiveCalendarCellStrategy } from '../../models/common';

@Component({
    selector: 'fd-calendar-aggregated-year-view',
    templateUrl: './calendar-aggregated-year-view.component.html',
    styleUrls: ['./calendar-aggregated-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarAggregatedYearViewComponent<D> implements OnInit, OnDestroy, OnChanges {
    /** @hidden
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    activeYear: AggregatedYear;

    /**
     *  Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearListGrid: CalendarAggregatedYear[][];

    /**
     * @hidden
     * Current period of years selected
     */
    yearsSelected: AggregatedYear;

    /** Parameter storing the year of the present day. */
    currentYear: number;

    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: (event: KeyboardEvent) => void;

    /** Parameter holding the year that is currently selected. */
    @Input()
    yearSelected: number;

    /**
     * Object to customize aggregated year grid
     */
    @Input()
    aggregatedYearsViewGrid: CalendarYearGrid;

    /**
     * Object to customize year grid
     */
    @Input()
    yearViewGrid: CalendarYearGrid;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearsClicked: EventEmitter<AggregatedYear> = new EventEmitter<AggregatedYear>();

    /** Parameter storing first shown year on list */
    private _firstYearInList: number;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

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
        this.currentYear = _dateTimeAdapter.getYear(_dateTimeAdapter.today());
    }

    /** @hidden */
    ngOnInit(): void {
        this._initiated = true;

        this._setupKeyboardService();

        this._firstYearInList = this.yearSelected - this._yearsInOnePeriod();

        this._constructYearsGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
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

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: CalendarAggregatedYear, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.yearsSelected = selectedYear.years;
        this.yearsClicked.emit(this.yearsSelected);
    }

    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /** Method used to load the previous 12 years to be displayed. */
    loadNextYearsList(): void {
        this._firstYearInList += this._periodsAmount() * this._yearsInOnePeriod();
        this._constructYearsGrid();
    }

    /** Method used to load the next 12 years to be displayed. */
    loadPreviousYearsList(): void {
        this._firstYearInList -= this._periodsAmount() * this._yearsInOnePeriod();
        this._constructYearsGrid();
    }

    /** Method that allows to focus elements inside this component */
    focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
     setFocusOnCell(): void {
        const cellToFocus = new DefaultActiveCalendarCellStrategy().getActiveCell(this._getYearsList());
        if (!cellToFocus?.id) {
            return;
        }
        this.focusElementBySelector(`#${cellToFocus.id}`);
    }

    /** Method returning index of aggregated year index cell */
    getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /** Get id of calendar's aggregated year item */
    getId(index: number): string {
        return this.id + '-fd-aggregated-year-' + index;
    }

    /** Check if specified year is between start year and end year) */
    isBetween(aggregatedYear: AggregatedYear, yearToCheck: number): boolean {
        return aggregatedYear.endYear >= yearToCheck && aggregatedYear.startYear <= yearToCheck;
    }

    private _constructYearsGrid(): void {
        const displayedYearsAmount: number = this.aggregatedYearsViewGrid.cols * this.aggregatedYearsViewGrid.rows;
        const calendarYearList: CalendarAggregatedYear[] = [];
        this.calendarYearListGrid = [];

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
                years: years,
                label: this._getYearsName(years),
                ariaLabel: this._getAriaYearsName(years),
                selected: this.isBetween(years, this.yearSelected),
                current: this.isBetween(years, this.currentYear),
                index: index
            });
        }

        /** Creating 2d grid */
        while (calendarYearList.length) {
            this.calendarYearListGrid.push(calendarYearList.splice(0, this.aggregatedYearsViewGrid.cols));
        }

        const yearsCellSelected = calendarYearList.find((cell) => this.isBetween(cell.years, this.yearSelected));
        this.yearsSelected = yearsCellSelected ? yearsCellSelected.years : null;
        this.activeYear = this._getActiveYear();

        this.calendarYearListGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cell.id = this.getId(this.getIndex(rowIndex, colIndex));
                cell.tabIndex = cell.years === this.activeYear ? 0 : -1;
            });
        });

        this._changeDetectorRef.detectChanges();
    }

    /** Returns year name as a string. */
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

    /** Returns aria year name as a string. */
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

    /** Returns year name taking into account yearMapping. */
    private _getYearString(year: number, defaultStr: string): string {
        if (typeof this.aggregatedYearsViewGrid.yearMapping === 'function') {
            return this.aggregatedYearsViewGrid.yearMapping(year);
        }
        return defaultStr;
    }

    /** Amount of years displayed in year view */
    private _yearsInOnePeriod(): number {
        if (this.yearViewGrid) {
            return this.yearViewGrid.cols * this.yearViewGrid.rows;
        } else {
            return 12;
        }
    }

    /** Amount of years displayed in aggregated year view */
    private _periodsAmount(): number {
        return this.aggregatedYearsViewGrid.cols * this.aggregatedYearsViewGrid.rows;
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): AggregatedYear {
        const selectedYearCell = this._getYearsList().find(({ years }) => this.isBetween(years, this.yearSelected));
        if (selectedYearCell) {
            return selectedYearCell.years;
        }

        const currentYearCell = this._getYearsList().find(({ years }) => this.isBetween(years, this.currentYear));
        if (currentYearCell) {
            return currentYearCell.years;
        }

        return this.calendarYearListGrid[0][0].years;
    }

    /** Returns transformed 1d array from 2d year grid. */
    private _getYearsList(): CalendarAggregatedYear[] {
        return [].concat.apply([], this.calendarYearListGrid);
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this._calendarService.rowAmount = this.aggregatedYearsViewGrid.rows;
        this._calendarService.colAmount = this.aggregatedYearsViewGrid.cols;

        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this.selectYear(this._getYearsList()[index]));

        this._calendarService.onListStartApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.loadPreviousYearsList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onListEndApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.loadNextYearsList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });
    }

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this.focusElementBySelector(`#${this.getId(index)}`);
    }
}
