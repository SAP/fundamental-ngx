import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { CalendarDay } from '../../models/calendar-day';

@Component({
    selector: 'fd-calendar2-year-view',
    templateUrl: './calendar2-year-view.component.html',
    styleUrls: ['./calendar2-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2YearViewComponent {

    @Input()
    id: string;

    @Input()
    isActive: boolean;

    @Input()
    calendarYearList: number[];

    @Input()
    yearSelected: number;

    @Output()
    yearClicked: EventEmitter<any> = new EventEmitter();

    @Output()
    reGenerateYearList: EventEmitter<any> = new EventEmitter();

    currentYear: number = new Date().getFullYear();

    constructor(private eRef: ElementRef) { }

    onKeydownYearHandler(event, year: number, index: number) {
        // remove these 2 lines after testing
        console.log(`keydown triggered on year ${year}`);
        console.log(index);

        let newFocusedYearId: string;

        switch (event.code) {
            case 'Enter':
            case 'Space': {
                event.preventDefault();
                this.selectYear(year);
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                if (index === 0) {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + 11;
                    this.reGenerateYearList.emit('previousSet');
                } else {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index - 1);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                if (index === 11) {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + 0;
                    this.reGenerateYearList.emit('nextSet');
                } else {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index + 1);
                }
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= 3) {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index + 8);
                    this.reGenerateYearList.emit('previousSet');
                } else {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index - 4);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= 8) {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index - 8);
                    this.reGenerateYearList.emit('nextSet');
                } else {
                    newFocusedYearId = '#' + this.id + '-fd-year-' + (index + 4);
                }
                break;
            }
        }

        this.focusElement(newFocusedYearId);
    }

    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
}
