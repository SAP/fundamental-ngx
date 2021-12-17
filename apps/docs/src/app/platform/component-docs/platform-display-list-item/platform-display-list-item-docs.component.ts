import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import dliSrc from '!./platform-display-list-item-examples/platform-display-list-item-example.component.html?raw';
import borderLessDLISrc from '!./platform-display-list-item-examples/platform-display-list-item-border-less-example.component.html?raw';
import borderLessDLITs from '!./platform-display-list-item-examples/platform-display-list-item-border-less-example.component?raw';
import dliWithNavigation from '!./platform-display-list-item-examples/platform-display-list-item-with-navigation-example.component.html?raw';
import dliWithNavigationTs from '!./platform-display-list-item-examples/platform-display-list-item-with-navigation-example.component.ts?raw';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-display-list-item-docs.component.html'
})
export class PlatformDisplayListItemDocsComponent {
    simpleDLI: ExampleFile[] = [
        {
            language: 'html',
            code: dliSrc,
            fileName: 'platform-display-list-item-example'
        }
    ];

    borderLessDLI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessDLISrc,
            fileName: 'platform-display-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformDisplayListItemBorderLessExampleComponent',
            code: borderLessDLITs,
            fileName: 'platform-display-list-item-border-less-example'
        }
    ];

    dliWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: dliWithNavigation,
            fileName: 'platform-display-list-item-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformDisplayListItemWithNavigationExampleComponent',
            code: dliWithNavigationTs,
            fileName: 'platform-display-list-item-with-navigation-example'
        }
    ];
}
