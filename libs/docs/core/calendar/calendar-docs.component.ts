import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CalendarDisabledNavigationButtonsExampleComponent } from './examples/calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.component';
import { CalendarFormExamplesComponent } from './examples/calendar-form-example/calendar-form-example.component';
import { CalendarGridExampleComponent } from './examples/calendar-grid-example/calendar-grid-example.component';
import { CalendarI18nExampleComponent } from './examples/calendar-i18n-example.component';
import { CalendarLegendExampleComponent } from './examples/calendar-legend-example/calendar-legend-example.component';
import { CalendarMarkHoverComponent } from './examples/calendar-mark-hover/calendar-mark-hover.component';
import { CalendarMobileExampleComponent } from './examples/calendar-mobile-example/calendar-mobile-example.component';
import { CalendarMondayStartExampleComponent } from './examples/calendar-monday-start-example.component';
import { CalendarMultiExampleComponent } from './examples/calendar-multi-example.component';
import { CalendarMultiRangeExampleComponent } from './examples/calendar-multi-range-example.component';
import { CalendarOptionsExampleComponent } from './examples/calendar-options-example/calendar-options-example.component';
import { CalendarProgrammaticallyChangeExampleComponent } from './examples/calendar-programmatically-change-example.component';
import { CalendarRangeExampleComponent } from './examples/calendar-range-example.component';
import { CalendarSingleExampleComponent } from './examples/calendar-single-example.component';
import { CalendarSpecialDayExampleComponent } from './examples/calendar-special-day-example/calendar-special-day-example.component';

const calendarFormSourceScss = 'calendar-form-example/calendar-form-example.component.scss';

const calendarRangeSrc = 'calendar-range-example.component.ts';
const calendarMultiRangeSrc = 'calendar-multi-range-example.component.ts';
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
    'calendar-disabled-navigation-buttons-example/calendar-disabled-navigation-buttons-example.component.html';
const calendarGridHtml = 'calendar-grid-example/calendar-grid-example.component.html';
const calendarSingleSrc = 'calendar-single-example.component.ts';
const calendarMultiSrc = 'calendar-multi-example.component.ts';
const calendarMondayStartSrc = 'calendar-monday-start-example.component.ts';
const calendarIntlSrc = 'calendar-i18n-example.component.ts';
const calendarIntlMomentSrc = 'calendar--i18n-moment-example.component.ts';
const calendarMobileSrc = 'calendar-mobile-example/calendar-mobile-example.component.ts';
const calendarMobileHtml = 'calendar-mobile-example/calendar-mobile-example.component.html';
const calendarFormSourceT = 'calendar-form-example/calendar-form-example.component.ts';
const calendarFormSourceH = 'calendar-form-example/calendar-form-example.component.html';
const calendarProgrammaticallySource = 'calendar-programmatically-change-example.component.ts';
const calendarLegendSource = 'calendar-legend-example/calendar-legend-example.component.ts';
const calendarLegendSourceHtml = 'calendar-legend-example/calendar-legend-example.component.html';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CalendarSingleExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        LinkComponent,
        RouterLink,
        CalendarMobileExampleComponent,
        CalendarOptionsExampleComponent,
        CalendarMarkHoverComponent,
        CalendarSpecialDayExampleComponent,
        CalendarGridExampleComponent,
        CalendarRangeExampleComponent,
        CalendarProgrammaticallyChangeExampleComponent,
        CalendarMondayStartExampleComponent,
        CalendarI18nExampleComponent,
        CalendarFormExamplesComponent,
        CalendarDisabledNavigationButtonsExampleComponent,
        CalendarMultiExampleComponent,
        CalendarMultiRangeExampleComponent,
        CalendarLegendExampleComponent
    ]
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

    calendarMultiSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: this.exampleFunctionsHtml,
            component: 'CalendarMultiExampleComponent',
            fileName: 'calendar-multi-example',
            name: 'Example Block/Disable Functions'
        },
        {
            component: 'CalendarMultiExampleComponent',
            language: 'typescript',
            fileName: 'calendar-multi-example',
            code: getAssetFromModuleAssets(calendarMultiSrc)
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

    calendarMultiRangeSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarMultiRangeExampleComponent',
            fileName: 'calendar-multi-range-example',
            code: getAssetFromModuleAssets(calendarMultiRangeSrc)
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

    calendarLegendSource: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'CalendarLegendExampleComponent',
            fileName: 'calendar-legend-example',
            code: getAssetFromModuleAssets(calendarLegendSource)
        },
        {
            language: 'html',
            component: 'CalendarLegendExampleComponent',
            fileName: 'calendar-legend-example',
            code: getAssetFromModuleAssets(calendarLegendSourceHtml)
        }
    ];
}
