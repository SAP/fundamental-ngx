import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { CalendarDay } from '../../models/calendar-day';

@Component({
    selector: 'fd-calendar2-year-view',
    templateUrl: './calendar2-year-view.component.html',
    styleUrls: ['./calendar2-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2YearViewComponent {

    @Input()
    isActive: boolean;

    @Input()
    calendarYearList: number[];

    @Input()
    yearSelected: number;

    @Output()
    yearClicked: EventEmitter<any> = new EventEmitter();

    currentYear: number = new Date().getFullYear();

    constructor() { }

    onKeydownYearHandler(event) {
        event.preventDefault();
        console.log('keyup triggered!');
    }

    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
}
