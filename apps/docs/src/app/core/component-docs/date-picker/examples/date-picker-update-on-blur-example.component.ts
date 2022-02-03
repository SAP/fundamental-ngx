import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-update-on-blur-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <label fd-form-label for="datePickerOnBlur">Date Picker</label>
        <fd-date-picker id="datePickerOnBlur" [processInputOnBlur]="true" [(ngModel)]="date"></fd-date-picker>
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
export class DatePickerUpdateOnBlurExampleComponent {
    date = FdDate.getNow();
}
