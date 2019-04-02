import { Component } from '@angular/core';

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
        date: new Date(),
        rangeEnd: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    getSelectedFirstDate() {
        let retVal = 'null';
        if (this.selectedRange.date && this.selectedRange.date.toDateString()) {
            retVal = this.selectedRange.date.toDateString();
        }
        return retVal;
    }

    getSelectedLastDate() {
        let retVal = 'null';
        if (this.selectedRange.rangeEnd && this.selectedRange.rangeEnd.toDateString()) {
            retVal = this.selectedRange.rangeEnd.toDateString();
        }
        return retVal;
    }

}
