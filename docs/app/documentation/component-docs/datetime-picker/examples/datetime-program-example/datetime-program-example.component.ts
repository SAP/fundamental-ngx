import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';
import { FdDate } from '../../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'app-datetime-program-example',
    templateUrl: './datetime-program-example.component.html'
})
export class DatetimeProgramExampleComponent {
    date = FdDatetime.getToday();

    changeDay(): void {
        this.date = new FdDatetime(new FdDate(2018, 10, 10), this.date.time);
    }
}
