import { Component } from '@angular/core';

import calendarRangeSrc from '!./examples/calendar-range-example.component.ts?raw';
import calendarOptionHtml from '!./examples/calendar-options-example/calendar-options-example.component.html?raw';
import calendarOptionSrc from '!./examples/calendar-options-example/calendar-options-example.component.ts?raw';
import calendarMarkHoverSrc from '!./examples/calendar-mark-hover/calendar-mark-hover.component.ts?raw';
import calendarMarkHoverHtml from '!./examples/calendar-mark-hover/calendar-mark-hover.component.html?raw';
import calendarSpecialSrc from '!./examples/calendar-special-day-example/calendar-special-day-example.component.ts?raw';
import calendarSpecialHtml from '!./examples/calendar-special-day-example/calendar-special-day-example.component.html?raw';
import calendarGridSrc from '!./examples/calendar-grid-example/calendar-grid-example.component.ts?raw';
import calendarDisabledNavigationsSrc from '!./examples/calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.component.ts?raw';
import calendarDisabledNavigationsHtml from '!./examples/calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.html?raw';
import calendarGridHtml from '!./examples/calendar-grid-example/calendar-grid-example.component.html?raw';
import calendarSingleSrc from '!./examples/calendar-single-example.component.ts?raw';
import calendarMondayStartSrc from '!./examples/calendar-monday-start-example.component.ts?raw';
import calendarIntlSrc from '!./examples/calendar-i18n-example.component.ts?raw';
import calendarIntlMomentSrc from '!./examples/calendar--i18n-moment-example.component.ts?raw';
import calendarMobileSrc from '!./examples/calendar-mobile-example/calendar-mobile-example.component.ts?raw';
import calendarMobileHtml from '!./examples/calendar-mobile-example/calendar-mobile-example.component.html?raw';
import calendarFormSourceT from '!./examples/calendar-form-example/calendar-form-example.component.ts?raw';
import calendarFormSourceH from '!./examples/calendar-form-example/calendar-form-example.component.html?raw';
import calendarFormSourceScss from '!./examples/calendar-form-example/calendar-form-example.component.scss?raw';
import calendarProgrammaticallySource from '!./examples/calendar-programmatically-change-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html'
})
export class CalendarDocsComponent {
    exampleFunctionsHtml = `Example Disable, Block Functions:

// Disable the weekends
myDisableFunction = function (d: FdDate): boolean {
    let day = d.getDay();
    return day === 6 || day === 0;
};

// Disable any weekday (Monday)
myDisableFunction2 = function(d: FdDate): boolean {
    let day = d.getDay();
    return day === 1;
};

// Disable past selection
myDisableFunction = function(d: FdDate): boolean {
    let today = FdDate.getToday();
    today.setHours(0,0,0,0);
    return d.getTimeStamp() < today.getTimeStamp();
};

// Disable future selection
myDisableFunction = function(d: FdDate): boolean {
    let today = FdDate.getToday();
    today.setHours(0,0,0,0);
    return d.getTimeStamp() > today.getTimeStamp()
};

// Disable days before a particular day
myDisableFunction = function(d: FdDate): boolean {
    let day = new FdDate(2018, 9, 15);
    return d.getTimeStamp() < day.getTimeStamp();
};

// Disable days after a particular day
myDisableFunction = function(d: FdDate): boolean {
    let day = new FdDate(2018, 9, 5);
    return d.getTimeStamp() > day.getTimeStamp()
};

// Disable days within a range
myDisableFunction = function(d: FdDate): boolean {
    let firstDay = new FdDate(2018, 7, 5);
    let lastDay = new FdDate(2018, 7, 20);
    return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp()
}`;

    exampleSpecialDays = `Example Special Days Functions:

// Mark weekends with special day number 10
specialDay: SpecialDayRule[] = [
    {
        specialDayNumber: 10,
        rule: fdDate => fdDate.getDay() === 7 || fdDate.getDay() === 1
    }
]


// Mark Monday with special day number 5
specialDay: SpecialDayRule[] = [
    {
        specialDayNumber: 5,
        rule: fdDate => fdDate.getDay() === 2
    }
]

// Mark Days inside a range with number 3 and all tuesdays with number 6
specialDay: SpecialDayRule[] = [
    {
        specialDayNumber: 3,
        rule: fdDate => {
            let firstDay = new FdDate(2018, 7, 5);
            let lastDay = new FdDate(2018, 7, 20);
            return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp()
        },
    },
    {
        specialDayNumber: 6,
        rule: fdDate => fdDate.getDay() === 3
    }
]`;

    calendarSingleSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: this.exampleFunctionsHtml,
            component: 'CalendarSingleExampleComponent',
            fileName: 'calendar-single-example',
            name: 'Example Block/Disable Functions'
        },
        {
            component: 'CalendarSingleExampleComponent',
            language: 'typescript',
            fileName: 'calendar-single-example',
            code: calendarSingleSrc
        }
    ];

    calendarRangeSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarRangeExampleComponent',
            fileName: 'calendar-range-example',
            code: calendarRangeSrc
        }
    ];

    calendarMobileSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMobileExampleComponent',
            fileName: 'calendar-mobile-example',
            code: calendarMobileSrc
        },
        {
            language: 'html',
            component: 'CalendarMobileExampleComponent',
            fileName: 'calendar-mobile-example',
            code: calendarMobileHtml
        }
    ];

    calendarGridSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarGridExampleComponent',
            fileName: 'calendar-grid-example',
            code: calendarGridSrc
        },
        {
            language: 'html',
            component: 'CalendarGridExampleComponent',
            fileName: 'calendar-grid-example',
            code: calendarGridHtml
        }
    ];

    calendarDisabledNavigationButtons: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarDisabledNavigationButtonsExampleComponent',
            fileName: 'calendar-disabled-navigation-buttons-example',
            code: calendarDisabledNavigationsSrc
        },
        {
            language: 'html',
            component: 'CalendarDisabledNavigationButtonsExampleComponent',
            fileName: 'calendar-disabled-navigation-buttons-example',
            code: calendarDisabledNavigationsHtml
        }
    ];

    calendarSpecialDays: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarSpecialDayExampleComponent',
            fileName: 'calendar-special-day-example',
            code: this.exampleSpecialDays,
            name: 'Example Special Day Functions'
        },
        {
            language: 'typescript',
            component: 'CalendarSpecialDayExampleComponent',
            fileName: 'calendar-special-day-example',
            code: calendarSpecialSrc
        },
        {
            language: 'html',
            component: 'CalendarSpecialDayExampleComponent',
            fileName: 'calendar-special-day-example',
            code: calendarSpecialHtml
        }
    ];

    calendarOptionsSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarOptionsExampleComponent',
            fileName: 'calendar-options-example',
            code: calendarOptionSrc
        },
        {
            language: 'html',
            component: 'CalendarOptionsExampleComponent',
            fileName: 'calendar-options-example',
            code: calendarOptionHtml
        }
    ];

    calendarMarkHoverSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMarkHoverComponent',
            fileName: 'calendar-mark-hover',
            code: calendarMarkHoverSrc
        },
        {
            language: 'html',
            component: 'CalendarMarkHoverComponent',
            fileName: 'calendar-mark-hover',
            code: calendarMarkHoverHtml
        }
    ];

    calendarMondayStartSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMondayStartExampleComponent',
            fileName: 'calendar-monday-start-example',
            code: calendarMondayStartSrc
        }
    ];

    calendari18n: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarI18nExampleComponent',
            fileName: 'calendar-i18n-example',
            code: calendarIntlSrc
        }
    ];

    calendari18nMoment: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarI18nMomentExampleComponent',
            fileName: 'calendar-i18n-moment-example',
            code: calendarIntlMomentSrc
        }
    ];

    calendarFormSource: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'calendar-form-example',
            code: calendarFormSourceH,
            scssFileCode: calendarFormSourceScss
        },
        {
            language: 'typescript',
            fileName: 'calendar-form-example',
            code: calendarFormSourceT,
            component: 'CalendarFormExamplesComponent'
        }
    ];

    calendarProgrammaticallySource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarProgrammaticallyChangeExampleComponent',
            fileName: 'calendar-programmatically-change-example',
            code: calendarProgrammaticallySource
        }
    ];
}
