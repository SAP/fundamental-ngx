import { Component } from '@angular/core';
import { SpecialDayRule } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-calendar-options-example',
  templateUrl: './calendar-options-example.component.html'
})
export class CalendarOptionsExampleComponent {

    showWeekCount: boolean = false;
    compact: boolean = false;
    markWeekends: boolean = false;
}
