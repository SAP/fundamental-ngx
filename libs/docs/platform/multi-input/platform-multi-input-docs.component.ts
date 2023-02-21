import { Component } from '@angular/core';

const platformMultiInputSimpleExample = 'platform-multi-input-example.component.html';
const platformMultiInputSimpmleExampleTs = 'platform-multi-input-example.component.ts';
const platformMultiInputComplexExample = 'platform-multi-input-complex-example.component.html';
const platformMultiInputComplexExampleTs = 'platform-multi-input-complex-example.component.ts';
const platformMultiInputGroupedExample = 'platform-multi-input-grouped-example.component.html';
const platformMultiInputGroupedExampleTs = 'platform-multi-input-grouped-example.component.ts';
const platformMultiInputDeclineExample = 'platform-multi-input-decline-example.component.html';
const platformMultiInputDeclineExampleTs = 'platform-multi-input-decline-example.component.ts';
const platformMultiInputDisableExample = 'platform-multi-input-disabled.component.html';
const platformMultiInputDisableExampleTs = 'platform-multi-input-disabled.component.ts';
const platformMultiInputMobileExample = 'platform-multi-input-mobile-example.component.html';
const platformMultiInputMobileExampleTs = 'platform-multi-input-mobile-example.component.ts';
const platformMultiInputReactiveExample = 'platform-multi-input-reactive-example.component.html';
const platformMultiInputReactiveExampleTs = 'platform-multi-input-reactive-example.component.ts';
const PlatformMultiInputCompactExampleComponent = 'platform-multi-input-compact-example.component.html';
const PlatformMultiInputCompactExampleComponentTs = 'platform-multi-input-compact-example.component.ts';
const PlatformMultiInputLoadingExampleComponent = 'platform-multi-input-loading-example.component.html';
const PlatformMultiInputLoadingExampleComponentTs = 'platform-multi-input-loading-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-platform-multi-input-docs',
    templateUrl: './platform-multi-input-docs.component.html'
})
export class PlatformMultiInputDocsComponent {
    multiInputSimple: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputSimpleExample),
            fileName: 'platform-multi-input-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputSimpmleExampleTs),
            fileName: 'platform-multi-input-example',
            component: 'PlatformMultiInputExampleComponent'
        }
    ];
    multiInputCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformMultiInputCompactExampleComponent),
            fileName: 'platform-multi-input-compact-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformMultiInputCompactExampleComponentTs),
            fileName: 'platform-multi-input-compact-example',
            component: 'PlatformMultiInputCompactExampleComponent'
        }
    ];
    multiInputValueHelp: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputComplexExample),
            fileName: 'platform-multi-input-complex-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputComplexExampleTs),
            fileName: 'platform-multi-input-complex-example',
            component: 'PlatformMultiInputComplexExampleComponent'
        }
    ];
    multiInputGrouped: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputGroupedExample),
            fileName: 'platform-multi-input-grouped-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputGroupedExampleTs),
            fileName: 'platform-multi-input-grouped-example',
            component: 'PlatformMultiInputGroupedExampleComponent'
        }
    ];
    multiInputDecline: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputDeclineExample),
            fileName: 'platform-multi-input-decline-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputDeclineExampleTs),
            fileName: 'platform-multi-input-decline-example',
            component: 'PlatformMultiInputDeclineExampleComponent'
        }
    ];
    multiInputDisable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputDisableExample),
            fileName: 'platform-multi-input-disabled'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputDisableExampleTs),
            fileName: 'platform-multi-input-disabled',
            component: 'PlatformMultiInputDisabledExampleComponent'
        }
    ];
    multiInputMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputMobileExample),
            fileName: 'platform-multi-input-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputMobileExampleTs),
            fileName: 'platform-multi-input-mobile-example',
            component: 'PlatformMultiInputMobileExampleComponent'
        }
    ];
    multiInputReactive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformMultiInputReactiveExample),
            fileName: 'platform-multi-input-reactive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformMultiInputReactiveExampleTs),
            fileName: 'platform-multi-input-reactive-example',
            component: 'PlatformMultiInputReactiveExampleComponent'
        }
    ];
    multiInputLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(PlatformMultiInputLoadingExampleComponent),
            fileName: 'platform-multi-input-loading-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(PlatformMultiInputLoadingExampleComponentTs),
            fileName: 'platform-multi-input-loading-example',
            component: 'PlatformMultiInputLoadingExampleComponent'
        }
    ];
}
