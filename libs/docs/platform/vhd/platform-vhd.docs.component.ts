import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const basicVhdHtml = 'platform-vhd-basic-example.component.html';
const basicVhdTs = 'platform-vhd-basic-example.component.ts';

const strategyLabelsVhdHtml = 'platform-vhd-strategy-labels-example.component.html';
const strategyLabelsVhdTs = 'platform-vhd-strategy-labels-example.component.ts';

const tokenVhdHtml = 'platform-vhd-token-example.component.html';
const tokenVhdTs = 'platform-vhd-token-example.component.ts';

const inputVhdHtml = 'platform-vhd-input-example.component.html';
const inputVhdTs = 'platform-vhd-input-example.component.ts';

const multiInputVhdHtml = 'platform-vhd-multi-input-example.component.html';
const multiInputVhdTs = 'platform-vhd-multi-input-example.component.ts';

const mobileVhdHtml = 'platform-vhd-mobile-example.component.html';
const mobileVhdTs = 'platform-vhd-mobile-example.component.ts';

const loadingVhdHtml = 'platform-vhd-loading-example.component.html';
const loadingVhdTs = 'platform-vhd-loading-example.component.ts';

@Component({
    selector: 'app-platform-vhd',
    templateUrl: './platform-vhd.docs.component.html'
})
export class PlatformVhdDocsComponent {
    basicValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicVhdHtml),
            fileName: 'platform-vhd-basic-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdBasicExampleComponent',
            code: getAssetFromModuleAssets(basicVhdTs),
            fileName: 'platform-vhd-basic-example'
        }
    ];

    strategyLabelValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(strategyLabelsVhdHtml),
            fileName: 'platform-vhd-strategy-labels-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdStrategyLabelExampleComponent',
            code: getAssetFromModuleAssets(strategyLabelsVhdTs),
            fileName: 'platform-vhd-strategy-labels-example'
        }
    ];

    tokenValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tokenVhdHtml),
            fileName: 'platform-vhd-token-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdTokenExampleComponent',
            code: getAssetFromModuleAssets(tokenVhdTs),
            fileName: 'platform-vhd-token-example'
        }
    ];

    inputValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputVhdHtml),
            fileName: 'platform-vhd-input-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdInputExampleComponent',
            code: getAssetFromModuleAssets(inputVhdTs),
            fileName: 'platform-vhd-input-example'
        }
    ];

    multiInputValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(multiInputVhdHtml),
            fileName: 'platform-vhd-multi-input-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdMultiInputExampleComponent',
            code: getAssetFromModuleAssets(multiInputVhdTs),
            fileName: 'platform-vhd-multi-input-example'
        }
    ];

    mobileValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobileVhdHtml),
            fileName: 'platform-vhd-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdMobileExampleComponent',
            code: getAssetFromModuleAssets(mobileVhdTs),
            fileName: 'platform-vhd-mobile-example'
        }
    ];

    loadingValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(loadingVhdHtml),
            fileName: 'platform-vhd-loading-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdLoadingExampleComponent',
            code: getAssetFromModuleAssets(loadingVhdTs),
            fileName: 'platform-vhd-loading-example'
        }
    ];
}
