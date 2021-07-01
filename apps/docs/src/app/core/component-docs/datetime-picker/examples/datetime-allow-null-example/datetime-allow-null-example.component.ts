import { Component, ViewChild } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: `
        <fd-datetime-picker
            [allowNull]="false"
            [(ngModel)]="selectedDay"
            [state]="isInvalid() ? 'error' : 'success'"
        ></fd-datetime-picker>
        <br />
        <br />
        <span>Selected Date: {{ selectedDay }}</span>
    `
})
export class DatetimePickerAllowNullExampleComponent {
    @ViewChild(DatetimePickerComponent) datePicker: DatetimePickerComponent<FdDate>;

    selectedDay: FdDate = FdDate.getNow();

    isInvalid(): boolean {
        return this.datePicker?.isInvalidDateInput;
    }
}
