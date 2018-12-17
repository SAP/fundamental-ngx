import { Component, OnInit } from '@angular/core';

import * as calendarRangeSrc from '!raw-loader!./examples/calendar-range-example.component.ts';
import * as calendarSingleSrc from '!raw-loader!./examples/calendar-single-example.component.ts';
import * as calendarMondayStartSrc from '!raw-loader!./examples/calendar-monday-start-example.component.ts';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html'
})
export class CalendarDocsComponent implements OnInit {

    calendarSingleSource = calendarSingleSrc;
    calendarRangeSource = calendarRangeSrc;
    calendarMondayStartSource = calendarMondayStartSrc;

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
}`;

    constructor() {}

    ngOnInit() {}
}
