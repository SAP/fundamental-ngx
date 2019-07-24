import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
    selector: 'fd-datetime-disabled-example',
    templateUrl: './datetime-disabled-example.component.html'
})
export class DatetimeDisabledExampleComponent {
    date: FdDatetime = FdDatetime.getToday();
}
