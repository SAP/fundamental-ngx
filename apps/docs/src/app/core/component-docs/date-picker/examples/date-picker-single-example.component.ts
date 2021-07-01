import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-single-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label fd-form-label for="datePicker">Date Picker</label>
        <fd-date-picker type="single" inputId="datePicker" [(ngModel)]="date"></fd-date-picker>
        <br/>
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>
        <br/>
        <label fd-form-label for="compactDatePicker">Compact Date Picker</label>
        <fd-date-picker type="single" inputId="compactDatePicker" [(ngModel)]="date" compact="true"></fd-date-picker>
        <div>Selected Date: {{ date?.toDateString() }}</div>`
})
export class DatePickerSingleExampleComponent {
    date = FdDate.getNow();
}
