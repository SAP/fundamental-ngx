import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-picker-no-seconds-example',
    templateUrl: './time-picker-no-seconds-example.component.html'
})
export class TimePickerNoSecondsExampleComponent {
    timePickerNoSecondsObject = { hour: 12, minute: 0, second: null };
}
