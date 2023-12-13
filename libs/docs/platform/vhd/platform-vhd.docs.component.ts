import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformVhdColumnTemplateExampleComponent } from './examples/column-template/platform-vhd-column-template-example.component';
import { PlatformVhdInitialLoadingExampleComponent } from './examples/initial-loading/platform-vhd-initial-loading-example.component';
import { PlatformVhdBasicExampleComponent } from './examples/platform-vhd-basic-example.component';
import { PlatformVhdInputExampleComponent } from './examples/platform-vhd-input-example.component';
import { PlatformVhdLoadingExampleComponent } from './examples/platform-vhd-loading-example.component';
import { PlatformVhdMobileExampleComponent } from './examples/platform-vhd-mobile-example.component';
import { PlatformVhdMultiInputExampleComponent } from './examples/platform-vhd-multi-input-example.component';
import { PlatformVhdStrategyLabelExampleComponent } from './examples/platform-vhd-strategy-labels-example.component';
import { PlatformVhdTokenExampleComponent } from './examples/platform-vhd-token-example.component';

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

const initialLoadingVhdHtml = 'initial-loading/platform-vhd-initial-loading-example.component.html';
const initialLoadingVhdTs = 'initial-loading/platform-vhd-initial-loading-example.component.ts';

const customColumnVhdHtml = 'column-template/platform-vhd-column-template-example.component.html';
const customColumnVhdTs = 'column-template/platform-vhd-column-template-example.component.ts';

@Component({
    selector: 'app-platform-vhd',
    templateUrl: './platform-vhd.docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformVhdBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformVhdStrategyLabelExampleComponent,
        PlatformVhdTokenExampleComponent,
        PlatformVhdInputExampleComponent,
        PlatformVhdMultiInputExampleComponent,
        PlatformVhdMobileExampleComponent,
        PlatformVhdLoadingExampleComponent,
        PlatformVhdInitialLoadingExampleComponent,
        PlatformVhdColumnTemplateExampleComponent
    ]
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

    initialLoadingValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(initialLoadingVhdHtml),
            fileName: 'platform-vhd-initial-loading-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdInitialLoadingExampleComponent',
            code: getAssetFromModuleAssets(initialLoadingVhdTs),
            fileName: 'platform-vhd-initial-loading-example'
        }
    ];

    customColumnValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customColumnVhdHtml),
            fileName: 'platform-vhd-column-template-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdColumnTemplateExampleComponent',
            code: getAssetFromModuleAssets(customColumnVhdTs),
            fileName: 'platform-vhd-column-template-example'
        }
    ];
}
