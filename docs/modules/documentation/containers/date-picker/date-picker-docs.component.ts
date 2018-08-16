import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent implements OnInit {
    datePickerSingleHtml = `<fd-date-picker [type]="'single'"></fd-date-picker>`;
    datePickerRangeHtml = `<fd-date-picker [type]="'range'"></fd-date-picker>`;

    constructor() {}

    ngOnInit() {}
}
