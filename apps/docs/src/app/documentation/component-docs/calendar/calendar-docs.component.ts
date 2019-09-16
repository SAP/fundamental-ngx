import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as calendarRangeSrc from '!raw-loader!./examples/calendar-range-example.component.ts';
import * as calendarSingleSrc from '!raw-loader!./examples/calendar-single-example.component.ts';
import * as calendarMondayStartSrc from '!raw-loader!./examples/calendar-monday-start-example.component.ts';
import * as calendarIntlSrc from '!raw-loader!./examples/calendar-i18n-example.component.ts';
import * as calendarIntlMomentSrc from '!raw-loader!./examples/calendar--i18n-moment-example.component.ts';
import * as calendarFormSourceT from '!raw-loader!./examples/calendar-form-examples.component.ts';
import * as calendarFormSourceH from '!raw-loader!./examples/calendar-form-examples.component.html';
import * as calendarProgrammaticallySource from '!raw-loader!./examples/calendar-programmatically-change-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html'
})
export class CalendarDocsComponent implements OnInit {
    exampleFunctionsHtml = `Example Disable and Block Functions: 

// Disable the weekends
myDisableFunction = function (d: FdDate): boolean {
    let day = d.getDay();
    return day === 6 || day === 0;
}

// Disable any weekday (Monday)
myDisableFunction2 = function(d: FdDate): boolean {
    let day = d.getDay();
    return day === 1;
}

// Disable past selection
myDisableFunction = function(d: FdDate): boolean {
    let today = FdDate.getToday();
    today.setHours(0,0,0,0);
    return d.getTimeStamp() < today.getTimeStamp();
}

// Disable future selection
myDisableFunction = function(d: FdDate): boolean {
    let today = FdDate.getToday();
    today.setHours(0,0,0,0); 
    return d.getTimeStamp() > today.getTimeStamp()
}

// Disable days before a particular day
myDisableFunction = function(d: FdDate): boolean {
    let day = new FdDate(2018, 9, 15);
    return d.getTimeStamp() < day.getTimeStamp();
}

// Disable days after a particular day
myDisableFunction = function(d: FdDate): boolean {
    let day = new FdDate(2018, 9, 5);
    return d.getTimeStamp() > day.getTimeStamp()
}

// Disable days within a range
myDisableFunction = function(d: FdDate): boolean {
    let firstDay = new FdDate(2018, 7, 5);
    let lastDay = new FdDate(2018, 7, 20);
    return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp()
}`;

    calendarSingleSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarSingleSrc
        },
        {
            language: 'typescript',
            code: this.exampleFunctionsHtml,
            name: 'Example Block/Disable Functions'
        }
    ];

    calendarRangeSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarRangeSrc
        }
    ];

    calendarMondayStartSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarMondayStartSrc
        }
    ];

    calendari18n: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarIntlSrc
        }
    ];

    calendari18nMoment: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarIntlMomentSrc
        }
    ];

    calendarFormSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarFormSourceT
        },
        {
            language: 'html',
            code: calendarFormSourceH
        }
    ];

    calendarProgrammaticallySource: ExampleFile[] = [
        {
            language: 'typescript',
            code: calendarProgrammaticallySource
        }
    ];

    ngOnInit() {}
}
