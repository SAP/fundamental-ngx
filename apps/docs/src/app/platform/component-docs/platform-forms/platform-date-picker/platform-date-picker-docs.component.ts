import { Component } from '@angular/core';
import * as datepickerHtml from '!raw-loader!./platform-date-picker-examples/platform-date-picker-example.component.html';
import * as datepickerts from '!raw-loader!./platform-date-picker-examples/platform-date-picker-example.component.ts';
import * as datepickeri18n from '!raw-loader!./platform-date-picker-examples/platform-date-picker-i18n-example.component.ts';
import * as datepickerDisabledFnCodeTs from '!raw-loader!./platform-date-picker-examples/platform-date-picker-disable-func-example.component.ts';
import * as datepickerDisabledFnHtml from '!raw-loader!./platform-date-picker-examples/platform-date-picker-disable-func-example.component.html';
import * as datepickerFormatTs from '!raw-loader!./platform-date-picker-examples/platform-date-picker-format-example.component.ts';
import * as datepickerFormatHtml from '!raw-loader!./platform-date-picker-examples/platform-date-picker-format-example.component.html';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-datepicker',
    templateUrl: './platform-date-picker-docs.component.html'
})
export class PlatformDatePickerDocsComponent {
    datePickerExample: ExampleFile[] = [
        {
            language: 'html',
            code: datepickerHtml,
            fileName: 'platform-date-picker-example'
        },
        {
            language: 'typescript',
            code: datepickerts,
            fileName: 'platform-date-picker-example',
            component: 'PlatformDatePickerExampleComponent'
        }
    ];

    datePickeri18nExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickeri18n,
            fileName: 'platform-date-picker-i18n-example',
            component: 'PlatformDatePickeri18nExampleComponent'
        }
    ];

    datePickerDisableFunction: ExampleFile[] = [
        {
            language: 'html',
            code: datepickerDisabledFnHtml,
            fileName: 'platform-date-picker-disable-func-example'
        },
        {
            language: 'typescript',
            code: datepickerDisabledFnCodeTs,
            fileName: 'platform-date-picker-disable-func-example',
            component: 'DatePickerDisableFuncExampleComponent'
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickerFormatTs,
            fileName: 'platform-date-picker-format-example',
            component: 'PlatformDatePickerFormatExampleComponent'
        },
        {
            language: 'html',
            code: datepickerFormatHtml,
            fileName: 'platform-date-picker-format-example',
            component: 'PlatformDatePickerFormatExampleComponent'
        },
    ];
}
