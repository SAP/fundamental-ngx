import { Component, ViewChild } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
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
        <span>Selected Date: {{ selectedDay || 'null' }}</span>
    `,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class DatetimePickerAllowNullExampleComponent {
    @ViewChild(DatetimePickerComponent) datePicker: DatetimePickerComponent<FdDate>;

    selectedDay: FdDate = FdDate.getNow();

    isInvalid(): boolean {
        return !this.selectedDay || !this.selectedDay.isDateValid();
    }
}
