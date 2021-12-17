import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import borderLessOLISrc from '!./platform-object-list-item-examples/platform-object-list-item-border-less-example.component.html?raw';
import borderLessOLITs from '!./platform-object-list-item-examples/platform-object-list-item-border-less-example.component.ts?raw';
import rowSelectionOLISrc from '!./platform-object-list-item-examples/platform-object-list-item-with-row-selection-example.component.html?raw';
import rowSelectionOLITs from '!./platform-object-list-item-examples/platform-object-list-item-with-row-selection-example.component.ts?raw';
import declarativeOLISrc from '!./platform-object-list-item-examples/platform-object-list-item-example.component.html?raw';
import rowNavigationOLISrc from '!./platform-object-list-item-examples/platform-object-list-item-with-row-navigation-example.component.html?raw';
import rowNavigationOLITs from '!./platform-object-list-item-examples/platform-object-list-item-with-row-navigation-example.component.ts?raw';
import rowNavigationAndSelectionOLISrc from '!./platform-object-list-item-examples/platform-object-list-item-with-row-selection-and-navigation-example.component.html?raw';
import rowNavigationAndSelectionOLITs from '!./platform-object-list-item-examples/platform-object-list-item-with-row-selection-and-navigation-example.component.ts?raw';

@Component({
    selector: 'app-object-list-item',
    templateUrl: './platform-object-list-item-docs.component.html'
})
export class PlatformObjectListItemDocsComponent {
    borderLessOLI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessOLISrc,
            fileName: 'platform-object-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemBorderLessExampleComponent',
            code: borderLessOLITs,
            fileName: 'platform-object-list-item-border-less-example'
        }
    ];

    rowSelectionOLI: ExampleFile[] = [
        {
            language: 'html',
            code: rowSelectionOLISrc,
            fileName: 'platform-object-list-item-with-row-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowSelectionExampleComponent',
            code: rowSelectionOLITs,
            fileName: 'platform-object-list-item-with-row-selection-example'
        }
    ];

    rowNavigationOLI: ExampleFile[] = [
        {
            language: 'html',
            code: rowNavigationOLISrc,
            fileName: 'platform-object-list-item-with-row-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowNavigationExampleComponent',
            code: rowNavigationOLITs,
            fileName: 'platform-object-list-item-with-row-navigation-example'
        }
    ];
    rowSelectionAndNavigationOLI: ExampleFile[] = [
        {
            language: 'html',
            code: rowNavigationAndSelectionOLISrc,
            fileName: 'platform-object-list-item-with-row-selection-and-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent',
            code: rowNavigationAndSelectionOLITs,
            fileName: 'platform-object-list-item-with-row-selection-and-navigation-example'
        }
    ];

    declarativeOLI: ExampleFile[] = [
        {
            language: 'html',
            code: declarativeOLISrc,
            fileName: 'platform-object-list-item-example'
        }
    ];
}
