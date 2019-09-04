import { Component } from '@angular/core';
import { FdDate, FdRangeDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-range-example',
    template: ` <fd-date-picker [type]="'range'" [(ngModel)]="selectedRange">
                </fd-date-picker>
                <br/>
                <div>Selected First Date: {{getSelectedFirstDate()}}</div>
                <br/>
                <div>Selected Last Date: {{getSelectedLastDate()}}</div>`
})
export class DatePickerRangeExampleComponent {

    selectedRange: FdRangeDate = {
        start: FdDate.getToday(),
        end: FdDate.getToday().nextDay()
    };

    getSelectedFirstDate() {
        let retVal = 'null';
        if (this.selectedRange.start) {
            retVal = this.selectedRange.start.toDateString();
        }
        return retVal;
    }

    getSelectedLastDate() {
        let retVal = 'null';
        if (this.selectedRange.end) {
            retVal = this.selectedRange.end.toDateString();
        }
        return retVal;
    }

}
