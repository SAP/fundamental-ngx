import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

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

    selectedRange = {
        date: FdDate.getToday(),
        rangeEnd: FdDate.getToday().nextDay()
    };

    getSelectedFirstDate() {
        let retVal = 'null';
        if (this.selectedRange.date) {
            retVal = this.selectedRange.date.toDateString();
        }
        return retVal;
    }

    getSelectedLastDate() {
        let retVal = 'null';
        if (this.selectedRange.rangeEnd) {
            retVal = this.selectedRange.rangeEnd.toDateString();
        }
        return retVal;
    }

}
