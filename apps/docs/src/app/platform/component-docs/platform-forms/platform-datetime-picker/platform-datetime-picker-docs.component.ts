import { Component } from '@angular/core';
import datetimePickerBasicHtml from '!./platform-datetime-picker-examples/platform-datetime-picker-basic-example.component.html?raw';
import datetimePickerBasicTs from '!./platform-datetime-picker-examples/platform-datetime-picker-basic-example.component.ts?raw';
import datetimePickerDisableFunctionHtml from '!./platform-datetime-picker-examples/platform-datetime-picker-disable-function-example.component.html?raw';
import datetimePickerDisableFunctionTs from '!./platform-datetime-picker-examples/platform-datetime-picker-disable-function-example.component.ts?raw';
import datetimePickerReactiveHtml from '!./platform-datetime-picker-examples/platform-datetime-picker-reactive-example.component.html?raw';
import datetimePickerReactiveTs from '!./platform-datetime-picker-examples/platform-datetime-picker-reactive-example.component.ts?raw';
import datetimePickerTemplateHtml from '!./platform-datetime-picker-examples/platform-datetime-picker-template-example.component.html?raw';
import datetimePickerTemplateTs from '!./platform-datetime-picker-examples/platform-datetime-picker-template-example.component.ts?raw';
import datetimePickerUpdateOnBlurTs from '!./platform-datetime-picker-examples/platform-datetime-picker-update-on-blur-example.component.ts?raw';

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

    dateTimePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            code: datetimePickerUpdateOnBlurTs,
            fileName: 'platform-datetime-picker-update-on-blur-example',
            component: 'PlatformDatetimePickerUpdateOnBlurExampleComponent'
        }
    ];
}
