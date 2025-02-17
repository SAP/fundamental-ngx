import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

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
    ],
    imports: [FormLabelComponent, DatetimePickerComponent, FormsModule]
})
export class DateTimePickerUpdateOnBlurExampleComponent {
    date = FdDate.getNow();
}
