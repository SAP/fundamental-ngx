import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const datePickerRangeSrc = 'date-picker-range-example.component.ts';
const datePickerSingleSrc = 'date-picker-single-example.component.ts';
const datePickeri18nSrc = 'date-picker-i18n-example.component.ts';
const datePickerTodayButton = 'date-picker-today-button-example.component.ts';
const datePickerFormatSrc = 'date-picker-format-example.component.ts';
const datePickerAllowNullSrc = 'date-picker-allow-null-example.component.ts';
const datePickerFormTsSrc = 'date-picker-form-example.component.ts';
const datePickerRangeFormTsSrc = 'date-picker-form-range-example.component.ts';
const datePickerPositionSrc = 'date-picker-position-example.component.ts';
const datePickerComplexI18nSrcTs = 'date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.ts';
const datePickerComplexI18nSrcH = 'date-picker-complex-i18n-example/date-picker-complex-i18n-example.component.html';
const datePickerRangeDisableTs = 'date-picker-range-disabled-example/date-picker-range-disabled-example.component.ts';
const datePickerRangeDisableH = 'date-picker-range-disabled-example/date-picker-range-disabled-example.component.html';
const datePickerSingleDisableTs = 'date-picker-disable-func-example/date-picker-disable-func-example.component.ts';
const datePickerSingleDisableH = 'date-picker-disable-func-example/date-picker-disable-func-example.component.html';
const datePickerUpdateOnBlurSrcTs = 'date-picker-update-on-blur-example.component.ts';
const datePickerDisableScrollSrcTs = 'date-picker-disable-focus-scroll-example.component.ts';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker-docs.component.html'
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

    datePickerRange: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeSrc),
            fileName: 'date-picker-range-example'
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

    datePickerRangeForm: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerFormRangeExampleComponent',
            code: getAssetFromModuleAssets(datePickerRangeFormTsSrc),
            fileName: 'date-picker-form-range-example'
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
}
