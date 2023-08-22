import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormsModule } from '@angular/forms';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-no-spinners-example',
    templateUrl: './time-no-spinners-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ],
    standalone: true,
    imports: [TimeModule, FormsModule]
})
export class TimeNoSpinnersExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
