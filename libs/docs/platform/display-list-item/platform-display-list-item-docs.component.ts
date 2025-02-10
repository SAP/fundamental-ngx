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
import { PlatformDisplayListItemBorderLessExampleComponent } from './examples/platform-display-list-item-border-less-example.component';
import { PlatformDisplayListItemWithNavigationExampleComponent } from './examples/platform-display-list-item-with-navigation-example.component';

const dliSrc = 'platform-display-list-item-example.component.html';
const borderLessDLISrc = 'platform-display-list-item-border-less-example.component.html';
const borderLessDLITs = 'platform-display-list-item-border-less-example.component.ts';
const dliWithNavigation = 'platform-display-list-item-with-navigation-example.component.html';
const dliWithNavigationTs = 'platform-display-list-item-with-navigation-example.component.ts';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-display-list-item-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformDisplayListItemBorderLessExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformDisplayListItemWithNavigationExampleComponent
    ]
})
export class PlatformDisplayListItemDocsComponent {
    simpleDLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dliSrc),
            fileName: 'platform-display-list-item-example'
        }
    ];

    borderLessDLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessDLISrc),
            fileName: 'platform-display-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformDisplayListItemBorderLessExampleComponent',
            code: getAssetFromModuleAssets(borderLessDLITs),
            fileName: 'platform-display-list-item-border-less-example'
        }
    ];

    dliWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dliWithNavigation),
            fileName: 'platform-display-list-item-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformDisplayListItemWithNavigationExampleComponent',
            code: getAssetFromModuleAssets(dliWithNavigationTs),
            fileName: 'platform-display-list-item-with-navigation-example'
        }
    ];
}
