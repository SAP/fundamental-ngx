import { Component } from '@angular/core';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-program-example',
    templateUrl: './datetime-program-example.component.html'
})
export class DatetimeProgramExampleComponent {
    date = FdDatetime.getToday();

    changeDay(): void {
        this.date = new FdDatetime(new FdDate(2018, 10, 10), this.date.time);
    }
}
