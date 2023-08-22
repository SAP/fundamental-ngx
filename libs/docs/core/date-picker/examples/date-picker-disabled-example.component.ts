import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';

@Component({
    selector: 'fd-date-picker-disabled-example',
    template: ` <fd-date-picker [disabled]="true" type="single" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() }}</div>`,
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
    imports: [DatePickerComponent, FormsModule]
})
export class DatePickerDisabledExampleComponent {
    date: Nullable<FdDate> = new FdDate();
}
