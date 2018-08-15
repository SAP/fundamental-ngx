import { Component } from '@angular/core';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    timePickerHtml = `<fd-time-picker [time]="timeObject"></fd-time-picker>`;
    meridianTimePickerHtml = `<fd-time-picker [meridian]="true" [time]="timeMeridianObject"></fd-time-picker>`;
    timePickerNoSecondsHtml = `<fd-time-picker [displaySeconds]="false" [time]="timeObject"></fd-time-picker>`;
    disabledTimePickerHtml = `<fd-time-picker [disabled]="true" [time]="timeObject"></fd-time-picker>`;

    timeObject = { hour: 12, minute: 0, second: 0 };

    timeMeridianObject = { hour: 12, minute: 0, second: 0 };

    timePickerNoSecondsObject = { hour: 12, minute: 0, second: null };

    constructor() {}
}
