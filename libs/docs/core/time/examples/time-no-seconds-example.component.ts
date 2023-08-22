import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormsModule } from '@angular/forms';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ],
    standalone: true,
    imports: [TimeModule, FormsModule]
})
export class TimeNoSecondsExampleComponent {
    timeNoSeconds = new FdDate().setTime(12, 0);
}
