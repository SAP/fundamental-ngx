import { Component, ViewChild } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: ` <fd-date-picker
            [allowNull]="false"
            [type]="'single'"
            [(ngModel)]="date"
            [state]="isInvalid() ? 'error' : 'success'"
        ></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>`,
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
export class DatePickerAllowNullExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

    date = FdDate.getNow();

    isInvalid(): boolean {
        return !this.date || !this.date.isDateValid();
    }
}
