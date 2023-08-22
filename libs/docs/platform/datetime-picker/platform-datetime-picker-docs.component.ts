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

const datetimePickerMobileHtml = 'mobile/platform-datetime-picker-mobile-example.component.html';
const datetimePickerMobileeTs = 'mobile/platform-datetime-picker-mobile-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformDatetimePickerMobileExampleComponent } from './examples/mobile/platform-datetime-picker-mobile-example.component';
import { RouterLink } from '@angular/router';
import { PlatformDatetimePickerUpdateOnBlurExampleComponent } from './examples/platform-datetime-picker-update-on-blur-example.component';
import { PlatformDatetimePickerDisableFunctionExampleComponent } from './examples/platform-datetime-picker-disable-function-example.component';
import { PlatformDatetimePickerTemplateExampleComponent } from './examples/platform-datetime-picker-template-example.component';
import { PlatformDatetimePickerReactiveExampleComponent } from './examples/platform-datetime-picker-reactive-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformDatetimePickerBasicExampleComponent } from './examples/platform-datetime-picker-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-datetime-picker',
    templateUrl: './platform-datetime-picker-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformDatetimePickerBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformDatetimePickerReactiveExampleComponent,
        PlatformDatetimePickerTemplateExampleComponent,
        PlatformDatetimePickerDisableFunctionExampleComponent,
        PlatformDatetimePickerUpdateOnBlurExampleComponent,
        RouterLink,
        PlatformDatetimePickerMobileExampleComponent
    ]
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

    datetimePickerMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimePickerMobileHtml),
            fileName: 'platform-datetime-PlatformDatetimePickerMobileExampleComponent-disable-function-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimePickerMobileeTs),
            fileName: 'platform-datetime-picker-mobile-example',
            component: 'PlatformDatetimePickerMobileExampleComponent'
        }
    ];
}
