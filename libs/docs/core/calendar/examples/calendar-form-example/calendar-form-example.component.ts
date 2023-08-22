import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import { FormItemModule } from '@fundamental-ngx/core/form';

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
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FormItemModule, CalendarComponent, ButtonModule]
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
