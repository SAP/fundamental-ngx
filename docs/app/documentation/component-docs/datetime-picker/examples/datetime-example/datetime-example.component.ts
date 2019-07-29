import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
  selector: 'app-datetime-example',
  templateUrl: './datetime-example.component.html'
})
export class DatetimeExampleComponent {
    date: FdDatetime = FdDatetime.getToday();
}
