import { Component } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import timePickerBasicHtml from '!./examples/platform-time-picker-basic-example.component.html?raw';
import timePickerBasicTs from '!./examples/platform-time-picker-basic-example.component.ts?raw';
import timePickerReactiveHtml from '!./examples/platform-time-picker-reactive-example.component.html?raw';
import timePickerReactiveTs from '!./examples/platform-time-picker-reactive-example.component.ts?raw';
import timePickerTemplateHtml from '!./examples/platform-time-picker-template-example.component.html?raw';
import timePickerTemplateTs from '!./examples/platform-time-picker-template-example.component.ts?raw';

@Component({
    selector: 'app-time-picker',
    templateUrl: './platform-time-picker-docs.component.html'
})
export class PlatformTimePickerDocsComponent {
    timePickerBasic: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerBasicHtml,
            fileName: 'platform-time-picker-basic-example'
        },
        {
            language: 'typescript',
            code: timePickerBasicTs,
            fileName: 'platform-time-picker-basic-example',
            component: 'PlatformTimePickerBasicExampleComponent'
        }
    ];

    timePickerReactive: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerReactiveHtml,
            fileName: 'platform-time-picker-reactive-example'
        },
        {
            language: 'typescript',
            code: timePickerReactiveTs,
            fileName: 'platform-time-picker-reactive-example',
            component: 'PlatformTimePickerReactiveExampleComponent'
        }
    ];

    timePickerTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: timePickerTemplateHtml,
            fileName: 'platform-time-picker-template-example'
        },
        {
            language: 'typescript',
            code: timePickerTemplateTs,
            fileName: 'platform-time-picker-template-example',
            component: 'PlatformTimePickerTemplateExampleComponent'
        }
    ];
}
