import { Component } from '@angular/core';
import * as datetimePickerBasicHtml from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-basic-example.component.html';
import * as datetimePickerBasicTs from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-basic-example.component.ts';
import * as datetimePickerDisableFunctionHtml from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-disable-function-example.component.html';
import * as datetimePickerDisableFunctionTs from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-disable-function-example.component.ts';
import * as datetimePickerReactiveHtml from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-reactive-example.component.html';
import * as datetimePickerReactiveTs from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-reactive-example.component.ts';
import * as datetimePickerTemplateHtml from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-template-example.component.html';
import * as datetimePickerTemplateTs from '!raw-loader!./platform-datetime-picker-examples/platform-datetime-picker-template-example.component.ts';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-datetime-picker',
    templateUrl: './platform-datetime-picker-docs.component.html'
})
export class PlatformDatetimePickerDocsComponent {
    datetimePickerBasic: ExampleFile[] = [
        {
            language: 'html',
            code: datetimePickerBasicHtml,
            fileName: 'platform-datetime-picker-basic-example'
        },
        {
            language: 'typescript',
            code: datetimePickerBasicTs,
            fileName: 'platform-datetime-picker-basic-example',
            component: 'PlatformDatetimePickerBasicExampleComponent'
        }
    ];

    datetimePickerReactive: ExampleFile[] = [
        {
            language: 'html',
            code: datetimePickerReactiveHtml,
            fileName: 'platform-datetime-picker-reactive-example'
        },
        {
            language: 'typescript',
            code: datetimePickerReactiveTs,
            fileName: 'platform-datetime-picker-reactive-example',
            component: 'PlatformDatetimePickerReactiveExampleComponent'
        }
    ];

    datetimePickerTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: datetimePickerTemplateHtml,
            fileName: 'platform-datetime-picker-template-example'
        },
        {
            language: 'typescript',
            code: datetimePickerTemplateTs,
            fileName: 'platform-datetime-picker-template-example',
            component: 'PlatformDatetimePickerTemplateExampleComponent'
        }
    ];

    datetimePickerDisableFunction: ExampleFile[] = [
        {
            language: 'html',
            code: datetimePickerDisableFunctionHtml,
            fileName: 'platform-datetime-picker-disable-function-example'
        },
        {
            language: 'typescript',
            code: datetimePickerDisableFunctionTs,
            fileName: 'platform-datetime-picker-disable-function-example',
            component: 'PlatformDatetimePickerDisableFunctionExampleComponent'
        }
    ];
}
