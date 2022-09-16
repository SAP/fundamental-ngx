import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
const timePickerBasicHtml = 'platform-time-picker-basic-example.component.html';
const timePickerBasicTs = 'platform-time-picker-basic-example.component.ts';
const timePickerReactiveHtml = 'platform-time-picker-reactive-example.component.html';
const timePickerReactiveTs = 'platform-time-picker-reactive-example.component.ts';
const timePickerTemplateHtml = 'platform-time-picker-template-example.component.html';
const timePickerTemplateTs = 'platform-time-picker-template-example.component.ts';

@Component({
    selector: 'app-time-picker',
    templateUrl: './platform-time-picker-docs.component.html'
})
export class PlatformTimePickerDocsComponent {
    timePickerBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerBasicHtml),
            fileName: 'platform-time-picker-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerBasicTs),
            fileName: 'platform-time-picker-basic-example',
            component: 'PlatformTimePickerBasicExampleComponent'
        }
    ];

    timePickerReactive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerReactiveHtml),
            fileName: 'platform-time-picker-reactive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerReactiveTs),
            fileName: 'platform-time-picker-reactive-example',
            component: 'PlatformTimePickerReactiveExampleComponent'
        }
    ];

    timePickerTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timePickerTemplateHtml),
            fileName: 'platform-time-picker-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timePickerTemplateTs),
            fileName: 'platform-time-picker-template-example',
            component: 'PlatformTimePickerTemplateExampleComponent'
        }
    ];
}
