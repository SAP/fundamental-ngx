import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as oliSrc from '!raw-loader!./platform-object-list-item-examples/platform-object-list-item-example.component.html';
import * as oliSrcTs from '!raw-loader!./platform-object-list-item-examples/platform-object-list-item-example.component.ts';
import * as borderLessOLISrc from '!raw-loader!./platform-object-list-item-examples/platform-borderless-object-list-item-example.component.html';
import * as borderLessOLITs from '!raw-loader!./platform-object-list-item-examples/platform-object-list-item-border-less-example.component.ts';


@Component({
    selector: 'app-object-list-item',
    templateUrl: './platform-object-list-item-docs.component.html'
})
export class PlatformObjectListItemDocsComponent {
    simpleOLI: ExampleFile[] = [
        {
            language: 'html',
            code: oliSrc,
            fileName: 'platform-object-list-item-example',
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemExampleComponent',
            code: oliSrcTs,
            fileName: 'platform-borderless-object-list-item-example'
        }
    ];

    borderLessOLI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessOLISrc,
            fileName: 'platform-borderless-object-list-item-example',
        },
        {
            language: 'typescript',
            component: 'PlatformObjectListItemBorderLessExampleComponent',
            code: borderLessOLITs,
            fileName: 'platform-borderless-object-list-item-example'
        }
    ];

}
