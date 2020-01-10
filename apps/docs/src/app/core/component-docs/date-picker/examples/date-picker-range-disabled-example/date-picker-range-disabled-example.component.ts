import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-date-picker-range-disabled-example',
  templateUrl: './date-picker-range-disabled-example.component.html',
})
export class DatePickerRangeDisabledExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: FdDate.getToday(),
            end: FdDate.getToday().nextDay()
        })
    });

    disabledEndFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
    };

    disabledStartFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() < fdDate.getTimeStamp();
    };
}
