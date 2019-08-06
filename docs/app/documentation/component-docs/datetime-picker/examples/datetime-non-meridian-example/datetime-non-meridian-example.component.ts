import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
    selector: 'app-datetime-non-meridian-example',
    templateUrl: './datetime-non-meridian-example.component.html'
})
export class DatetimeNonMeridianExampleComponent {
    date = FdDatetime.getToday();
}
