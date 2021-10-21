import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as dliSrc from '!raw-loader!./platform-display-list-item-examples/platform-display-list-item-example.component.html';
import * as borderLessDLISrc from '!raw-loader!./platform-display-list-item-examples/platform-display-list-item-border-less-example.component.html';
import * as borderLessDLITs from '!raw-loader!./platform-display-list-item-examples/platform-display-list-item-border-less-example.component';
import * as dliWithNavigation from '!raw-loader!./platform-display-list-item-examples/platform-display-list-item-with-navigation-example.component.html';
import * as dliWithNavigationTs from '!raw-loader!./platform-display-list-item-examples/platform-display-list-item-with-navigation-example.component.ts';

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
