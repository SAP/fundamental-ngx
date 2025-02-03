import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-date-picker-multi-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <label fd-form-label for="datePicker">Date Picker</label>
        <fd-date-picker
            type="single"
            inputId="datePicker"
            [(ngModel)]="dates"
            [allowMultipleSelection]="true"
        ></fd-date-picker>
        <br />
        <div>
            Selected Dates:<br />
            @for (date of dates; track date) {
                {{ date.toDateString() || 'null' }}<br />
            }
        </div>`,
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
    imports: [FormLabelComponent, DatePickerComponent, FormsModule, ContentDensityDirective, FdDatetimeModule, JsonPipe]
})
export class DatePickerMultiExampleComponent {
    dates: Array<FdDate> = [
        new FdDate(2019, 9, 1),
        new FdDate(2019, 9, 2),
        new FdDate(2019, 9, 3),
        new FdDate(2019, 9, 4),
        new FdDate(2019, 9, 5),
        new FdDate(2019, 9, 6),
        new FdDate(2019, 9, 7),
        new FdDate(2019, 9, 9),
        new FdDate(2019, 9, 16),
        new FdDate(2019, 9, 23),
        new FdDate(2019, 9, 30)
    ];
}
