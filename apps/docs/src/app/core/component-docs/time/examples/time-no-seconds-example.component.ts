import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html'
})
export class TimeNoSecondsExampleComponent {
    timeNoSecondsObject = { hour: 12, minute: 0, second: null };
}
