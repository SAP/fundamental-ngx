import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-form-example',
    styleUrls: ['time-form-example.component.scss'],
    templateUrl: './time-form-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl<FdDate | null>(null)
    });
}
