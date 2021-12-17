import { Component } from '@angular/core';

import datepickerHtml from '!./platform-date-picker-examples/platform-date-picker-example.component.html?raw';
import datepickerts from '!./platform-date-picker-examples/platform-date-picker-example.component?raw';
import datepickeri18nHtml from '!./platform-date-picker-examples/platform-date-picker-i18n-example.component.html?raw';
import datepickeri18nTs from '!./platform-date-picker-examples/platform-date-picker-i18n-example.component?raw';
import datepickerDisabledFnCodeTs from '!./platform-date-picker-examples/platform-date-picker-disable-func-example.component?raw';
import datepickerDisabledFnHtml from '!./platform-date-picker-examples/platform-date-picker-disable-func-example.component.html?raw';
import datepickerFormatTs from '!./platform-date-picker-examples/platform-date-picker-format-example.component?raw';
import datepickerFormatHtml from '!./platform-date-picker-examples/platform-date-picker-format-example.component.html?raw';

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
            language: 'html',
            code: datepickeri18nHtml,
            fileName: 'platform-date-picker-i18n-example'
        },
        {
            language: 'typescript',
            code: datepickeri18nTs,
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
            component: 'PlatformDatePickerDisableFuncExampleComponent'
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
        }
    ];
}
