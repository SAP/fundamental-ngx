import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: `
        <fd-date-picker [allowNull]="false" [type]="'single'" [(ngModel)]="date" [state]="isInvalid() ? 'invalid' : 'valid'"></fd-date-picker>
        <br/>
        <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>`
})
export class DatePickerAllowNullExampleComponent {

    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent;

    date = FdDate.getToday();

    isInvalid(): boolean {
        return !this.datePicker || !this.datePicker.isModelValid()
    }

}
