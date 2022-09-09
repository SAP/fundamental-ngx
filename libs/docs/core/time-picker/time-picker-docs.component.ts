import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const timePickerFormScssSrc = 'time-picker-form-example.component.scss';

const timePickerSrc = 'time-picker-example.component.html';
const timePickerFormatSrc = 'time-picker-format-example.component.html';
const timePickerFormatSrcTs = 'time-picker-format-example.component.ts';
const timePickerDisabledSrc = 'time-picker-disabled-example.component.html';
const timePickerCompactSrc = 'time-picker-compact-example.component.html';
const timePickerNullSrc = 'time-picker-allow-null-example.component.html';
const timePickerSrcTs = 'time-picker-example.component.ts';
const timePickerDisabledSrcTs = 'time-picker-disabled-example.component.ts';
const timePickerCompactSrcTs = 'time-picker-compact-example.component.ts';
const timePickerNullSrcTs = 'time-picker-allow-null-example.component.ts';
const timePickerLocaleHtmlSrc = 'time-picker-locale-example/time-picker-locale-example.component.html';
const timePickerLocaleTsSrc = 'time-picker-locale-example/time-picker-locale-example.component.ts';
const timePickerFormHtmlSrc = 'time-picker-form-example.component.html';
const timePickerFormTsSrc = 'time-picker-form-example.component.ts';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    defaultTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerSrcTs),
            fileName: 'time-picker-example',
            component: 'TimePickerExampleComponent'
        }
    ];

    formatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerFormatSrc),
            fileName: 'time-picker-format-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerFormatSrcTs),
            fileName: 'time-picker-format-example',
            component: 'TimePickerFormatExampleComponent'
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerDisabledSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerDisabledSrcTs),
            fileName: 'time-picker-disabled-example',
            component: 'TimePickerDisabledExampleComponent'
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerCompactSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerCompactSrcTs),
            fileName: 'time-picker-compact-example',
            component: 'TimePickerCompactExampleComponent'
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerNullSrc),
            typescriptFileCode: getAssetFromModuleAssets(timePickerNullSrcTs),
            fileName: 'time-picker-allow-null-example',
            component: 'TimePickerAllowNullExampleComponent'
        }
    ];

    timePickerForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerFormHtmlSrc),
            fileName: 'time-picker-form-example',
            scssFileCode: getAssetFromModuleAssets(timePickerFormScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerFormTsSrc),
            fileName: 'time-picker-form-example',
            component: 'TimePickerFormExampleComponent'
        }
    ];

    timePickerLocale: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerLocaleHtmlSrc),
            fileName: 'time-picker-locale-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerLocaleTsSrc),
            fileName: 'time-picker-locale-example',
            component: 'TimePickerLocaleExampleComponent'
        }
    ];
}
