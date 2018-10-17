import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent implements OnInit {
    datePickerSingleHtml = `<fd-date-picker [type]="'single'" [(selectedDay)]="selectedDay"></fd-date-picker>`;
    datePickerRangeHtml = `<fd-date-picker [type]="'range'" [(selectedRangeFirst)]="selectedRangeFirst" [(selectedRangeLast)]="selectedRangeLast"></fd-date-picker>`;

    datePickerSingleJs = `selectedDay = {
    date: new Date()
};`;

    datePickerRangeJs = `selectedRangeFirst = {
    date: new Date()
};

selectedRangeLast = {
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
};`;

    selectedDay = {
        date: new Date()
    };

    selectedRangeFirst = {
        date: new Date()
    };

    selectedRangeLast = {
        date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    constructor() {}

    ngOnInit() {}
}
