import { Component, ViewChild } from '@angular/core';
import { DatetimePickerComponent, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: `
        <fd-datetime-picker
            [allowNull]="false"
            [(ngModel)]="selectedDay"
            [state]="isValid() ? 'error' : 'success'"
        ></fd-datetime-picker>
        <br />
        <br />
        <span>Selected Date: {{ selectedDay }}</span>
    `
})
export class DatetimePickerAllowNullExampleComponent {
    @ViewChild(DatetimePickerComponent) datePicker: DatetimePickerComponent<FdDate>;

    selectedDay: FdDate = FdDate.getNow();

    isValid(): boolean {
        return this.datePicker && this.datePicker.isInvalidDateInput;
    }
}
