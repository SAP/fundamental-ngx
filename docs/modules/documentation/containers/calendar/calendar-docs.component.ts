import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html'
})
export class CalendarDocsComponent implements OnInit {
    selectedDate: string;
    selectedFirstDate: string;
    selectedLastDate: string;

    updateDatePickerInputHandler(d) {
        if (d.selectedDay.id !== 0) {
            this.selectedDate = d.selectedDay.date.toDateString();
        }

        if (d.selectedFirstDay.id !== 0) {
            this.selectedFirstDate = d.selectedFirstDay.date.toDateString();
            this.selectedLastDate = d.selectedLastDay.date.toDateString();
        }
    }

    myDisableFunction = function(d: Date): boolean {
        let day = d.getDay();
        return day === 6 || day === 0;
    };

    myDisableFunction2 = function(d: Date): boolean {
        let day = d.getDay();
        return day === 1;
    };

    // Block days before/after any day
    myBlockFunction = function(d: Date): boolean {
        let firstDay = new Date(2018, 7, 25);
        let lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime();
    };

    calendarSingleHtml = `<fd-calendar [calType]="'single'" [disableFunction]="myDisableFunction" [blockFunction]="myBlockFunction"></fd-calendar>
    `;

    exampleFunctionsHtml = `
    Example Disable and Block Functions: 

    // Disable the weekends
    myDisableFunction = function (d: Date): boolean {
        let day = d.getDay();
        return day === 6 || day === 0;
    }

    // Disable any weekday (Monday)
    myDisableFunction2 = function(d: Date): boolean {
        let day = d.getDay();
        return day === 1;
    }

    // Disable past selection
    myDisableFunction = function(d: Date): boolean {
        let today = new Date();
        today.setHours(0,0,0,0);
        return d.getTime() < today.getTime();
    }

    // Disable future selection
    myDisableFunction = function(d: Date): boolean {
        let today = new Date();
        today.setHours(0,0,0,0); 
        return d.getTime() > today.getTime()
    }

    // Disable days before a particular day
    myDisableFunction = function(d: Date): boolean {
        let day = new Date(2018, 9, 15);
        return d.getTime() < day.getTime();
    }

    // Disable days after a particular day
    myDisableFunction = function(d: Date): boolean {
        let day = new Date(2018, 9, 5);
        return d.getTime() > day.getTime()
    }

    // Disable days within a range
    myDisableFunction = function(d: Date): boolean {
        let firstDay = new Date(2018, 7, 5);
        let lastDay = new Date(2018, 7, 20);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime()
    }

    // Block days within a range
    myBlockFunction = function (d: Date): boolean {
        let firstDay = new Date(2018, 7, 25);
        let lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime()
    } `;

    calendarRangeHtml = `<fd-calendar [datePickerType]="'range'" [disableFunction]="myDisableFunction2" ></fd-calendar>
    `;

    constructor() {}

    ngOnInit() {}
}
