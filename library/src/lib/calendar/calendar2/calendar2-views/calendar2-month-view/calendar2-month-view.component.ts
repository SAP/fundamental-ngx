import { Component, Input, Output, ViewEncapsulation, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-calendar2-month-view',
    templateUrl: './calendar2-month-view.component.html',
    styleUrls: ['./calendar2-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2MonthViewComponent {
    /** @hidden The id of the calendar passed from the parent component. */
    @Input() id: string;

    /** @hidden A list of month names */
    @Input() monthNames: string[];

    /** @hidden A number (1-12) representing the selected month */
    @Input() monthSelected: number;

    /** @hidden When set to true allows escape focus, otherwise resets on beginning. */
    @Input()
    allowFocusEscape: boolean = false;

    /** @hidden An event fired when a new month is selected. */
    @Output()
    monthClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor(private eRef: ElementRef) {
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        const tempDate: Date = new Date();
        return tempDate.getMonth() + 1;
    }

    /** @hidden */
    selectMonth(selectedMonth: number, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = selectedMonth + 1;
        this.monthClicked.emit(this.monthSelected);
    }

    /** @hidden */
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
                if (!event.shiftKey && !this.allowFocusEscape) {
                    event.preventDefault();
                    this.focusElement('#arrowLeft');
                }
                break;
            }
        }
        if (newFocusedMonthId) {
            this.focusElement(newFocusedMonthId);
        }
    }

    /** @hidden */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
}
