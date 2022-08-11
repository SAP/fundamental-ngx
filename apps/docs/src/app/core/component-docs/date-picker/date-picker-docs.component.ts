import { Component } from '@angular/core';

import datePickerRangeSrc from '!./examples/date-picker-range-example.component.ts?raw';
import datePickerSingleSrc from '!./examples/date-picker-single-example.component.ts?raw';
import datePickeri18nSrc from '!./examples/date-picker-i18n-example.component.ts?raw';
import datePickerTodayButton from '!./examples/date-picker-today-button-example.component.ts?raw';
import datePickerFormatSrc from '!./examples/date-picker-format-example.component.ts?raw';
import datePickerAllowNullSrc from '!./examples/date-picker-allow-null-example.component.ts?raw';
import datePickerFormTsSrc from '!./examples/date-picker-form-example.component.ts?raw';
import datePickerRangeFormTsSrc from '!./examples/date-picker-form-range-example.component.ts?raw';
import datePickerPositionSrc from '!./examples/date-picker-position-example.component.ts?raw';
import datePickerComplexI18nSrcTs from '!./examples/date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.ts?raw';
import datePickerComplexI18nSrcH from '!./examples/date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.html?raw';
import datePickerRangeDisableTs from '!./examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component.ts?raw';
import datePickerRangeDisableH from '!./examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component.html?raw';
import datePickerSingleDisableTs from '!./examples/date-picker-disable-func-example/date-picker-disable-func-example.component.ts?raw';
import datePickerSingleDisableH from '!./examples/date-picker-disable-func-example/date-picker-disable-func-example.component.html?raw';
import datePickerUpdateOnBlurSrcTs from '!./examples/date-picker-update-on-blur-example.component.ts?raw';
import datePickerDisableScrollSrcTs from '!./examples/date-picker-disable-focus-scroll-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
})
export class DatePickerDocsComponent {
    datePickerSingle: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerSingleExampleComponent',
            code: datePickerSingleSrc,
            fileName: 'date-picker-single-example'
        }
    ];

    datePickerRange: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerRangeExampleComponent',
            code: datePickerRangeSrc,
            fileName: 'date-picker-range-example'
        }
    ];

    datePickerI18N: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerI18nExampleComponent',
            code: datePickeri18nSrc,
            fileName: 'datepicker-i18n-example'
        }
    ];

    datePickerTodayButton: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerTodayButtonExampleComponent',
            code: datePickerTodayButton,
            fileName: 'date-picker-today-button-example'
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormatExampleComponent',
            code: datePickerFormatSrc,
            fileName: 'date-picker-format-example'
        }
    ];

    datePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerAllowNullExampleComponent',
            code: datePickerAllowNullSrc,
            fileName: 'date-picker-allow-null-example'
        }
    ];

    datePickerForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormExampleComponent',
            code: datePickerFormTsSrc,
            fileName: 'date-picker-form-example'
        }
    ];

    datePickerRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormRangeExampleComponent',
            code: datePickerRangeFormTsSrc,
            fileName: 'date-picker-form-range-example'
        }
    ];

    datePickerPosition: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerPositionExampleComponent',
            code: datePickerPositionSrc,
            fileName: 'date-picker-position-example'
        }
    ];

    datePickerDisabled: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerRangeDisabledExampleComponent',
            code: datePickerRangeDisableTs,
            fileName: 'date-picker-range-disabled-example'
        },
        {
            language: 'html',
            component: 'DatePickerRangeDisabledExampleComponent',
            code: datePickerRangeDisableH,
            fileName: 'date-picker-range-disabled-example'
        }
    ];

    datePickerSingleDisable: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerDisableFuncExampleComponent',
            code: datePickerSingleDisableTs,
            fileName: 'date-picker-disable-func-example'
        },
        {
            language: 'html',
            component: 'DatePickerDisableFuncExampleComponent',
            code: datePickerSingleDisableH,
            fileName: 'date-picker-disable-func-example'
        }
    ];

    datePickerComplexI18n: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerComplexI18nExampleComponent',
            code: datePickerComplexI18nSrcTs,
            fileName: 'date-picker-complex-i18n-example'
        },
        {
            language: 'html',
            component: 'DatePickerComplexI18nExampleComponent',
            code: datePickerComplexI18nSrcH,
            fileName: 'date-picker-complex-i18n-example'
        }
    ];

    datePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerUpdateOnBlurExampleComponent',
            code: datePickerUpdateOnBlurSrcTs,
            fileName: 'date-picker-update-on-blur-example'
        }
    ];

    datePickerDisableScroll: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerDisableFocusScrollExampleComponent',
            code: datePickerDisableScrollSrcTs,
            fileName: 'date-picker-disable-focus-scroll-example'
        }
    ];
}
