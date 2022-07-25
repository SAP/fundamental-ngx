import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import timePickerSrc from '!./examples/time-picker-example.component.html?raw';
import timePickerFormatSrc from '!./examples/time-picker-format-example.component.html?raw';
import timePickerFormatSrcTs from '!./examples/time-picker-format-example.component.ts?raw';
import timePickerDisabledSrc from '!./examples/time-picker-disabled-example.component.html?raw';
import timePickerCompactSrc from '!./examples/time-picker-compact-example.component.html?raw';
import timePickerNullSrc from '!./examples/time-picker-allow-null-example.component.html?raw';
import timePickerSrcTs from '!./examples/time-picker-example.component.ts?raw';
import timePickerDisabledSrcTs from '!./examples/time-picker-disabled-example.component.ts?raw';
import timePickerCompactSrcTs from '!./examples/time-picker-compact-example.component.ts?raw';
import timePickerNullSrcTs from '!./examples/time-picker-allow-null-example.component.ts?raw';
import timePickerLocaleHtmlSrc from '!./examples/time-picker-locale-example/time-picker-locale-example.component.html?raw';
import timePickerLocaleTsSrc from '!./examples/time-picker-locale-example/time-picker-locale-example.component.ts?raw';
import timePickerFormHtmlSrc from '!./examples/time-picker-form-example.component.html?raw';
import timePickerFormTsSrc from '!./examples/time-picker-form-example.component.ts?raw';
import timePickerFormScssSrc from '!./examples/time-picker-form-example.component.scss?raw';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker-docs.component.html'
})
export class TimePickerDocsComponent {
    defaultTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerSrc,
            typescriptFileCode: timePickerSrcTs,
            fileName: 'time-picker-example',
            component: 'TimePickerExampleComponent'
        }
    ];

    formatTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerFormatSrc,
            fileName: 'time-picker-format-example'
        },
        {
            language: 'typescript',
            code: timePickerFormatSrcTs,
            fileName: 'time-picker-format-example',
            component: 'TimePickerFormatExampleComponent'
        }
    ];

    disabledTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerDisabledSrc,
            typescriptFileCode: timePickerDisabledSrcTs,
            fileName: 'time-picker-disabled-example',
            component: 'TimePickerDisabledExampleComponent'
        }
    ];

    compactTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerCompactSrc,
            typescriptFileCode: timePickerCompactSrcTs,
            fileName: 'time-picker-compact-example',
            component: 'TimePickerCompactExampleComponent'
        }
    ];

    nullTimePicker: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerNullSrc,
            typescriptFileCode: timePickerNullSrcTs,
            fileName: 'time-picker-allow-null-example',
            component: 'TimePickerAllowNullExampleComponent'
        }
    ];

    timePickerForm: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerFormHtmlSrc,
            fileName: 'time-picker-form-example',
            scssFileCode: timePickerFormScssSrc
        },
        {
            language: 'typescript',
            code: timePickerFormTsSrc,
            fileName: 'time-picker-form-example',
            component: 'TimePickerFormExampleComponent'
        }
    ];

    timePickerLocale: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerLocaleHtmlSrc,
            fileName: 'time-picker-locale-example'
        },
        {
            language: 'typescript',
            code: timePickerLocaleTsSrc,
            fileName: 'time-picker-locale-example',
            component: 'TimePickerLocaleExampleComponent'
        }
    ];
}
