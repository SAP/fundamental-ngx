import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html'
})
export class TimeExampleComponent {
    timeObject = { hour: 14, minute: 3, second: 2 };
}
