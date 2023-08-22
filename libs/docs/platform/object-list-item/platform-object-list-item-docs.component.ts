import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformObjectListItemExampleComponent } from './examples/platform-object-list-item-example.component';
import { PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent } from './examples/platform-object-list-item-with-row-selection-and-navigation-example.component';
import { PlatformObjectListItemWithRowNavigationExampleComponent } from './examples/platform-object-list-item-with-row-navigation-example.component';
import { PlatformObjectListItemWithRowSelectionExampleComponent } from './examples/platform-object-list-item-with-row-selection-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformObjectListItemBorderLessExampleComponent } from './examples/platform-object-list-item-border-less-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const borderLessOLISrc = 'platform-object-list-item-border-less-example.component.html';
const borderLessOLITs = 'platform-object-list-item-border-less-example.component.ts';
const rowSelectionOLISrc = 'platform-object-list-item-with-row-selection-example.component.html';
const rowSelectionOLITs = 'platform-object-list-item-with-row-selection-example.component.ts';
const declarativeOLISrc = 'platform-object-list-item-example.component.html';
const rowNavigationOLISrc = 'platform-object-list-item-with-row-navigation-example.component.html';
const rowNavigationOLITs = 'platform-object-list-item-with-row-navigation-example.component.ts';
const rowNavigationAndSelectionOLISrc =
    'platform-object-list-item-with-row-selection-and-navigation-example.component.html';
const rowNavigationAndSelectionOLITs =
    'platform-object-list-item-with-row-selection-and-navigation-example.component.ts';

@Component({
    selector: 'app-object-list-item',
    templateUrl: './platform-object-list-item-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformObjectListItemBorderLessExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformObjectListItemWithRowSelectionExampleComponent,
        PlatformObjectListItemWithRowNavigationExampleComponent,
        PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent,
        PlatformObjectListItemExampleComponent
    ]
})
export class PlatformObjectListItemDocsComponent {
    borderLessOLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessOLISrc),
            fileName: 'platform-object-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemBorderLessExampleComponent',
            code: getAssetFromModuleAssets(borderLessOLITs),
            fileName: 'platform-object-list-item-border-less-example'
        }
    ];

    rowSelectionOLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(rowSelectionOLISrc),
            fileName: 'platform-object-list-item-with-row-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowSelectionExampleComponent',
            code: getAssetFromModuleAssets(rowSelectionOLITs),
            fileName: 'platform-object-list-item-with-row-selection-example'
        }
    ];

    rowNavigationOLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(rowNavigationOLISrc),
            fileName: 'platform-object-list-item-with-row-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowNavigationExampleComponent',
            code: getAssetFromModuleAssets(rowNavigationOLITs),
            fileName: 'platform-object-list-item-with-row-navigation-example'
        }
    ];
    rowSelectionAndNavigationOLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(rowNavigationAndSelectionOLISrc),
            fileName: 'platform-object-list-item-with-row-selection-and-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent',
            code: getAssetFromModuleAssets(rowNavigationAndSelectionOLITs),
            fileName: 'platform-object-list-item-with-row-selection-and-navigation-example'
        }
    ];

    declarativeOLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(declarativeOLISrc),
            fileName: 'platform-object-list-item-example'
        }
    ];
}
