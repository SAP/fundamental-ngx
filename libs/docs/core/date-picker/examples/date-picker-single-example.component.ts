import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FormLabelModule } from '@fundamental-ngx/core/form';

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
    ],
    standalone: true,
    imports: [FormLabelModule, DatePickerComponent, FormsModule, ContentDensityDirective]
})
export class DatePickerSingleExampleComponent {
    date: Nullable<FdDate> = FdDate.getNow();
}
