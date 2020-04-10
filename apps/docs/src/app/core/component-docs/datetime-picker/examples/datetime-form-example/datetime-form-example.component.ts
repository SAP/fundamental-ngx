import { Component, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-form-example',
    templateUrl: './datetime-form-example.component.html'
})
export class DatetimeFormExampleComponent {

    customForm = new FormGroup({
        date: new FormControl(FdDatetime.getToday()),
        disabledDate: new FormControl({ value: FdDatetime.getToday(), disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }

    disableFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
    }
}
