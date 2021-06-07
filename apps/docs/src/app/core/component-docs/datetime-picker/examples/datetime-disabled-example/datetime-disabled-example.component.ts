import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-datetime-disabled-example',
    templateUrl: './datetime-disabled-example.component.html'
})
export class DatetimeDisabledExampleComponent {
    date = FdDate.getNow();
}
