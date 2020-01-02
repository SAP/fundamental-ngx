import {
    Component,
    OnInit,
    ViewEncapsulation,
    Output,
    Input,
    EventEmitter,
    ElementRef,
    AfterViewChecked,
    OnDestroy,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { takeUntil } from 'rxjs/operators';
import { CalendarService } from '../../calendar.service';
import { Subject } from 'rxjs';

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
export class CalendarYearViewComponent implements AfterViewChecked, OnInit, OnDestroy {

    private readonly _amountOfColPerRow: number = 4;

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
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private newFocusedYearId: string;

    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: Function;

    /** Parameter holding the year that is currently selected. */
    @Input()
    yearSelected: number;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearClicked: EventEmitter<number> = new EventEmitter<number>();

    /** @hidden */
    constructor(
        private eRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        private calendarService: CalendarService) {
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.firstYearInList = this.yearSelected;
        this.constructYearGrid();

        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(index => {
                this.newFocusedYearId = this.id + '-fd-year-' + index;
                this.focusElement(this.newFocusedYearId);
            })
        ;
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(index => this.selectYear(this.getYearList()[index]))
        ;

        this.calendarService.onListStartApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => this.loadPreviousYearList())
        ;

        this.calendarService.onListEndApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => this.loadNextYearList())
        ;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private getActiveYear(): number {
        const selectedYear: number = this.getYearList().find(year => year === this.yearSelected);
        if (selectedYear) {
            return selectedYear;
        }

        const currentYear: number = this.getYearList().find(year => year === this.currentYear);
        if (currentYear) {
            return currentYear;
        }

        return this.calendarYearListGrid[0][0];
    }

    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event, index: number): void {
        this.calendarService.onKeydownHandler(event, index);
    }

    /** Method used to load the previous 12 years to be displayed. */
    loadNextYearList(): void {
        this.firstYearInList += 12;
        this.constructYearGrid();
    }

    /** Method used to load the next 12 years to be displayed. */
    loadPreviousYearList(): void {
        this.firstYearInList -= 12;
        this.constructYearGrid();
    }

    /** Method allowing focusing on elements within this component. */
    focusElement(elementSelector: string): void {
        setTimeout(() => {
            const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector('#' + elementSelector);
            if (elementToFocus) {
                this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
            }
        }, 0);
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }

    getId(rowIndex: number, colIndex: number): number {
        return rowIndex * this._amountOfColPerRow + colIndex;
    }

    /** @hidden */
    private constructYearGrid(): void {
        const displayedYearsAmount: number = 12;
        const calendarYearList = [];
        this.calendarYearListGrid = [];
        for (let x = 0; x < displayedYearsAmount; ++x) {
            calendarYearList.push(this.firstYearInList + x);
        }
        /** Creating 2d grid */
        while (calendarYearList.length) {
            this.calendarYearListGrid.push(calendarYearList.splice(0, this._amountOfColPerRow));
        }
        this.activeYear = this.getActiveYear();
        this.changeDetectorRef.markForCheck();
    }

    /** Returns transformed 1d array from 2d year grid. */
    private getYearList(): number[] {
        return [].concat.apply([], this.calendarYearListGrid);
    }
}
