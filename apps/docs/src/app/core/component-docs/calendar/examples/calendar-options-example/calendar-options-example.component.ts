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
    showSpecialDays: boolean = false;

    specialDays: SpecialDayRule[] = [
        { specialDayNumber: 1, rule: fdDate => fdDate.getDay() === 1 },
        { specialDayNumber: 2, rule: fdDate => fdDate.getDay() === 2 },
        { specialDayNumber: 3, rule: fdDate => fdDate.getDay() === 3 },
        { specialDayNumber: 4, rule: fdDate => fdDate.getDay() === 4 },
        { specialDayNumber: 5, rule: fdDate => fdDate.getDay() === 5 },
        { specialDayNumber: 6, rule: fdDate => fdDate.getDay() === 6 },
        { specialDayNumber: 7, rule: fdDate => fdDate.getDay() === 7 },
    ];
}
