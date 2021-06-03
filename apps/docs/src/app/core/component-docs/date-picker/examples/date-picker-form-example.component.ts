import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-form-example',
    template: `
        <form [formGroup]="customForm" class="flex-form">
            <div>
                <div fd-form-item>
                    <label fd-form-label>Date Picker</label>
                    <fd-date-picker
                            [state]="isValid() ? 'success' : 'error'"
                            [message]="isValid() ? 'This is valid(success) DatePicker' : 'This is invalid(error) DatePicker'"
                            formControlName="date">
                    </fd-date-picker>
                </div>
                <br />
                Touched: {{ customForm.controls.date.touched }}<br />
                Dirty: {{ customForm.controls.date.dirty }}<br />
                Valid: {{ customForm.controls.date.valid }}<br />
                Selected Date:
                {{ customForm.controls.date.value?.toDateString() || 'null' }}
            </div>
            <br />
            <br />

            <div fd-form-item>
                <label fd-form-label>Disabled Date Picker</label>
                <fd-date-picker
                        state="information"
                        message="This is disabled DatePicker"
                        formControlName="disabledDate">
                </fd-date-picker>
                <br />
            </div>

            <div>
                Touched: {{ customForm.controls.disabledDate.touched }}<br />
                Dirty: {{ customForm.controls.disabledDate.dirty }}<br />
                Valid: {{ customForm.controls.disabledDate.valid }}<br />
                Disabled: {{ customForm.controls.disabledDate.disabled }} <br />
                Selected Date:
                {{ customForm.controls.disabledDate.value?.toDateString() || 'null' }}
            </div>
        </form>
    `
})
export class DatePickerFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getNow()),
        disabledDate: new FormControl({ value: FdDate.getNow(), disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }
}
