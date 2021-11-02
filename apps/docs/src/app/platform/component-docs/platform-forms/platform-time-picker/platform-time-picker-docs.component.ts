import { Component } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import * as timePickerBasicHtml from '!raw-loader!./examples/platform-time-picker-basic-example.component.html';
import * as timePickerBasicTs from '!raw-loader!./examples/platform-time-picker-basic-example.component.ts';
import * as timePickerReactiveHtml from '!raw-loader!./examples/platform-time-picker-reactive-example.component.html';
import * as timePickerReactiveTs from '!raw-loader!./examples/platform-time-picker-reactive-example.component.ts';
import * as timePickerTemplateHtml from '!raw-loader!./examples/platform-time-picker-template-example.component.html';
import * as timePickerTemplateTs from '!raw-loader!./examples/platform-time-picker-template-example.component.ts';

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
