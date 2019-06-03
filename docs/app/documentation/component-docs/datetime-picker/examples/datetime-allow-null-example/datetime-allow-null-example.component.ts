import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: ` <fd-datetime-picker [allowNull]="false" [(ngModel)]="selectedDay"></fd-datetime-picker>
            <span style="padding-left: 20px;">Selected Date: {{selectedDay.toLocaleDateString()}}</span>`
})
export class DatetimePickerAllowNullExampleComponent {

    selectedDay: Date = new Date();

}
