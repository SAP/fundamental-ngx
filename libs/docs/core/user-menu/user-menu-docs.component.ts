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

import { UserMenuDefaultExampleComponent } from './examples/user-menu-default-example.component';

const userMenuDefaultExampleHtml = 'user-menu-default-example.component.html';
const userMenuDefaultExampleTs = 'user-menu-default-example.component.ts';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        UserMenuDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent
    ]
})
export class UserMenuDocsComponent {
    userMenuDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'user-menu-default-example',
            code: getAssetFromModuleAssets(userMenuDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(userMenuDefaultExampleTs),
            fileName: 'user-menu-default-example',
            component: 'UserMenuDefaultExampleComponent'
        }
    ];
}
