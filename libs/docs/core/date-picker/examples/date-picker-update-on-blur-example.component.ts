import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/cdk/utils';

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
    date: Nullable<FdDate> = FdDate.getNow();
}
