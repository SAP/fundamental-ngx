import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-only-hours-example',
    templateUrl: './time-only-hours-example.component.html'
})
export class TimeOnlyHoursExampleComponent {
    onlyHoursTime = { hour: 12, minute: null, second: null };
}
