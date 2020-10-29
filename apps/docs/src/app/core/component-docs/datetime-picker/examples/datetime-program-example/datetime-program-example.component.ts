import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-program-example',
    templateUrl: './datetime-program-example.component.html'
})
export class DatetimeProgramExampleComponent {
    date = FdDate.getNow();

    changeDay(): void {
        this.date = new FdDate(2018, 10, 10, this.date.hour, this.date.minute, this.date.second);
    }
}
