import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { FdpFormGroupModule, PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-date-picker-legend-example',
    templateUrl: './date-picker-legend-example.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformDatePickerComponent]
})
export class DatePickerLegendExample {
    datePickerForm = new FormGroup({
        datePicker1: new FormControl(FdDate.getToday()),
        datePicker2: new FormControl(FdDate.getToday())
    });

    specialDaysRules: SpecialDayRule<FdDate>[] = [
        {
            specialDayNumber: 1,
            rule: (date: FdDate) => {
                const day = date.getDayOfWeek();
                return day === 1; // Mondays - Team Meeting
            },
            legendText: 'Team Meeting'
        },
        {
            specialDayNumber: 2,
            rule: (date: FdDate) => {
                const day = date.day;
                return day === 15; // 15th of month - Payment Day
            },
            legendText: 'Payment Day'
        },
        {
            specialDayNumber: 3,
            rule: (date: FdDate) => {
                const day = date.getDayOfWeek();
                return day === 5; // Fridays - Review Day
            },
            legendText: 'Review Day'
        },
        {
            specialDayNumber: 4,
            rule: (date: FdDate) => {
                const day = date.day;
                return day === 1; // 1st of month - Monthly Kickoff
            },
            legendText: 'Monthly Kickoff'
        }
    ];
}
