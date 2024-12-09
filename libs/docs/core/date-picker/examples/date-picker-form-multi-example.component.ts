import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-date-picker-form-multi-example',
    template: `
        <form [formGroup]="customForm" class="flex-form">
            <div>
                <div fd-form-item>
                    <label for="fd-date-picker-form-multi-example-1" fd-form-label [required]="true">Date Picker</label>
                    <fd-date-picker
                        [state]="isValid() ? 'success' : 'error'"
                        [message]="isValid() ? 'This is valid Date picker' : 'This is invalid Date picker'"
                        [required]="true"
                        [preventScrollOnFocus]="true"
                        [allowMultipleSelection]="true"
                        formControlName="dates"
                        inputId="fd-date-picker-form-multi-example-1"
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
            <br />
            <br />

            <div fd-form-item>
                <label for="fd-date-picker-form-multi-example-2" fd-form-label>Disabled Date Picker</label>
                <fd-date-picker
                    state="information"
                    message="This is disabled DatePicker"
                    [allowMultipleSelection]="true"
                    formControlName="disabledDate"
                    inputId="fd-date-picker-form-multi-example-2"
                >
                </fd-date-picker>
                <br />
            </div>

            <small>
                Touched: {{ customForm.controls.disabledDate.touched }}<br />
                Dirty: {{ customForm.controls.disabledDate.dirty }}<br />
                Valid: {{ customForm.controls.disabledDate.valid }}<br />
                Disabled: {{ customForm.controls.disabledDate.disabled }} <br />
                Selected Dates:<br />
                @for (date of customForm.controls.disabledDate.value; track date) {
                    {{ date.toDateString() || 'null' }}<br />
                }
            </small>
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
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        FormLabelComponent,
        DatePickerComponent,
        FdDatetimeModule
    ]
})
export class DatePickerFormMultiExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl([FdDate.getNow()]),
        disabledDate: new FormControl({ value: [FdDate.getNow()], disabled: true })
    });

    isValid(): boolean {
        return !!this.customForm.get('dates')?.valid;
    }
}
