import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';

/**
 * Example component demonstrating the date picker with calendar legend feature.
 *
 * This example shows:
 * - How to define special days rules with legend text
 * - How to enable the calendar legend display
 * - How to associate the legend with the calendar using a unique ID
 */
@Component({
    selector: 'fd-date-picker-legend-example',
    standalone: true,
    templateUrl: './date-picker-legend-example.html',
    imports: [DatePickerComponent, FormsModule, FdDatetimeModule]
})
export class DatePickerLegendExample {
    /** Selected date for the date picker */
    selectedDate: FdDate = FdDate.getToday();

    /**
     * Define special days rules for the calendar.
     * Each rule includes:
     * - specialDayNumber: A number between 1-20 that determines the styling
     * - rule: A function that returns true for dates that should be marked
     * - legendText: The text to display in the legend for this special day
     * - appointment (optional): Whether to show as a small circle marker
     */
    specialDaysRules = [
        {
            specialDayNumber: 1,
            rule: (date: FdDate) =>
                // Mark all Mondays as Team Meeting days
                date.getDayOfWeek() === 1,
            legendText: 'Team Meeting',
            appointment: false
        },
        {
            specialDayNumber: 5,
            rule: (date: FdDate) =>
                // Mark the 15th of each month as Payment Day
                date.day === 15,
            legendText: 'Payment Day',
            appointment: true
        },
        {
            specialDayNumber: 10,
            rule: (date: FdDate) =>
                // Mark all Fridays as Review Day
                date.getDayOfWeek() === 5,
            legendText: 'Review Day',
            appointment: false
        },
        {
            specialDayNumber: 8,
            rule: (date: FdDate) =>
                // Mark specific holidays (example: first day of month)
                date.day === 1,
            legendText: 'Monthly Kickoff',
            appointment: true
        }
    ];
}
