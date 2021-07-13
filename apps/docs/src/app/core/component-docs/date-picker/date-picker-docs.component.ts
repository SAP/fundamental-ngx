import { Component } from '@angular/core';

import * as datePickerRangeSrc from '!raw-loader!./examples/date-picker-range-example.component.ts';
import * as datePickerSingleSrc from '!raw-loader!./examples/date-picker-single-example.component.ts';
import * as datePickeri18nSrc from '!raw-loader!./examples/date-picker-i18n-example.component.ts';
import * as datePickerFormatSrc from '!raw-loader!./examples/date-picker-format-example.component.ts';
import * as datePickerAllowNullSrc from '!raw-loader!./examples/date-picker-allow-null-example.component.ts';
import * as datePickerFormTsSrc from '!raw-loader!./examples/date-picker-form-example.component.ts';
import * as datePickerRangeFormTsSrc from '!raw-loader!./examples/date-picker-form-range-example.component.ts';
import * as datePickerPositionSrc from '!raw-loader!./examples/date-picker-position-example.component.ts';
import * as datePickerComplexI18nSrcTs from '!raw-loader!./examples/date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.ts';
import * as datePickerComplexI18nSrcH from '!raw-loader!./examples/date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.html';
import * as datePickerRangeDisableTs from '!raw-loader!./examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component.ts';
import * as datePickerRangeDisableH from '!raw-loader!./examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component.html';
import * as datePickerSingleDisableTs from '!raw-loader!./examples/date-picker-disable-func-example/date-picker-disable-func-example.component.ts';
import * as datePickerSingleDisableH from '!raw-loader!./examples/date-picker-disable-func-example/date-picker-disable-func-example.component.html';
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
}
