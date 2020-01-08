import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-single-example',
    template: `
        <fd-date-picker [type]="'single'" [(ngModel)]="date"></fd-date-picker>
        <br/>
        <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>
        <br/>
        <fd-date-picker [type]="'single'" [(ngModel)]="date" compact="true"></fd-date-picker>
        <div>Selected Date: {{date?.toDateString() }}</div>`,
})
export class DatePickerSingleExampleComponent {
    date = FdDate.getToday();

    @ViewChild(DatePickerComponent, { static: false }) datePicker: DatePickerComponent;

    isValid(): boolean {
        return this.datePicker && this.datePicker.isModelValid();
    }
}
