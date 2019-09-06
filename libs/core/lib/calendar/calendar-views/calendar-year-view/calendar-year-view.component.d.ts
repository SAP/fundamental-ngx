import { OnInit, EventEmitter, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CalendarService } from '../../calendar.service';
/** Component representing the YearView of the Calendar Component. */
export declare class CalendarYearViewComponent implements AfterViewChecked, OnInit, OnDestroy {
    private eRef;
    private calendarService;
    /** @hidden
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    activeYear: number;
    /** Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearList: number[];
    /** Parameter storing the year of the present day. */
    currentYear: number;
    /** Parameter storing first shown year on list */
    firstYearInList: number;
    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$;
    /** @hidden */
    private newFocusedYearId;
    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    id: string;
    /** Function that is called when the focus would escape the element. */
    focusEscapeFunction: Function;
    /** Parameter holding the year that is currently selected. */
    yearSelected: number;
    /** Event fired when a year is selected. */
    readonly yearClicked: EventEmitter<number>;
    /** @hidden */
    constructor(eRef: ElementRef, calendarService: CalendarService);
    /** @hidden */
    ngAfterViewChecked(): void;
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private getActiveYear;
    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event: any, index: number): void;
    /** Method used to load the previous 12 years to be displayed. */
    loadNextYearList(): void;
    /** Method used to load the next 12 years to be displayed. */
    loadPreviousYearList(): void;
    /** Method allowing focusing on elements within this component. */
    focusElement(elementSelector: string): void;
    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: number, event?: MouseEvent): void;
    /** @hidden */
    private constructYearList;
}
