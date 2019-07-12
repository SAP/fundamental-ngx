import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar2
            [disableFunction]="myDisableFunction2"
            [calType]="'single'"
            [(selectedDate)]="selectedDay2"
        ></fd-calendar2>
    `
})
export class CalendarSingleExampleComponent {
    selectedDay = {
        date: new Date()
    };
    customForm = new FormGroup({
        date: new FormControl({ date: FdDate.getToday() }),
        dateRange: new FormControl({ start: null, end: null })
    });

    str

    selectedDay2: FdDate = new FdDate(2018, 10, 30);

    myDisableFunction = function (d: Date): boolean {
        const day = d.getDay();
        return day === 6 || day === 0;
    };

    myDisableFunction2 = function (d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 6 || day === 0;
    };

    // Block days before/after any day
    myBlockFunction = function (d: Date): boolean {
        const firstDay = new Date(2018, 7, 25);
        const lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime();
    };

    disableWednesday() {
        this.myDisableFunction = function (d: Date): boolean {
            const day = d.getDay();
            return day === 3;
        };
        this.myDisableFunction2 = function (d: FdDate) {
            const day = d.toDate().getDay();
            return day === 3;
        }
    }
}
