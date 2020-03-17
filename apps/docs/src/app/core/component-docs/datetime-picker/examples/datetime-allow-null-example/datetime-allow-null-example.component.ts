import { Component, ViewChild } from '@angular/core';
import { DatetimePickerComponent, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: `
        <fd-datetime-picker [allowNull]="false" [(ngModel)]="selectedDay" [state]="isValid() ? 'invalid' : 'valid'"></fd-datetime-picker>
        <span style="padding-left: 20px;">Selected Date: {{selectedDay?.toLocaleDateString()}}</span>
    `
})
export class DatetimePickerAllowNullExampleComponent {

    @ViewChild(DatetimePickerComponent) datePicker: DatetimePickerComponent;

    selectedDay: FdDatetime = FdDatetime.getToday();

    isValid(): boolean {
        return this.datePicker && this.datePicker.isInvalidDateInput
    }
}
