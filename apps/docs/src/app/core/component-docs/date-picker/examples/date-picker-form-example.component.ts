import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-form-example',
    template: `
        <form [formGroup]="customForm" class="flex-form">
            <div>


                <div fd-form-item>
                    <label fd-form-label>Date Picker</label>
                    <fd-date-picker [state]="isValid() ? 'valid' : 'invalid'" formControlName="date"></fd-date-picker>
                    <fd-form-message *ngIf="isValid()" [type]="'success'">This is valid DatePicker</fd-form-message>
                    <fd-form-message *ngIf="!isValid()" [type]="'error'">This is invalid DatePicker</fd-form-message>
                </div>
                <br/>
                Touched: {{customForm.controls.date.touched}}<br/>
                Dirty: {{customForm.controls.date.dirty}}<br/>
                Valid: {{customForm.controls.date.valid}}<br/>
                Selected Date: {{ customForm.controls.date.value ? customForm.controls.date.value.toDateString() : 'null' }}
            </div>
            <br/>
            <br/>

            <div fd-form-item>
                <label fd-form-label>Disabled Date Picker</label>
                <fd-date-picker [state]="'information'" formControlName="disabledDate"></fd-date-picker>
                <fd-form-message [type]="'information'">This is disabled DatePicker</fd-form-message>
                <br/>
            </div>
            
            <div>
                Touched: {{customForm.controls.disabledDate.touched}}<br/>
                Dirty: {{customForm.controls.disabledDate.dirty}}<br/>
                Valid: {{customForm.controls.disabledDate.valid}}<br/>
                Disabled: {{customForm.controls.disabledDate.disabled}} <br/>
                Selected Date: {{ customForm.controls.disabledDate.value ? customForm.controls.date.value.toDateString() : 'null' }}
            </div>
        </form>
    `
})
export class DatePickerFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday()),
        disabledDate: new FormControl({ value: FdDate.getToday(), disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }
}
