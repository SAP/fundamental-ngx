import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-no-spinners-example',
    templateUrl: './time-no-spinners-example.component.html'
})
export class TimeNoSpinnersExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
