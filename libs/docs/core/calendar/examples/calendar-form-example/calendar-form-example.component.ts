import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { FormItemComponent } from '@fundamental-ngx/core/form';

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
    imports: [FormsModule, ReactiveFormsModule, FormItemComponent, CalendarComponent, ButtonComponent, FdDatetimeModule]
})
export class CalendarFormExamplesComponent {
    customForm = new FormGroup({
        date: new FormControl(new FdDate(2019, 9, 20)),
        multiDate: new FormControl([
            new FdDate(2019, 9, 1),
            new FdDate(2019, 9, 2),
            new FdDate(2019, 9, 3),
            new FdDate(2019, 9, 4),
            new FdDate(2019, 9, 5),
            new FdDate(2019, 9, 6),
            new FdDate(2019, 9, 7),
            new FdDate(2019, 9, 9),
            new FdDate(2019, 9, 16),
            new FdDate(2019, 9, 23),
            new FdDate(2019, 9, 30)
        ]),
        dateRange: new FormControl({
            value: {
                start: new FdDate(2019, 10, 11),
                end: new FdDate(2019, 10, 19)
            },
            disabled: false
        }),
        multiDateRange: new FormControl([
            {
                start: new FdDate(2019, 10, 1),
                end: new FdDate(2019, 10, 10)
            },
            {
                start: new FdDate(2019, 10, 15),
                end: new FdDate(2019, 10, 25)
            }
        ])
    });

    setInvalid(): void {
        this.customForm.get('date')?.setValue(new FdDate(null as any));
    }

    setMultiInvalid(): void {
        this.customForm.get('multiDate')?.setValue([new FdDate(null as any)]);
    }

    setInvalidRange(): void {
        this.customForm.get('dateRange')?.setValue({
            start: new FdDate(null as any),
            end: new FdDate(null as any)
        });
    }

    setInvalidMultiRange(): void {
        this.customForm.controls.multiDateRange.setValue([
            {
                start: new FdDate(null as any),
                end: new FdDate(null as any)
            }
        ]);
    }

    myDisableFunction = (date: FdDate): boolean => {
        const day = date.getDayOfWeek();
        return day === 2 || day === 6;
    };
}
