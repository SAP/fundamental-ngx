import { Component } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-example',
    templateUrl: 'calendar-form-example.component.html',
    styleUrls: ['calendar-form-example.component.scss'],
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class CalendarFormExamplesComponent {
    customForm = new FormGroup({
        date: new FormControl(new FdDate(2019, 9, 20)),
        dateRange: new FormControl({
            value: {
                start: new FdDate(2019, 10, 11),
                end: new FdDate(2019, 10, 19)
            },
            disabled: false
        })
    });

    setInvalid(): void {
        this.customForm.get('date')?.setValue(new FdDate(null as any));
    }

    setInvalidRange(): void {
        this.customForm.get('dateRange')?.setValue({
            start: new FdDate(null as any),
            end: new FdDate(null as any)
        });
    }
}
