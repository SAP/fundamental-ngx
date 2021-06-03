import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: ` <fd-date-picker
            [allowNull]="false"
            [type]="'single'"
            [(ngModel)]="date"
            [state]="isInvalid() ? 'error' : 'success'"
        ></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>`
})
export class DatePickerAllowNullExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

    date = FdDate.getNow();

    isInvalid(): boolean {
        return !this.datePicker || !this.datePicker.isModelValid();
    }
}
