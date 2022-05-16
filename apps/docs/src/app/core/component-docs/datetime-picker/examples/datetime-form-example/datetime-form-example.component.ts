import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-datetime-form-example',
    templateUrl: './datetime-form-example.component.html',
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
export class DatetimeFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getNow()),
        disabledDate: new FormControl({ value: FdDate.getNow(), disabled: true })
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return !!this.customForm.get('date')?.valid;
    }

    disableFunction = (fdDate: FdDate): boolean => this.datetimeAdapter.compareDate(FdDate.getToday(), fdDate) > 0;
}
