import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-calendar-special-day-example',
    templateUrl: './calendar-special-day-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class CalendarSpecialDayExampleComponent {
    specialDays: SpecialDayRule<FdDate>[] = [];

    markWeekends = false;
    markNextWeek = false;
    markAllMondays = false;
    markPastDays = false;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    refreshRules(): void {
        this.specialDays = [];
        if (this.markWeekends) {
            this.specialDays.push({
                rule: (fdDate) => {
                    const day = this.datetimeAdapter.getDayOfWeek(fdDate);
                    return day === 1 || day === 7;
                },
                specialDayNumber: 5
            });
        }
        if (this.markAllMondays) {
            this.specialDays.push({
                rule: (fdDate) => this.datetimeAdapter.getDayOfWeek(fdDate) === 2,
                specialDayNumber: 15
            });
        }
        if (this.markNextWeek) {
            this.specialDays.push({
                rule: (fdDate) =>
                    this.datetimeAdapter.compareDate(fdDate, this.datetimeAdapter.today()) > 0 &&
                    this.datetimeAdapter.compareDate(fdDate, this._getFutureDate(this.datetimeAdapter.today())) <= 0,
                specialDayNumber: 10
            });
        }
        if (this.markPastDays) {
            this.specialDays.push({
                rule: (fdDate) => this.datetimeAdapter.compareDate(fdDate, this.datetimeAdapter.today()) < 0,
                specialDayNumber: 13
            });
        }
    }

    /** Get date for next 7 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture = 7;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = this.datetimeAdapter.addCalendarDays(fdDate, 1);
        }
        return fdDate;
    }
}
