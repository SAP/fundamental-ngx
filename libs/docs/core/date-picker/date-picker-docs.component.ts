import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DatePickerAllowNullExampleComponent } from './examples/date-picker-allow-null-example.component';
import { DatePickerDisableFocusScrollExampleComponent } from './examples/date-picker-disable-focus-scroll-example.component';
import { DatePickerDisableFuncExampleComponent } from './examples/date-picker-disable-func-example/date-picker-disable-func-example.component';
import { DatePickerDisabledExampleComponent } from './examples/date-picker-disabled-example.component';
import { DatePickerFormExampleComponent } from './examples/date-picker-form-example.component';
import { DatePickerFormMultiExampleComponent } from './examples/date-picker-form-multi-example.component';
import { DatePickerFormMultiRangeExampleComponent } from './examples/date-picker-form-multi-range-example.component';
import { DatePickerFormRangeExampleComponent } from './examples/date-picker-form-range-example.component';
import { DatePickerFormatExampleComponent } from './examples/date-picker-format-example.component';
import { DatePickerI18nExampleComponent } from './examples/date-picker-i18n-example.component';
import { DatePickerLegendExample } from './examples/date-picker-legend-example';
import { DatePickerMultiDisableFuncExampleComponent } from './examples/date-picker-multi-disable-func-example.component';
import { DatePickerMultiExampleComponent } from './examples/date-picker-multi-example.component';
import { DatePickerMultiRangeExampleComponent } from './examples/date-picker-multi-range-example.component';
import { DatePickerPositionExampleComponent } from './examples/date-picker-position-example.component';
import { DatePickerRangeDisabledExampleComponent } from './examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component';
import { DatePickerRangeExampleComponent } from './examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from './examples/date-picker-single-example.component';
import { DatePickerSpecialDayExampleComponent } from './examples/date-picker-special-day-example/date-picker-special-day-example.component';
import { DatePickerTodayButtonExampleComponent } from './examples/date-picker-today-button-example.component';
import { DatePickerUpdateOnBlurExampleComponent } from './examples/date-picker-update-on-blur-example.component';
import { DatePickerMobileModeExampleComponent } from './examples/mobile-mode/date-picker-mobile-mode-example.component';

const datePickerRangeSrc = 'date-picker-range-example.component.ts';
const datePickerMultiRangeSrc = 'date-picker-multi-range-example.component.ts';
const datePickerSingleSrc = 'date-picker-single-example.component.ts';
const datePickerMultiSrc = 'date-picker-multi-example.component.ts';
const datePickeri18nSrc = 'date-picker-i18n-example.component.ts';
const datePickerTodayButton = 'date-picker-today-button-example.component.ts';
const datePickerFormatSrc = 'date-picker-format-example.component.ts';
const datePickerAllowNullSrc = 'date-picker-allow-null-example.component.ts';
const datePickerFormTsSrc = 'date-picker-form-example.component.ts';
const datePickerFormMultiTsSrc = 'date-picker-form-multi-example.component.ts';
const datePickerRangeFormTsSrc = 'date-picker-form-range-example.component.ts';
const datePickerMultiRangeFormTsSrc = 'date-picker-form-multi-range-example.component.ts';
const datePickerPositionSrc = 'date-picker-position-example.component.ts';
const datePickerComplexI18nSrcTs = 'date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.ts';
const datePickerComplexI18nSrcH = 'date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.html';
const datePickerRangeDisableTs = 'date-picker-range-disabled-example/date-picker-range-disabled-example.component.ts';
const datePickerRangeDisableH = 'date-picker-range-disabled-example/date-picker-range-disabled-example.component.html';
const datePickerSingleDisableTs = 'date-picker-disable-func-example/date-picker-disable-func-example.component.ts';
const datePickerMultiDisableTs = 'date-picker-multi-disable-func-example.component.ts';
const datePickerSingleDisableH = 'date-picker-disable-func-example/date-picker-disable-func-example.component.html';
const datePickerUpdateOnBlurSrcTs = 'date-picker-update-on-blur-example.component.ts';
const datePickerDisableScrollSrcTs = 'date-picker-disable-focus-scroll-example.component.ts';

const datePickerWithSpecialDaysRuleHtml =
    'date-picker-special-day-example/date-picker-special-day-example.component.html';
const datePickerWithSpecialDaysRuleTs = 'date-picker-special-day-example/date-picker-special-day-example.component.ts';

const datePickerMobileTs = 'mobile-mode/date-picker-mobile-mode-example.component.ts';
const datePickerMobileH = 'mobile-mode/date-picker-mobile-mode-example.component.html';
const datePickerLegendExampleTs = 'date-picker-legend-example.ts';
const datePickerLegendExampleHtml = 'date-picker-legend-example.html';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DatePickerSingleExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DatePickerRangeExampleComponent,
        RouterLink,
        DatePickerI18nExampleComponent,
        DatePickerTodayButtonExampleComponent,
        DatePickerFormatExampleComponent,
        DatePickerAllowNullExampleComponent,
        DatePickerFormExampleComponent,
        DatePickerFormRangeExampleComponent,
        DatePickerDisableFuncExampleComponent,
        DatePickerUpdateOnBlurExampleComponent,
        DatePickerRangeDisabledExampleComponent,
        DatePickerPositionExampleComponent,
        DatePickerDisabledExampleComponent,
        DatePickerDisableFocusScrollExampleComponent,
        DatePickerMobileModeExampleComponent,
        DatePickerMultiExampleComponent,
        DatePickerFormMultiExampleComponent,
        DatePickerMultiDisableFuncExampleComponent,
        DatePickerMultiRangeExampleComponent,
        DatePickerFormMultiRangeExampleComponent,
        DatePickerSpecialDayExampleComponent,
        DatePickerLegendExample
    ]
})
export class DatePickerDocsComponent {
    datePickerSingle: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerSingleExampleComponent',
            code: getAssetFromModuleAssets(datePickerSingleSrc),
            fileName: 'date-picker-single-example'
        }
    ];

    datePickerMulti: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMultiExampleComponent',
            code: getAssetFromModuleAssets(datePickerMultiSrc),
            fileName: 'date-picker-multi-example'
        }
    ];

    datePickerRange: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeSrc),
            fileName: 'date-picker-range-example'
        }
    ];

    datePickerMultiRange: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMultiRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerMultiRangeSrc),
            fileName: 'date-picker-multi-range-example'
        }
    ];

    datePickerI18N: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerI18nExampleComponent',
            code: getAssetFromModuleAssets(datePickeri18nSrc),
            fileName: 'datepicker-i18n-example'
        }
    ];

    datePickerTodayButton: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerTodayButtonExampleComponent',
            code: getAssetFromModuleAssets(datePickerTodayButton),
            fileName: 'date-picker-today-button-example'
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormatExampleComponent',
            code: getAssetFromModuleAssets(datePickerFormatSrc),
            fileName: 'date-picker-format-example'
        }
    ];

    datePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerAllowNullExampleComponent',
            code: getAssetFromModuleAssets(datePickerAllowNullSrc),
            fileName: 'date-picker-allow-null-example'
        }
    ];

    datePickerForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormExampleComponent',
            code: getAssetFromModuleAssets(datePickerFormTsSrc),
            fileName: 'date-picker-form-example'
        }
    ];

    datePickerMultiForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormMultiExampleComponent',
            code: getAssetFromModuleAssets(datePickerFormMultiTsSrc),
            fileName: 'date-picker-form-multi-example'
        }
    ];

    datePickerRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeFormTsSrc),
            fileName: 'date-picker-form-range-example'
        }
    ];

    datePickerMultiRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormMultiRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerMultiRangeFormTsSrc),
            fileName: 'date-picker-form-multi-range-example'
        }
    ];

    datePickerPosition: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerPositionExampleComponent',
            code: getAssetFromModuleAssets(datePickerPositionSrc),
            fileName: 'date-picker-position-example'
        }
    ];

    datePickerDisabled: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerRangeDisabledExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeDisableTs),
            fileName: 'date-picker-range-disabled-example'
        },
        {
            language: 'html',
            component: 'DatePickerRangeDisabledExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeDisableH),
            fileName: 'date-picker-range-disabled-example'
        }
    ];

    datePickerSingleDisable: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerDisableFuncExampleComponent',
            code: getAssetFromModuleAssets(datePickerSingleDisableTs),
            fileName: 'date-picker-disable-func-example'
        },
        {
            language: 'html',
            component: 'DatePickerDisableFuncExampleComponent',
            code: getAssetFromModuleAssets(datePickerSingleDisableH),
            fileName: 'date-picker-disable-func-example'
        }
    ];

    datePickerMultiDisable: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMultiDisableFuncExampleComponent',
            code: getAssetFromModuleAssets(datePickerMultiDisableTs),
            fileName: 'date-picker-multi-disable-func-example'
        }
    ];

    datePickerComplexI18n: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerComplexI18nExampleComponent',
            code: getAssetFromModuleAssets(datePickerComplexI18nSrcTs),
            fileName: 'date-picker-complex-i18n-example'
        },
        {
            language: 'html',
            component: 'DatePickerComplexI18nExampleComponent',
            code: getAssetFromModuleAssets(datePickerComplexI18nSrcH),
            fileName: 'date-picker-complex-i18n-example'
        }
    ];

    datePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerUpdateOnBlurExampleComponent',
            code: getAssetFromModuleAssets(datePickerUpdateOnBlurSrcTs),
            fileName: 'date-picker-update-on-blur-example'
        }
    ];

    datePickerDisableScroll: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerDisableFocusScrollExampleComponent',
            code: getAssetFromModuleAssets(datePickerDisableScrollSrcTs),
            fileName: 'date-picker-disable-focus-scroll-example'
        }
    ];

    datePickerWithSpecialDaysRule: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerSpecialDayExampleComponent',
            code: getAssetFromModuleAssets(datePickerWithSpecialDaysRuleHtml),
            fileName: 'date-picker-special-day-example'
        },
        {
            language: 'html',
            component: 'DatePickerSpecialDayExampleComponent',
            code: getAssetFromModuleAssets(datePickerWithSpecialDaysRuleTs),
            fileName: 'date-picker-special-day-example'
        }
    ];

    datePickerMobile: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerMobileModeExampleComponent',
            code: getAssetFromModuleAssets(datePickerMobileTs),
            fileName: 'date-picker-mobile-mode-example'
        },
        {
            language: 'html',
            component: 'DatePickerMobileModeExampleComponent',
            code: getAssetFromModuleAssets(datePickerMobileH),
            fileName: 'date-picker-mobile-mode-example'
        }
    ];

    readonly legendExamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datePickerLegendExampleHtml),
            originalFileName: 'date-picker-page-example'
        },
        {
            language: 'typescript',
            component: 'DatePickerLegendExample',
            code: getAssetFromModuleAssets(datePickerLegendExampleTs),
            originalFileName: 'date-picker-legend-example'
        }
    ];
}
