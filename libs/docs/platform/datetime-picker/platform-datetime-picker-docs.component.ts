import { Component } from '@angular/core';
const datetimePickerBasicHtml = 'platform-datetime-picker-basic-example.component.html';
const datetimePickerBasicTs = 'platform-datetime-picker-basic-example.component.ts';
const datetimePickerDisableFunctionHtml = 'platform-datetime-picker-disable-function-example.component.html';
const datetimePickerDisableFunctionTs = 'platform-datetime-picker-disable-function-example.component.ts';
const datetimePickerReactiveHtml = 'platform-datetime-picker-reactive-example.component.html';
const datetimePickerReactiveTs = 'platform-datetime-picker-reactive-example.component.ts';
const datetimePickerTemplateHtml = 'platform-datetime-picker-template-example.component.html';
const datetimePickerTemplateTs = 'platform-datetime-picker-template-example.component.ts';
const datetimePickerUpdateOnBlurTs = 'platform-datetime-picker-update-on-blur-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-datetime-picker',
    templateUrl: './platform-datetime-picker-docs.component.html'
})
export class PlatformDatetimePickerDocsComponent {
    datetimePickerBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimePickerBasicHtml),
            fileName: 'platform-datetime-picker-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerBasicTs),
            fileName: 'platform-datetime-picker-basic-example',
            component: 'PlatformDatetimePickerBasicExampleComponent'
        }
    ];

    datetimePickerReactive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimePickerReactiveHtml),
            fileName: 'platform-datetime-picker-reactive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerReactiveTs),
            fileName: 'platform-datetime-picker-reactive-example',
            component: 'PlatformDatetimePickerReactiveExampleComponent'
        }
    ];

    datetimePickerTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimePickerTemplateHtml),
            fileName: 'platform-datetime-picker-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerTemplateTs),
            fileName: 'platform-datetime-picker-template-example',
            component: 'PlatformDatetimePickerTemplateExampleComponent'
        }
    ];

    datetimePickerDisableFunction: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimePickerDisableFunctionHtml),
            fileName: 'platform-datetime-picker-disable-function-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerDisableFunctionTs),
            fileName: 'platform-datetime-picker-disable-function-example',
            component: 'PlatformDatetimePickerDisableFunctionExampleComponent'
        }
    ];

    dateTimePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerUpdateOnBlurTs),
            fileName: 'platform-datetime-picker-update-on-blur-example',
            component: 'PlatformDatetimePickerUpdateOnBlurExampleComponent'
        }
    ];
}
