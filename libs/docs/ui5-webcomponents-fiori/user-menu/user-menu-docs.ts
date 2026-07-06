import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AccountsSample } from './examples/accounts-sample';
import { BasicSample } from './examples/basic-sample';
import { InfoAreaSample } from './examples/info-area-sample';
import { MenuItemsSample } from './examples/menu-items-sample';
import { NonInteractiveAvatarSample } from './examples/non-interactive-avatar-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const accountsSampleTs = 'accounts-sample.ts';
const accountsSampleHtml = 'accounts-sample.html';
const menuItemsSampleTs = 'menu-items-sample.ts';
const menuItemsSampleHtml = 'menu-items-sample.html';
const nonInteractiveAvatarSampleTs = 'non-interactive-avatar-sample.ts';
const nonInteractiveAvatarSampleHtml = 'non-interactive-avatar-sample.html';
const infoAreaSampleTs = 'info-area-sample.ts';
const infoAreaSampleHtml = 'info-area-sample.html';

@Component({
    selector: 'ui5-doc-user-menu',
    templateUrl: './user-menu-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        AccountsSample,
        MenuItemsSample,
        NonInteractiveAvatarSample,
        InfoAreaSample
    ]
})
export class UserMenuDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    accountsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(accountsSampleTs),
            originalFileName: 'accounts-sample',
            component: 'AccountsSample',
            typescriptFileCode: getAssetFromModuleAssets(accountsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(accountsSampleHtml),
            originalFileName: 'accounts-sample',
            component: 'AccountsSample'
        }
    ]);

    menuItemsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuItemsSampleTs),
            originalFileName: 'menu-items-sample',
            component: 'MenuItemsSample',
            typescriptFileCode: getAssetFromModuleAssets(menuItemsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuItemsSampleHtml),
            originalFileName: 'menu-items-sample',
            component: 'MenuItemsSample'
        }
    ]);

    nonInteractiveAvatarExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(nonInteractiveAvatarSampleTs),
            originalFileName: 'non-interactive-avatar-sample',
            component: 'NonInteractiveAvatarSample',
            typescriptFileCode: getAssetFromModuleAssets(nonInteractiveAvatarSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(nonInteractiveAvatarSampleHtml),
            originalFileName: 'non-interactive-avatar-sample',
            component: 'NonInteractiveAvatarSample'
        }
    ]);

    infoAreaExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(infoAreaSampleTs),
            originalFileName: 'info-area-sample',
            component: 'InfoAreaSample',
            typescriptFileCode: getAssetFromModuleAssets(infoAreaSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(infoAreaSampleHtml),
            originalFileName: 'info-area-sample',
            component: 'InfoAreaSample'
        }
    ]);
}
