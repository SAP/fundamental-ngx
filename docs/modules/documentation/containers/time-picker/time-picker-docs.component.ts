import { Component } from '@angular/core';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    timePickerHtml = `<fd-time-picker [time]="timeObject"></fd-time-picker>`;
    meridianTimePickerHtml = `<fd-time-picker [meridian]="true" [time]="timeMeridianObject"></fd-time-picker>`;
    disabledTimePickerHtml = `<fd-time-picker [disabled]="true" [time]="timeObject"></fd-time-picker>`;

    timeObject = { hour: 13, minute: 55, second: 59 };

    timeMeridianObject = { hour: 13, minute: 55, second: 59 };

    constructor() {}
}
