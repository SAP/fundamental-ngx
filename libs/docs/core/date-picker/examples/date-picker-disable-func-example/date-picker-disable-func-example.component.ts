import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-date-picker-disable-func-example',
    templateUrl: './date-picker-disable-func-example.component.html',
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
    imports: [FormsModule, ReactiveFormsModule, FormItemModule, FormLabelModule, DatePickerComponent]
})
export class DatePickerDisableFuncExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday())
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return !!this.customForm.get('date')?.valid;
    }

    disableFunction = (fdDate: FdDate): boolean => this.datetimeAdapter.compareDate(fdDate, FdDate.getToday()) < 0;
}
