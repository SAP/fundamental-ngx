import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformDisplayListItemWithNavigationExampleComponent } from './examples/platform-display-list-item-with-navigation-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformDisplayListItemBorderLessExampleComponent } from './examples/platform-display-list-item-border-less-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const dliSrc = 'platform-display-list-item-example.component.html';
const borderLessDLISrc = 'platform-display-list-item-border-less-example.component.html';
const borderLessDLITs = 'platform-display-list-item-border-less-example.component.ts';
const dliWithNavigation = 'platform-display-list-item-with-navigation-example.component.html';
const dliWithNavigationTs = 'platform-display-list-item-with-navigation-example.component.ts';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-display-list-item-docs.component.html',
    standalone: true,
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
