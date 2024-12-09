import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-no-spinners-example',
    templateUrl: './time-no-spinners-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule]
})
export class TimeNoSpinnersExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
