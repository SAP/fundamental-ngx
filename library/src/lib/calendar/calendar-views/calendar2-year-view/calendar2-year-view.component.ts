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

    currentYear = new Date().getFullYear();
    calendarYearList: number[];

    constructor() {
    }

    ngOnInit() {
        this.constructYearList();
    }

    selectYear(yearSelected: number) {
        this.yearSelected = yearSelected;
        this.yearClicked.emit(this.yearSelected);
    }

    private constructYearList() {
        this.calendarYearList = [];
        for (let x = 0; x < 12; x++) {
            this.calendarYearList.push(this.currentYear + x);
        }
    }

}
