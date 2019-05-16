import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarI18n } from '../../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarCurrent } from '../../models/calendar-current';
import { DaysOfWeek } from '../../calendar2.component';

@Component({
    selector: 'fd-calendar2-day-view',
    templateUrl: './calendar2-day-view.component.html',
    styleUrls: ['./calendar2-day-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2DayViewComponent implements OnInit {

    @Input()
    public selectedDate: FdDate;

    @Input()
    public currentlyDisplayed: CalendarCurrent;

    @Input()
    public startingDayOfWeek: DaysOfWeek;

    @HostBinding('class.fd-calendar__dates')
    private fdCalendarDateViewClass: boolean = true;

    dayViewGrid: number[][];

    constructor(private calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
    }

    get shortWeekDays(): string[] {
        return this.calendarI18n.getAllShortWeekdays().map(weekday => weekday[0].toLocaleUpperCase());
    }

    get daysInCurentMonth() {
        return this.getDaysInMonth(this.currentlyDisplayed.month, this.currentlyDisplayed.year);
    }

    private buildDayViewGrid(): void {

    }

    private getDaysInMonth(month: number, year: number): number {
        if (month === 2) {
            return this.isLeapYear(year) ? 29 : 28;
        } else if (month % 2 === 0) {
            return 30;
        } else {
            return 31;
        }
    }

    private isLeapYear(year: number): boolean {
        if (year % 4 !== 0) {
            return false;
        } else if (year % 400 === 0) {
            return true;
        } else {
            return year % 100 !== 0;
        }
    }
}
