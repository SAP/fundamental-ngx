import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-form-example',
    templateUrl: './datetime-form-example.component.html',
    styles: [
        `
            .fd-form-message--custom {
                max-width: 100%;
                box-shadow: none;
            }
        `
    ]
})
export class DatetimeFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDatetime.getToday()),
        disabledDate: new FormControl({ value: FdDatetime.getToday(), disabled: true })
    });

    isOpen = false;

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }

    disableFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
    };
}
