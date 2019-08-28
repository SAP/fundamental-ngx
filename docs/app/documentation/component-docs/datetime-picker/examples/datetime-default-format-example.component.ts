import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
    selector: 'fd-datetime-default-format-example',
    template: `
        <div fd-form-item class="fd-docs-form-item-datetime-picker">
            <label fd-form-label for="datetime-picker-input-type">
                Date Time Format
            </label>
            <input fd-form-control type="text" [(ngModel)]="dateTimeFormat" id="datetime-picker-input-type">
        </div>

        <fd-datetime-picker
            [(ngModel)]="date"
            [dateTimeFormat]="dateTimeFormat"
        ></fd-datetime-picker>
    `,
    styles: [`
        .fd-docs-form-item-datetime-picker {
            width: 280px;
        }
    `]
})
export class DatetimeDefaultFormatExampleComponent {
    date = FdDatetime.getToday();

    dateTimeFormat: string = 'yyyy.dd.mm, SS:MM:HH';
}
