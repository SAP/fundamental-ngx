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
import { PlatformActionListItemBorderLessExampleComponent } from './examples/platform-action-list-item-border-less-example.component';
import { PlatformActionListItemExampleComponent } from './examples/platform-action-list-item-example.component';

const aliSrc = 'platform-action-list-item-example.component.html';
const aliSrcTs = 'platform-action-list-item-example.component.ts';
const borderLessALISrc = 'platform-action-list-item-border-less-example.component.html';
const borderLessALITs = 'platform-action-list-item-border-less-example.component.ts';

@Component({
    selector: 'app-action-list-item',
    templateUrl: './platform-action-list-item-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformActionListItemExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformActionListItemBorderLessExampleComponent
    ]
})
export class PlatformActionListItemDocsComponent {
    simpleALI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(aliSrc),
            fileName: 'platform-action-list-item-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionListItemExampleComponent',
            code: getAssetFromModuleAssets(aliSrcTs),
            fileName: 'platform-action-list-item-example'
        }
    ];

    borderLessALI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessALISrc),
            fileName: 'platform-action-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionListItemBorderLessExampleComponent',
            code: getAssetFromModuleAssets(borderLessALITs),
            fileName: 'platform-action-list-item-border-less-example'
        }
    ];
}
