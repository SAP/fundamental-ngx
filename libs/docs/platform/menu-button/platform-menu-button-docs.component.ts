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

import { PlatformMenuButtonExampleComponent } from './examples/platform-menu-button-example.component';
import { PlatformMenuButtonStateExampleComponent } from './examples/platform-menu-button-state-example.component';

const menuButtonSrc = 'platform-menu-button-example.component.html';
const menuButtonTsCode = 'platform-menu-button-example.component.ts';
const stateMenuButtonSrc = 'platform-menu-button-state-example.component.html';
const stateMenuButtonTsCode = 'platform-menu-button-state-example.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './platform-menu-button-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformMenuButtonStateExampleComponent,
        CodeExampleComponent,
        PlatformMenuButtonExampleComponent,
        SeparatorComponent
    ]
})
export class PlatformMenuButtonDocsComponent {
    stateMenuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(stateMenuButtonSrc),
            fileName: 'platform-menu-button-state-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(stateMenuButtonTsCode),
            fileName: 'platform-menu-button-state-example',
            component: 'PlatformMenuButtonStateExampleComponent'
        }
    ];

    menuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuButtonSrc),
            fileName: 'platform-menu-button-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(menuButtonTsCode),
            fileName: 'platform-menu-button-example',
            component: 'PlatformMenuButtonExampleComponent'
        }
    ];
}
