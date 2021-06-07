import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-datetime-example',
    templateUrl: './datetime-example.component.html'
})
export class DatetimeExampleComponent {
    date = FdDate.getNow();
}
