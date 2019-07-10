import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'fd-calendar2-year-view',
    templateUrl: './calendar2-year-view.component.html',
    styleUrls: ['./calendar2-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2YearViewComponent implements OnInit {

    @Output()
    yearClicked: EventEmitter<any> = new EventEmitter();

    @Input()
    yearSelected: number;

    @Input()
    isActive: boolean;

    @Input()
    calendarYearList: number[];

    constructor() {
    }

    ngOnInit() {

    }

    selectYear(yearSelected: number) {
        this.yearSelected = yearSelected;
        this.yearClicked.emit(this.yearSelected);
    }
}
