import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-form-example',
    templateUrl: './datetime-form-example.component.html'
})
export class DatetimeFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getNow()),
        disabledDate: new FormControl({ value: FdDate.getNow(), disabled: true })
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }

    disableFunction = (fdDate: FdDate): boolean => {
        return this.datetimeAdapter.compareDate(FdDate.getToday(), fdDate) > 0;
    };
}
