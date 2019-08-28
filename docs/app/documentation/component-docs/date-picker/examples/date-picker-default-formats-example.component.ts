import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import { FdRangeDate } from '../../../../../../library/src/lib/calendar/models/fd-range-date';

@Component({
    selector: 'fd-date-picker-default-formats-example',
    template: `
        <div fd-form-item class="fd-docs-form-item-date-picker">
            <label fd-form-label for="date-picker-input-type">
                Date Format
            </label>
            <input fd-form-control type="text" [(ngModel)]="dateFormat" id="date-picker-input-type">
        </div>
        
        <fd-date-picker [(ngModel)]="date"
                        placeholder="yyyy.mm.dd"
                        [dateFormat]="dateFormat">
        </fd-date-picker>
        <br/>
        
        <div>Selected Date: {{date?.toDateString()}}</div>
        <br/>
        <fd-date-picker style="width: 300px;"
                        placeholder="yyyy.mm.dd to yyyy.mm.dd" 
                        [dateFormat]="dateFormat"
                        [type]="'range'" 
                        [(ngModel)]="selectedRange">
        </fd-date-picker>
        <br/>
        
        <div>Selected First Date: {{selectedRange?.start?.toDateString()}}</div>
        <div>Selected Last Date: {{selectedRange?.end?.toDateString()}}</div>
    `,
    styles: [`
        .fd-docs-form-item-date-picker {
            width: 200px;
        }
    `]
})
export class DatePickerDefaultFormatsExampleComponent {

    date = FdDate.getToday();

    selectedRange: FdRangeDate = {
        start: FdDate.getToday(),
        end: FdDate.getToday().nextDay()
    };

    dateFormat: string = 'yyyy.mm.dd';

}
