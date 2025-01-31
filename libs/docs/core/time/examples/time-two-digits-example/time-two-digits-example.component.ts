import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-two-digits-example',
    templateUrl: './time-two-digits-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule]
})
export class TimeTwoDigitsExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
