import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-blocked-example',
    templateUrl: './time-blocked-example.component.html'
})
export class TimeBlockedExampleComponent {

    timeObject = { hour: 10, minute: 0, second: 0 };

    timeStart = { hour: 9, minute: 0, second: 0 };
    timeEnd = { hour: 12, minute: 0, second: 0 };

    hoursOutOfRange = this.timeObject.hour > this.timeStart.hour && this.timeObject.hour < this.timeEnd.hour;

    StartTimeEqual = this.timeObject.hour === this.timeStart.hour && (this.timeObject.minute > this.timeStart.minute
        || this.timeObject.second > this.timeStart.second);

    EndTimeEqual = this.timeObject.hour === this.timeEnd.hour &&
        (this.timeObject.minute < this.timeEnd.minute || this.timeObject.second < this.timeEnd.second);

    foo: boolean = this.hoursOutOfRange || this.StartTimeEqual || this.EndTimeEqual;
}
