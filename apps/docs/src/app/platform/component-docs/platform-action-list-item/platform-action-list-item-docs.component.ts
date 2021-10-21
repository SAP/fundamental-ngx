import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as aliSrc from '!raw-loader!./platform-action-list-item-examples/platform-action-list-item-example.component.html';
import * as aliSrcTs from '!raw-loader!./platform-action-list-item-examples/platform-action-list-item-example.component';
import * as borderLessALISrc from '!raw-loader!./platform-action-list-item-examples/platform-action-list-item-border-less-example.component.html';
import * as borderLessALITs from '!raw-loader!./platform-action-list-item-examples/platform-action-list-item-border-less-example.component';

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
