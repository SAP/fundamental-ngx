import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { Subject } from 'rxjs';
import { CalendarService } from '../../calendar.service';
import { takeUntil } from 'rxjs/operators';
import { AggregatedYear } from '../../models/aggregated-year';
import { CalendarYearGrid } from '../../models/calendar-year-grid';

@Component({
    selector: 'fd-calendar-aggregated-year-view',
    templateUrl: './calendar-aggregated-year-view.component.html',
    styleUrls: ['./calendar-aggregated-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarAggregatedYearViewComponent implements OnInit, OnDestroy {

    /** @hidden
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    activeYear: AggregatedYear;

    /**
     *  Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearListGrid: AggregatedYear[][];

    /**
     * @hidden
     * Current period of years selected
     */
    yearsSelected: AggregatedYear;

    /** Parameter storing the year of the present day. */
    currentYear: number = FdDate.getToday().year;

    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: Function;

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
    private _newFocusedYearId: string;

    /** @hidden */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService) {
    }


    /** @hidden */
    ngOnInit(): void {
        this._setupKeyboardService();
        this._firstYearInList = this.yearSelected - this._yearsInOnePeriod();
        this._constructYearsGrid();
    }


    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: AggregatedYear, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.yearsSelected = selectedYear;
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

    /** Method allowing focusing on elements within this component. */
    focusYearElement(): void {
        if (this._newFocusedYearId) {
            const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector('#' + this._newFocusedYearId);
            this._newFocusedYearId = '';
            if (elementToFocus) {
                elementToFocus.focus();
            }
        }
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
        const calendarYearList: AggregatedYear[] = [];
        this.calendarYearListGrid = [];
        for (let index = 0; index < displayedYearsAmount; ++index) {
            /**
             * Generates object with certain period of years,
             * which depends on amount of years displayed in year view
             */
            calendarYearList.push({
                startYear: this._firstYearInList + (this._yearsInOnePeriod() * index),
                endYear: this._firstYearInList + (this._yearsInOnePeriod() * (index + 1)) - 1
            });
        }
        /** Creating 2d grid */
        while (calendarYearList.length) {
            this.calendarYearListGrid.push(calendarYearList.splice(0, this.aggregatedYearsViewGrid.cols));
        }
        this.yearsSelected = calendarYearList.find(years => this.isBetween(years, this.yearSelected));
        this.activeYear = this._getActiveYear();
        this._changeDetectorRef.detectChanges();
        this.focusYearElement();
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
        return this.aggregatedYearsViewGrid.cols * this.aggregatedYearsViewGrid.rows
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): AggregatedYear {
        const selectedYear: AggregatedYear = this._getYearsList()
            .find(aggregatedYears => this.isBetween(aggregatedYears, this.yearSelected))
        ;
        if (selectedYear) {
            return selectedYear;
        }

        const currentYear: AggregatedYear = this._getYearsList()
            .find(aggregatedYears => this.isBetween(aggregatedYears, this.currentYear))
        ;
        if (currentYear) {
            return currentYear;
        }

        return this.calendarYearListGrid[0][0];
    }

    /** Returns transformed 1d array from 2d year grid. */
    private _getYearsList(): AggregatedYear[] {
        return [].concat.apply([], this.calendarYearListGrid);
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this._calendarService.rowAmount = this.aggregatedYearsViewGrid.rows;
        this._calendarService.colAmount = this.aggregatedYearsViewGrid.cols;

        this._calendarService.onFocusIdChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => {
                this._newFocusedYearId = this.getId(index);
                this.focusYearElement();
            })
        ;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => this.selectYear(this._getYearsList()[index]))
        ;

        this._calendarService.onListStartApproach
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => {
                this._newFocusedYearId = this.getId(index);
                this.loadPreviousYearsList();
            })
        ;

        this._calendarService.onListEndApproach
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => {
                this._newFocusedYearId = this.getId(index);
                this.loadNextYearsList();
            })
        ;

    }
}
