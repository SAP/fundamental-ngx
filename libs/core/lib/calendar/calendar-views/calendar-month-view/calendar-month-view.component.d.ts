import { EventEmitter, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { CalendarService } from '../../calendar.service';
/** Component representing the month view of the calendar. */
export declare class CalendarMonthViewComponent implements OnInit, OnDestroy {
    private eRef;
    private cdRef;
    private calendarI18n;
    private calendarService;
    /** A number offset used to achieve the 1-12 representation of the calendar */
    private readonly _monthOffset;
    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$;
    /** The id of the calendar passed from the parent component */
    id: string;
    /** A number (1-12) representing the selected month */
    monthSelected: number;
    /** A function that handles escape focus */
    focusEscapeFunction: Function;
    /** An event fired when a new month is selected */
    readonly monthClicked: EventEmitter<number>;
    constructor(eRef: ElementRef, cdRef: ChangeDetectorRef, calendarI18n: CalendarI18n, calendarService: CalendarService);
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /** Get a number (1-12) representing the current month  */
    readonly currentMonth: number;
    /**  Getter for the private class member _monthOffset */
    readonly monthOffset: number;
    /** Method for handling the mouse click event when a month is selected  */
    selectMonth(selectedMonth: number, event?: MouseEvent): void;
    /** Method for handling the keyboard events (a11y) */
    onKeydownMonthHandler(event: any, index: number): void;
    /** Method that allows to focus elements inside this component */
    focusElement(elementSelector: string): void;
    /** Method that returns list of short month names from currently provided calendarI18n service */
    readonly shortMonthNames: string[];
}
