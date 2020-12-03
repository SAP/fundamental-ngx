import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as timePickerSrc from '!raw-loader!./examples/time-picker-example.component.html';
import * as timePickerFormatSrc from '!raw-loader!./examples/time-picker-format-example.component.html';
import * as timePickerFormatSrcTs from '!raw-loader!./examples/time-picker-format-example.component.ts';
import * as timePickerDisabledSrc from '!raw-loader!./examples/time-picker-disabled-example.component.html';
import * as timePickerCompactSrc from '!raw-loader!./examples/time-picker-compact-example.component.html';
import * as timePickerNullSrc from '!raw-loader!./examples/time-picker-allow-null-example.component.html';
import * as timePickerSrcTs from '!raw-loader!./examples/time-picker-example.component.ts';
import * as timePickerDisabledSrcTs from '!raw-loader!./examples/time-picker-disabled-example.component.ts';
import * as timePickerCompactSrcTs from '!raw-loader!./examples/time-picker-compact-example.component.ts';
import * as timePickerNullSrcTs from '!raw-loader!./examples/time-picker-allow-null-example.component.ts';
import * as timePickerLocaleHtmlSrc from '!raw-loader!./examples/time-picker-locale-example/time-picker-locale-example.component.html';
import * as timePickerLocaleCsssSrc from '!raw-loader!./examples/time-picker-locale-example/time-picker-locale-example.component.scss';
import * as timePickerLocaleTsSrc from '!raw-loader!./examples/time-picker-locale-example/time-picker-locale-example.component.ts';
import * as timePickerFormHtmlSrc from '!raw-loader!./examples/time-picker-form-example.component.html';
import * as timePickerFormTsSrc from '!raw-loader!./examples/time-picker-form-example.component.ts';
import * as timePickerFormScssSrc from '!raw-loader!./examples/time-picker-form-example.component.scss';

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
            fileName: 'time-picker-locale-example',
            scssFileCode: timePickerLocaleCsssSrc
        },
        {
            language: 'typescript',
            code: timePickerLocaleTsSrc,
            fileName: 'time-picker-locale-example',
            component: 'TimePickerLocaleExampleComponent'
        }
    ];
}
