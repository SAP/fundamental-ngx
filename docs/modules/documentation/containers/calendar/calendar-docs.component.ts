import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html'
})
export class CalendarDocsComponent implements OnInit {
    selectedDay = {
        date: new Date()
    };

    selectedRangeFirst = {
        date: new Date()
    };

    selectedRangeLast = {
        date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

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

    calendarSingleHtml = `<fd-calendar [calType]="'single'" [(selectedDay)]="selectedDay" [disableFunction]="myDisableFunction" [blockFunction]="myBlockFunction"></fd-calendar>`;

    selectedDayJs = `selectedDay = {
    date: new Date()
};`;

    exampleFunctionsHtml = `Example Disable and Block Functions: 

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

    calendarRangeHtml = `<fd-calendar [datePickerType]="'range'" [(selectedRangeFirst)]="selectedRangeFirst" [(selectedRangeLast)]="selectedRangeLast" [disableFunction]="myDisableFunction2" ></fd-calendar>`;

    calendarRangeJs = `selectedRangeFirst = {
    date: new Date()
};

selectedRangeLast = {
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
};`;

    constructor() {}

    ngOnInit() {}
}
