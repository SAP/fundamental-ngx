import {
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    ElementRef,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalendarService } from '../../calendar.service';

/** Component representing the month view of the calendar. */
@Component({
    selector: 'fd-calendar-month-view',
    templateUrl: './calendar-month-view.component.html',
    styleUrls: ['./calendar-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-month-view"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarMonthViewComponent implements OnInit, OnDestroy {

    /** A number offset used to achieve the 1-12 representation of the calendar */
    private readonly _monthOffset: number = 1;

    private _shortMonthNames: string[];

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** A number (1-12) representing the selected month */
    @Input()
    monthSelected: number;

    /** A function that handles escape focus */
    @Input()
    focusEscapeFunction: Function;

    /** An event fired when a new month is selected */
    @Output()
    readonly monthClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private eRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private calendarI18n: CalendarI18n,
        private calendarService: CalendarService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(index => this.focusElement('#' + this.id + '-fd-month-' + index))
        ;

        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(index => this.selectMonth(index))
        ;

        this.calendarI18n.i18nChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => this.cdRef.markForCheck())
        ;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        return FdDate.getToday().month;
    }

    /**  Getter for the private class member _monthOffset */
    get monthOffset(): number {
        return this._monthOffset;
    }

    /** Method for handling the mouse click event when a month is selected  */
    selectMonth(selectedMonth: number, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = selectedMonth + this.monthOffset;
        this.monthClicked.emit(this.monthSelected);
    }

    /** Method for handling the keyboard events (a11y) */
    onKeydownMonthHandler(event, index: number): void {
       this.calendarService.onKeydownHandler(event, index)
    }

    /** Method that allows to focus elements inside this component */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

    /** Method that returns list of short month names from currently provided calendarI18n service */
    get shortMonthNames(): string[] {
        return this.calendarI18n.getAllShortMonthNames();
    }
}
