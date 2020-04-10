import {
    Component,
    OnInit,
    ViewEncapsulation,
    Output,
    Input,
    EventEmitter,
    ElementRef,
    OnDestroy,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { takeUntil } from 'rxjs/operators';
import { CalendarService } from '../../calendar.service';
import { Subject } from 'rxjs';
import { CalendarYearGrid } from '../../models/calendar-year-grid';

/** Component representing the YearView of the Calendar Component. */
@Component({
    selector: 'fd-calendar-year-view',
    templateUrl: './calendar-year-view.component.html',
    styleUrls: ['./calendar-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-year-view"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarYearViewComponent implements OnInit, OnDestroy {

    /** @hidden
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    activeYear: number;

    /** Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearListGrid: number[][];

    /** Parameter storing the year of the present day. */
    currentYear: number = FdDate.getToday().year;

    /** Parameter storing first shown year on list */
    firstYearInList: number = this.currentYear;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _newFocusedYearId: string;

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
     * Object to customize year grid
     */
    @Input()
    yearViewGrid: CalendarYearGrid;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearClicked: EventEmitter<number> = new EventEmitter<number>();

    /** @hidden */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._setupKeyboardService();
        this.firstYearInList = this.yearSelected;
        this._constructYearGrid();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /** Method used to load the previous {{col * row}} years to be displayed. */
    loadNextYearList(): void {
        this.firstYearInList += this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method used to load the next {{col * row}} years to be displayed. */
    loadPreviousYearList(): void {
        this.firstYearInList -= this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
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

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }

    /**
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /** Get id of calendar's year item */
    getId(index: number): string {
        return this.id + '-fd-year-' + index;
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): number {
        const selectedYear: number = this._getYearList().find(year => year === this.yearSelected);
        if (selectedYear) {
            return selectedYear;
        }

        const currentYear: number = this._getYearList().find(year => year === this.currentYear);
        if (currentYear) {
            return currentYear;
        }

        return this.calendarYearListGrid[0][0];
    }

    /** @hidden */
    private _constructYearGrid(): void {
        const displayedYearsAmount: number = this.yearViewGrid.cols * this.yearViewGrid.rows;
        const calendarYearList = [];
        this.calendarYearListGrid = [];
        for (let x = 0; x < displayedYearsAmount; ++x) {
            calendarYearList.push(this.firstYearInList + x);
        }
        /** Creating 2d grid */
        while (calendarYearList.length) {
            this.calendarYearListGrid.push(calendarYearList.splice(0, this.yearViewGrid.cols));
        }
        this.activeYear = this._getActiveYear();
        this._changeDetectorRef.detectChanges();
        this.focusYearElement();
    }

    /** Returns transformed 1d array from 2d year grid. */
    private _getYearList(): number[] {
        return [].concat.apply([], this.calendarYearListGrid);
    }

    /** Amount of years displayed in year view */
    private _getAmountOfYearsShownAtOnce(): number {
        return this.yearViewGrid.rows * this.yearViewGrid.cols
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this._calendarService.colAmount = this.yearViewGrid.cols;
        this._calendarService.rowAmount = this.yearViewGrid.rows;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => {
                this._newFocusedYearId = this.getId(index);
                this.focusYearElement();
            })
        ;

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => this.selectYear(this._getYearList()[index]))
        ;

        this._calendarService.onListStartApproach
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => {
                this._newFocusedYearId = this.getId(index);
                this.loadPreviousYearList();
            })
        ;

        this._calendarService.onListEndApproach
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => {
                this._newFocusedYearId = this.getId(index);
                this.loadNextYearList();
            })
        ;
    }
}
