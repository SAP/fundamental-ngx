import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';

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
        rangeEnd: FdDate.getModelFromDate(new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000))
    };

    getSelectedFirstDate() {
        let retVal = 'null';
        if (this.selectedRange.date && this.selectedRange.date.toDate()) {
            retVal = this.selectedRange.date.toDate().toDateString();
        }
        return retVal;
    }

    getSelectedLastDate() {
        let retVal = 'null';
        if (this.selectedRange.rangeEnd && this.selectedRange.rangeEnd.toDate().toDateString()) {
            retVal = this.selectedRange.rangeEnd.toDate().toDateString();
        }
        return retVal;
    }

}
