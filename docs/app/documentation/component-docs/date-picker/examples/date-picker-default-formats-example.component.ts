import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import { FdRangeDate } from '../../../../../../library/src/lib/calendar/models/fd-range-date';

@Component({
    selector: 'fd-date-picker-default-formats-example',
    template: `
        <fd-date-picker [(ngModel)]="date"
                        placeholder="yyyy.mm.dd"
                        [dateFormat]="'yyyy.mm.dd'">
        </fd-date-picker>
        <br/>
        
        <div>Selected Date: {{date?.toDateString()}}</div>
        <br/>
        <fd-date-picker style="width: 300px;"
                        placeholder="yyyy.mm.dd to yyyy.mm.dd" 
                        [dateFormat]="'yyyy.mm.dd'"
                        [type]="'range'" 
                        [(ngModel)]="selectedRange">
        </fd-date-picker>
        <br/>
        
        <div>Selected First Date: {{selectedRange?.start?.toDateString()}}</div>
        <div>Selected Last Date: {{selectedRange?.end?.toDateString()}}</div>
    `
})
export class DatePickerDefaultFormatsExampleComponent {

    date = FdDate.getToday();

    selectedRange: FdRangeDate = {
        start: FdDate.getToday(),
        end: FdDate.getToday().nextDay()
    };

}
