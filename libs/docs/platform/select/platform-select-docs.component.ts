import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const selectModeHtml = 'platform-select-mode-example/platform-select-mode-example.component.html';
const selectModeTs = 'platform-select-mode-example/platform-select-mode-example.component.ts';

const selectMobileHtml = 'platform-select-mobile-example/platform-select-mobile-example.component.html';
const selectMobileTs = 'platform-select-mobile-example/platform-select-mobile-example.component.ts';

const customTriggerHtml = 'platform-select-custom-trigger/platform-select-custom-trigger.component.html';
const customTriggerTs = 'platform-select-custom-trigger/platform-select-custom-trigger.component.ts';

const selectFormHtml = 'platform-select-forms/platform-select-forms.component.html';
const selectFormTs = 'platform-select-forms/platform-select-forms.component.ts';

const selectMaxHeightHtml = 'platform-select-height/platform-select-max-height-example.component.html';
const selectMaxHeightTs = 'platform-select-height/platform-select-max-height-example.component.ts';

const selectSemanticStateHtml =
    'platform-select-semantic-state-example/platform-select-semantic-state-example.component.html';
const selectSemanticStateTs =
    'platform-select-semantic-state-example/platform-select-semantic-state-example.component.ts';

const selectColumnsHtml = 'platform-select-columns/platform-select-columns-example.component.html';
const selectColumnsTs = 'platform-select-columns/platform-select-columns-example.component.ts';

const selectNoneHtml = 'platform-select-none/platform-select-none-example.component.html';
const selectNoneTs = 'platform-select-none/platform-select-none-example.component.ts';

const selectNoWrapHtml = 'platform-select-nowrap/platform-select-nowrap-example.component.html';
const selectNoWrapTs = 'platform-select-nowrap/platform-select-nowrap-example.component.ts';

@Component({
    selector: 'fdp-select-docs',
    templateUrl: './platform-select-docs.component.html',
    styles: [
        `
            ul > li:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        `
    ]
})
export class PlatformSelectDocsComponent {
    selectMode: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectModeHtml),
            fileName: 'platform-select-mode-example'
        },
        {
            language: 'typescript',
            fileName: 'platform-select-mode-example',
            code: getAssetFromModuleAssets(selectModeTs),
            component: 'PlatformSelectModeExampleComponent'
        }
    ];

    selectColumns: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'platform-select-columns-example',
            code: getAssetFromModuleAssets(selectColumnsHtml)
        },
        {
            language: 'typescript',
            fileName: 'platform-select-columns-example',
            code: getAssetFromModuleAssets(selectColumnsTs),
            component: 'PlatformSelectColumnsExampleComponent'
        }
    ];

    selectMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectMobileHtml),
            fileName: 'platform-select-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectMobileExampleComponent',
            code: getAssetFromModuleAssets(selectMobileTs),
            fileName: 'platform-select-mobile-example'
        }
    ];

    selectNoWrap: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectNoWrapHtml),
            fileName: 'platform-select-nowrap-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectNoWrapExampleComponent',
            code: getAssetFromModuleAssets(selectNoWrapTs),
            fileName: 'platform-select-nowrap-example'
        }
    ];

    customSelectTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customTriggerHtml),
            fileName: 'platform-select-custom-trigger'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectCustomTriggerComponent',
            code: getAssetFromModuleAssets(customTriggerTs),
            fileName: 'platform-select-custom-trigger'
        }
    ];

    selectForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectFormHtml),
            fileName: 'platform-select-forms'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectFormsComponent',
            code: getAssetFromModuleAssets(selectFormTs),
            fileName: 'platform-select-forms'
        }
    ];

    selectMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectMaxHeightHtml),
            fileName: 'platform-select-max-height-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectMaxHeightExampleComponent',
            code: getAssetFromModuleAssets(selectMaxHeightTs),
            fileName: 'platform-select-max-height-example'
        }
    ];

    selectNone: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectNoneHtml),
            fileName: 'platform-select-none-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectNoneExampleComponent',
            code: getAssetFromModuleAssets(selectNoneTs),
            fileName: 'platform-select-none-example'
        }
    ];

    selectSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectSemanticStateHtml),
            fileName: 'platform-select-max-height-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectTypesExampleComponent',
            code: getAssetFromModuleAssets(selectSemanticStateTs),
            fileName: 'platform-select-max-height-example'
        }
    ];
}
