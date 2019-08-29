import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
    selector: 'fd-datetime-disabled-form-example',
    templateUrl: './datetime-disabled-form-example.component.html'
})
export class DatetimeDisabledFormExampleComponent {
    disabledCustomForm = new FormGroup({
        date: new FormControl({value: FdDatetime.getToday(), disabled: true})
    });
}
