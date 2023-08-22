import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormsModule } from '@angular/forms';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ],
    standalone: true,
    imports: [TimeModule, FormsModule]
})
export class TimeExampleComponent {
    time = new FdDate().setTime(14, 3, 2);
}
