import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-disable-func-example',
    templateUrl: './date-picker-disable-func-example.component.html'
})
export class DatePickerDisableFuncExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday())
    });

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }

    disableFunction = (fdDate: FdDate): boolean => {
        return fdDate && fdDate.getTimeStamp() < FdDate.getToday().getTimeStamp();
    };
}
