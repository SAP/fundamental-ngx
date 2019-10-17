import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-picker-example',
    templateUrl: './time-picker-example.component.html'
})
export class TimePickerExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}