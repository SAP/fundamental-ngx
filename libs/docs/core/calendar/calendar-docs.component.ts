import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const calendarFormSourceScss = 'calendar-form-example/calendar-form-example.component.scss';

const calendarRangeSrc = 'calendar-range-example.component.ts';
const calendarOptionHtml = 'calendar-options-example/calendar-options-example.component.html';
const calendarOptionSrc = 'calendar-options-example/calendar-options-example.component.ts';
const calendarMarkHoverSrc = 'calendar-mark-hover/calendar-mark-hover.component.ts';
const calendarMarkHoverHtml = 'calendar-mark-hover/calendar-mark-hover.component.html';
const calendarSpecialSrc = 'calendar-special-day-example/calendar-special-day-example.component.ts';
const calendarSpecialHtml = 'calendar-special-day-example/calendar-special-day-example.component.html';
const calendarGridSrc = 'calendar-grid-example/calendar-grid-example.component.ts';
const calendarDisabledNavigationsSrc =
    'calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.component.ts';
const calendarDisabledNavigationsHtml =
    'calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.html';
const calendarGridHtml = 'calendar-grid-example/calendar-grid-example.component.html';
const calendarSingleSrc = 'calendar-single-example.component.ts';
const calendarMondayStartSrc = 'calendar-monday-start-example.component.ts';
const calendarIntlSrc = 'calendar-i18n-example.component.ts';
const calendarIntlMomentSrc = 'calendar--i18n-moment-example.component.ts';
const calendarMobileSrc = 'calendar-mobile-example/calendar-mobile-example.component.ts';
const calendarMobileHtml = 'calendar-mobile-example/calendar-mobile-example.component.html';
const calendarFormSourceT = 'calendar-form-example/calendar-form-example.component.ts';
const calendarFormSourceH = 'calendar-form-example/calendar-form-example.component.html';
const calendarProgrammaticallySource = 'calendar-programmatically-change-example.component.ts';

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
            code: getAssetFromModuleAssets(calendarSingleSrc)
        }
    ];

    calendarRangeSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarRangeExampleComponent',
            fileName: 'calendar-range-example',
            code: getAssetFromModuleAssets(calendarRangeSrc)
        }
    ];

    calendarMobileSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMobileExampleComponent',
            fileName: 'calendar-mobile-example',
            code: getAssetFromModuleAssets(calendarMobileSrc)
        },
        {
            language: 'html',
            component: 'CalendarMobileExampleComponent',
            fileName: 'calendar-mobile-example',
            code: getAssetFromModuleAssets(calendarMobileHtml)
        }
    ];

    calendarGridSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarGridExampleComponent',
            fileName: 'calendar-grid-example',
            code: getAssetFromModuleAssets(calendarGridSrc)
        },
        {
            language: 'html',
            component: 'CalendarGridExampleComponent',
            fileName: 'calendar-grid-example',
            code: getAssetFromModuleAssets(calendarGridHtml)
        }
    ];

    calendarDisabledNavigationButtons: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarDisabledNavigationButtonsExampleComponent',
            fileName: 'calendar-disabled-navigation-buttons-example',
            code: getAssetFromModuleAssets(calendarDisabledNavigationsSrc)
        },
        {
            language: 'html',
            component: 'CalendarDisabledNavigationButtonsExampleComponent',
            fileName: 'calendar-disabled-navigation-buttons-example',
            code: getAssetFromModuleAssets(calendarDisabledNavigationsHtml)
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
            code: getAssetFromModuleAssets(calendarSpecialSrc)
        },
        {
            language: 'html',
            component: 'CalendarSpecialDayExampleComponent',
            fileName: 'calendar-special-day-example',
            code: getAssetFromModuleAssets(calendarSpecialHtml)
        }
    ];

    calendarOptionsSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarOptionsExampleComponent',
            fileName: 'calendar-options-example',
            code: getAssetFromModuleAssets(calendarOptionSrc)
        },
        {
            language: 'html',
            component: 'CalendarOptionsExampleComponent',
            fileName: 'calendar-options-example',
            code: getAssetFromModuleAssets(calendarOptionHtml)
        }
    ];

    calendarMarkHoverSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMarkHoverComponent',
            fileName: 'calendar-mark-hover',
            code: getAssetFromModuleAssets(calendarMarkHoverSrc)
        },
        {
            language: 'html',
            component: 'CalendarMarkHoverComponent',
            fileName: 'calendar-mark-hover',
            code: getAssetFromModuleAssets(calendarMarkHoverHtml)
        }
    ];

    calendarMondayStartSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMondayStartExampleComponent',
            fileName: 'calendar-monday-start-example',
            code: getAssetFromModuleAssets(calendarMondayStartSrc)
        }
    ];

    calendari18n: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarI18nExampleComponent',
            fileName: 'calendar-i18n-example',
            code: getAssetFromModuleAssets(calendarIntlSrc)
        }
    ];

    calendari18nMoment: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarI18nMomentExampleComponent',
            fileName: 'calendar-i18n-moment-example',
            code: getAssetFromModuleAssets(calendarIntlMomentSrc)
        }
    ];

    calendarFormSource: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'calendar-form-example',
            code: getAssetFromModuleAssets(calendarFormSourceH),
            scssFileCode: getAssetFromModuleAssets(calendarFormSourceScss)
        },
        {
            language: 'typescript',
            fileName: 'calendar-form-example',
            code: getAssetFromModuleAssets(calendarFormSourceT),
            component: 'CalendarFormExamplesComponent'
        }
    ];

    calendarProgrammaticallySource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarProgrammaticallyChangeExampleComponent',
            fileName: 'calendar-programmatically-change-example',
            code: getAssetFromModuleAssets(calendarProgrammaticallySource)
        }
    ];
}
