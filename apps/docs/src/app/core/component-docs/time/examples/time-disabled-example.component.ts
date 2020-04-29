import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-disabled-example',
    templateUrl: './time-disabled-example.component.html'
})
export class TimeDisabledExampleComponent {
    timeObject = { hour: 12, minute: 0, second: 0 };
}
