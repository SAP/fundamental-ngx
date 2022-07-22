import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-single-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <label fd-form-label for="datePicker">Date Picker</label>
        <fd-date-picker type="single" inputId="datePicker" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>
        <br />
        <label fd-form-label for="compactDatePicker">Compact Date Picker</label>
        <fd-date-picker type="single" inputId="compactDatePicker" [(ngModel)]="date" fdCompact></fd-date-picker>
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
export class DatePickerSingleExampleComponent {
    date = FdDate.getNow();
}
