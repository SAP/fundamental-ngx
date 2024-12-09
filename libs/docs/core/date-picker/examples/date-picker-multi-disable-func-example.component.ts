import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-multi-disable-func-example',
    template: `
        <form [formGroup]="customForm" class="flex-form">
            <div>
                <div fd-form-item>
                    <label fd-form-label>Date Picker</label>
                    <fd-date-picker
                        [disableFunction]="disableFunction"
                        [message]="
                            isValid()
                                ? 'This is valid(success) multi DatePicker'
                                : 'This is invalid(error) multi DatePicker'
                        "
                        [state]="isValid() ? 'success' : 'error'"
                        [allowMultipleSelection]="true"
                        formControlName="dates"
                    >
                    </fd-date-picker>
                </div>
                <br />
                <small>
                    Touched: {{ customForm.controls.dates.touched }}<br />
                    Dirty: {{ customForm.controls.dates.dirty }}<br />
                    Valid: {{ customForm.controls.dates.valid }}<br />
                    Selected Dates:<br />
                    @for (date of customForm.controls.dates.value; track date) {
                        {{ date.toDateString() || 'null' }}<br />
                    }
                </small>
            </div>
        </form>
    `,
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
    imports: [
        DatePickerComponent,
        FormsModule,
        FdDatetimeModule,
        FormItemComponent,
        FormLabelComponent,
        ReactiveFormsModule
    ]
})
export class DatePickerMultiDisableFuncExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl([FdDate.getToday()])
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return !!this.customForm.get('dates')?.valid;
    }

    disableFunction = (fdDate: FdDate): boolean => this.datetimeAdapter.compareDate(fdDate, FdDate.getToday()) < 0;
}
