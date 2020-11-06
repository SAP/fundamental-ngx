import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-form-range-example',
    template: `
        <div *ngIf="customForm">
            <form [formGroup]="customForm">
                <fd-date-picker type="range" formControlName="dates" style="width: 300px"></fd-date-picker>
            </form>

            Touched: {{ customForm.controls.dates.touched }}<br />
            Dirty: {{ customForm.controls.dates.dirty }}<br />
            Valid: {{ customForm.controls.dates.valid }}<br />

            Range Start Date:
            {{ customForm.controls.dates.value.start ? customForm.controls.dates.value.start.toDateString() : 'null' }}
            <br />
            Range End Date:
            {{ customForm.controls.dates.value.end ? customForm.controls.dates.value.end.toDateString() : 'null' }}
        </div>
    `
})
export class DatePickerFormRangeExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: FdDate.getToday(),
            end: FdDate.getToday().nextDay()
        })
    });
}
