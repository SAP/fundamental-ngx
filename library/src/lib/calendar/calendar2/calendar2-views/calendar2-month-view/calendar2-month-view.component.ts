import { Component, Input, Output, ViewEncapsulation, EventEmitter, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { CalendarI18n } from '../../../i18n/calendar-i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Component representing the month view of the calendar. */
@Component({
    selector: 'fd-calendar2-month-view',
    templateUrl: './calendar2-month-view.component.html',
    styleUrls: ['./calendar2-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-month-view"'    
    },
})
export class Calendar2MonthViewComponent implements OnInit, OnDestroy {
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
    monthClicked: EventEmitter<number> = new EventEmitter<number>();

    /** A list of month names (short names) */
    monthNames: string[];

    /** A number offset used to achieve the 1-12 representation of the calendar */
    private readonly _monthOffset: number = 1;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private onDestroy$: Subject<void> = new Subject<void>();

    constructor(private eRef: ElementRef, private cdRef: ChangeDetectorRef, private calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
        this.monthNames = this.calendarI18n.getAllShortMonthNames();

        this.calendarI18n.i18nChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.monthNames = this.calendarI18n.getAllShortMonthNames();
                this.cdRef.detectChanges();
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        return FdDate.getToday().month
    }

    /**  Getter for the private class member _monthOffset */
      get monthOffset(): number {
        return this._monthOffset
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
    onKeydownMonthHandler(event: KeyboardEvent, month: number): void {
        let newFocusedMonthId: string;

        switch (event.code) {
            case 'Space':
            case 'Enter': {
                event.preventDefault();
                this.selectMonth(month);
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                newFocusedMonthId = '#' + this.id + '-fd-month-' + (month - 4);
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                newFocusedMonthId = '#' + this.id + '-fd-month-' + (month + 4);
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                if (month === 0) {
                    newFocusedMonthId = '#' + this.id + '-fd-month-11';
                } else {
                    newFocusedMonthId = '#' + this.id + '-fd-month-' + (month - 1);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                if (month === 11) {
                    newFocusedMonthId = '#' + this.id + '-fd-month-0'
                } else {
                    newFocusedMonthId = '#' + this.id + '-fd-month-' + (month + 1);
                }
                break;
            }
            case 'Tab': {
                if (this.focusEscapeFunction) {
                    event.preventDefault();
                    this.focusEscapeFunction();
                }
                break;
            }
        }
        if (newFocusedMonthId) {
            this.focusElement(newFocusedMonthId);
        }
    }

    /** Method that allows to focus elements inside this component */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
}
