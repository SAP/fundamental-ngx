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
import { MenuItemsSample } from './examples/menu-items-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const accountsSampleTs = 'accounts-sample.ts';
const accountsSampleHtml = 'accounts-sample.html';
const menuItemsSampleTs = 'menu-items-sample.ts';
const menuItemsSampleHtml = 'menu-items-sample.html';

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
        MenuItemsSample
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
}
