import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-range-example',
    template: ` <fd-date-picker [type]="'range'" [(selectedRangeFirst)]="selectedRangeFirst" 
                                [(selectedRangeLast)]="selectedRangeLast">
                </fd-date-picker>
                <br/>
                <div>Selected First Date: {{selectedRangeFirst.date.toDateString()}}</div>
                <br/>
                <div>Selected Last Date: {{selectedRangeLast.date.toDateString()}}</div>`
})
export class DatePickerRangeExampleComponent {

    selectedRangeFirst = {
        date: new Date()
    };

    selectedRangeLast = {
        date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

}