import { Component } from '@angular/core';

@Component({
  selector: 'app-datetime-example',
  templateUrl: './datetime-example.component.html'
})
export class DatetimeExampleComponent {
    date: Date = new Date();

    getSelectedDate() {
        let retVal = 'null';
        if (this.date && this.date.toLocaleString()) {
            retVal = this.date.toLocaleString();
        }
        return retVal;
    }
}
