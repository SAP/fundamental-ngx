import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-options-example',
    templateUrl: './calendar-options-example.component.html'
})
export class CalendarOptionsExampleComponent {
    showWeekCount = false;
    compact = true;
    markWeekends = false;
}
