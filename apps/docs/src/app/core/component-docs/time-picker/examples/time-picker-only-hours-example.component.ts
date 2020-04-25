import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-picker-only-hours-example',
    templateUrl: './time-picker-only-hours-example.component.html'
})
export class TimePickerOnlyHoursExampleComponent {
    timePickerOnlyHoursObject = { hour: 12, minute: null, second: null };
}
