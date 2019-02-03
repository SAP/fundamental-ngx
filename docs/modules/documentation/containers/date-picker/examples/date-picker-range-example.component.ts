import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-range-example',
    template: ` <fd-date-picker [type]="'range'" [(ngModel)]="selectedRange" (ngModelChange)="print()">
                </fd-date-picker>
                <br/>
                <div>Selected First Date: {{selectedRange.selected.toDateString()}}</div>
                <br/>
                <div>Selected Last Date: {{selectedRange.selectedSecond.toDateString()}}</div>`
})
export class DatePickerRangeExampleComponent {

    selectedRange = {
        selected: new Date(),
        selectedSecond: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    selectedRangeFirst = {
        date: new Date()
    };

    selectedRangeLast = {
        date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    print() {
        console.log(this.selectedRange);
    }

}
