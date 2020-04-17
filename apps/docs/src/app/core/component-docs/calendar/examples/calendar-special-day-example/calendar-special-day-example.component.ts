import { Component } from '@angular/core';
import { FdDate, SpecialDayRule } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-calendar-special-day-example',
  templateUrl: './calendar-special-day-example.component.html'
})
export class CalendarSpecialDayExampleComponent {

    specialDays: SpecialDayRule[] = [];

    markWeekends: boolean = false;
    markNextWeek: boolean = false;
    markAllMondays: boolean = false;
    markPastDays: boolean = false;

    refreshRules(): void {
        this.specialDays = [];
        if (this.markWeekends) {
            this.specialDays.push({ rule: fdDate => fdDate.getDay() === 1 || fdDate.getDay() === 7, specialDayNumber: 5 })
        }
        if (this.markAllMondays) {
            this.specialDays.push({ rule: fdDate => fdDate.getDay() === 2, specialDayNumber: 15 })
        }
        if (this.markNextWeek) {
            this.specialDays.push({
                rule: fdDate => {
                    return (fdDate.getTimeStamp() > FdDate.getToday().getTimeStamp() &&
                        fdDate.getTimeStamp() <= this._getFutureDate(FdDate.getToday()).getTimeStamp())
                },
                specialDayNumber: 10
            })
        }
        if (this.markPastDays) {
            this.specialDays.push({ rule: fdDate => FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp(), specialDayNumber: 13 })
        }
    }

    /** Get date for next 7 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture: number = 7;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = fdDate.nextDay();
        }
        return fdDate;
    }
}
