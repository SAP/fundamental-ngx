import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-range-example',
    template: ` <fd-date-picker [type]="'range'" [(ngModel)]="selectedRange">
                </fd-date-picker>
                <br/>
                <div>Selected First Date: {{selectedRange.date.toDateString()}}</div>
                <br/>
                <div>Selected Last Date: {{selectedRange.rangeEnd.toDateString()}}</div>`
})
export class DatePickerRangeExampleComponent {

    selectedRange = {
        date: new Date(),
        rangeEnd: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

}
