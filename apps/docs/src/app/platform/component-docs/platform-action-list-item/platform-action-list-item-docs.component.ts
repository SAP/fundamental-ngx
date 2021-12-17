import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import aliSrc from '!./platform-action-list-item-examples/platform-action-list-item-example.component.html?raw';
import aliSrcTs from '!./platform-action-list-item-examples/platform-action-list-item-example.component?raw';
import borderLessALISrc from '!./platform-action-list-item-examples/platform-action-list-item-border-less-example.component.html?raw';
import borderLessALITs from '!./platform-action-list-item-examples/platform-action-list-item-border-less-example.component?raw';

@Component({
    selector: 'app-action-list-item',
    templateUrl: './platform-action-list-item-docs.component.html'
})
export class PlatformActionListItemDocsComponent {
    simpleALI: ExampleFile[] = [
        {
            language: 'html',
            code: aliSrc,
            fileName: 'platform-action-list-item-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionListItemExampleComponent',
            code: aliSrcTs,
            fileName: 'platform-action-list-item-example'
        }
    ];

    borderLessALI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessALISrc,
            fileName: 'platform-action-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionListItemBorderLessExampleComponent',
            code: borderLessALITs,
            fileName: 'platform-action-list-item-border-less-example'
        }
    ];
}
