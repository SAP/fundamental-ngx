import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-datetime-picker-update-on-blur-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label fd-form-label for="dateTimePickerOnBlur">DateTime Picker</label>
        <fd-datetime-picker
            inputId="dateTimePickerOnBlur"
            [processInputOnBlur]="true"
            [(ngModel)]="date"
        ></fd-datetime-picker>
        <br />
        <span> Selected: {{ date || 'null' }} </span>
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
export class DateTimePickerUpdateOnBlurExampleComponent {
    date = FdDate.getNow();
}
